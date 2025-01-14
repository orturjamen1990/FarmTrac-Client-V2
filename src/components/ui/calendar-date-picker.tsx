import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  onChange: (date: Date) => void;
  value?: Date;
}

export function CalendarDatePicker({ onChange, value }: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date>();

  function toggleSelect() {
    if (!date) return;
    onChange(date);
  }

  React.useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);
  return (
    <Popover
      onOpenChange={(current) => {
        if (!current) {
          toggleSelect();
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy | HH:mm") : <span>Select Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d);
          }}
          initialFocus
        />
        <div className="flex justify-between border-t border-border p-3">
          {/* <TimePickerDemo
            setDate={(d) => {
              setDate((currentDate) => {
                if (!currentDate) return;
                if (!d) return;

                // console.log({ d, currentDate });

                return set(currentDate, {
                  hours: d.getHours(),
                  minutes: d.getMinutes(),
                });
              });
            }}
            date={date}
          /> */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
