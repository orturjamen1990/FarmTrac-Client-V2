import carrierService from "../services/carrierService";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { CarrierRes, CreateCarrierReq, UpdateCarrierReq } from "../types";
import lookupService, { LookupValues } from "@/api/lookup";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: CarrierRes;
  refetch?: () => Promise<void>;
};
const CarrierEditorDialog = ({
  isOpen,
  onClose,
  item,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "carriers"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    name: z.string().nonempty(),
    contactPhone: z.string().nonempty(),
    contactEmail: z.string().email(),
    id: z.number().optional(),
    notes: z.string().optional(),
    address: z.string().nonempty(),
    active: z.boolean(),
  });

  type Carrier = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    name: "",
    contactPhone: "",
    contactEmail: "",
    active: false,
    notes: "",
    address: "",
  } as Carrier;

  const form = useForm<Carrier>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: Carrier) => {
    let response;
    try {
      if (values.id) {
        const data = values as UpdateCarrierReq;
        response = await carrierService.updateCarrier(data.id, data);
      } else {
        const data = values as CreateCarrierReq;
        response = await carrierService.createCarrier(data);
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

  const onOpenChange = (event: boolean) => {
    onCloseDialog();
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(
        !item?.id
          ? `${t("add")} ${t("carriers:title")}`
          : `${t("update")} ${t("carriers:title")}`
      );
    }
  }, [item, isOpen]);

  useEffect(() => {
    if (item) {
      form.reset(item as Carrier); // Reset the form with the item values
    }
  }, [item, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] py-4">
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                id="Form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>{t("carriers:form.name.label")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t("carriers:form.name.placeholder")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("carriers:form.contactEmail.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t(
                            "carriers:form.contactEmail.placeholder"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("carriers:form.address.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("carriers:form.address.placeholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("carriers:form.contactPhone.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t(
                            "carriers:form.contactPhone.placeholder"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("carriers:form.notes.label")}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t("carriers:form.notes.placeholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("carriers:form.active.label")}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </ScrollArea>
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

export default CarrierEditorDialog;
