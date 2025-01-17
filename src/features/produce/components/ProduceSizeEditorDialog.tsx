import produceService from "../services/produceService";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import lookupService, { LookupValues } from "@/api/lookup";
import { Combobox } from "@/components/form/Combobox";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: any;
  refetch?: () => Promise<void>;
};
const ProduceSizeEditorDialog = ({
  isOpen,
  onClose,
  item,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "produceSize"]);
  const [title, setTitle] = useState("");
  const [produces, setProduces] = useState<LookupValues[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const formSchema = z.object({
    size: z.string().nonempty(),
    id: z.number().optional(),
    produceId: z.number(),
  });

  type ProduceSize = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    size: "",
    produceId: undefined as unknown,
  } as ProduceSize;

  const form = useForm<ProduceSize>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProduceSize) => {
    let response;
    try {
      if (values.id) {
        const data = values as any;
        response = await produceService.updateProduceSize(data.id, data);
      } else {
        const data = values as any;
        response = await produceService.createProduceSize(data);
      }
      await refetch?.();
      onClose();

      toast.success("Action Successful", {
        description: response?.data?.messages[0],
      });
    } catch (error) {
      toast.error("Action Failed", {
        description: response?.data?.messages[0],
      });
      console.error(error);
    }
  };

  const onCloseDialog = () => {
    form.reset(defaultValues);
    onClose();
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await lookupService.getProducers();
      setProduces(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onOpenChange = (event: boolean) => {
    onCloseDialog();
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(
        !item?.id
          ? `${t("add")} ${t("produceSize:title")}`
          : `${t("update")} ${t("produceSize:title")}`
      );
    }
  }, [item, isOpen]);

  useEffect(() => {
    if (item) {
      form.reset(item as ProduceSize); // Reset the form with the item values
    }
  }, [item, form]);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {!isLoading && (
          <div className="grid">
            <Form {...form}>
              <form
                id="Form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="produceId"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>
                          {t("produceSize:form.produceId.label")}
                        </FormLabel>
                        <FormControl>
                          <Combobox
                            value={field.value}
                            onChange={field.onChange}
                            options={produces}
                            getOptionValue={(option) => option.value}
                            placeholder={t(
                              "produceSize:form.produceId.placeholder"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("produceSize:form.size.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("produceSize:form.size.placeholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        )}
        <DialogFooter>
          <Button
            variant={"outline"}
            type="button"
            className="w-20 ltr:mr-1 rtl:ml-1"
            onClick={onCloseDialog}
          >
            {t("cancel")}
          </Button>
          <Button type="submit" className="w-20" form="Form">
            {t("submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProduceSizeEditorDialog;
