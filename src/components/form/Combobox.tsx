"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useMemo, useRef, useState } from "react";
import { LookupValues } from "@/api/lookup";

export interface ComboboxProps {
  options: LookupValues[];
  onChange: (...event: any[]) => void;
  value: any;
  placeholder?: string;
  getOptionValue?: (option: LookupValues) => string | number;
  getOptionLabel?: (option: LookupValues) => string;
}

export function Combobox({
  options,
  onChange,
  value,
  placeholder,
  getOptionValue,
  getOptionLabel,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<LookupValues>();
  // Dynamically compute `selectables` based on `selected`
  const selectables = useMemo(
    () => options.find((option) => selected?.value === option.value),
    [options, selected]
  );

  const handleSelect = (option: LookupValues) => {
    setSelected(option); // Update state with the new selected value
    onChange(getOptionValue?.(option) ?? option); // Pass the updated value to the onChange callback
  };

  const handleValue = () => {
    if (value) {
      // find option
      const initialOption = options.find(
        (option) => (getOptionValue?.(option) ?? option) === value
      );
      setSelected(initialOption);
    }
  };

  useEffect(() => {
    handleValue();
  }, []);

  // Scroll the selected item into view when the combobox is opened
  useEffect(() => {
    if (open && selected) {
      setTimeout(() => {
        const selectedElement = dropdownRef?.current.querySelector(
          `[data-value="${selected.label}"]`
        );
        if (selectedElement) {
          selectedElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }, 100);
    }
  }, [open, selected]);

  return (
    <div className="w-full">
      <Popover modal={true} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between w-full",
              !value && "text-muted-foreground"
            )}
          >
            {selectables ? selectables.label : (placeholder ?? "")}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          ref={dropdownRef}
          className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0"
        >
          <Command>
            <CommandInput
              placeholder={placeholder ?? "Search ..."}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    value={option.label}
                    key={option.value}
                    onSelect={() => {
                      handleSelect(option);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        option.value === selected?.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
