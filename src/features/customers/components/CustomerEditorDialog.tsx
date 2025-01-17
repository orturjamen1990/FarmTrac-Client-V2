import customerService from "../services/customerService";
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
import { CreateCustomerReq, CustomerRes, UpdateCustomerReq } from "../types";
import lookupService, { LookupValues } from "@/api/lookup";
import { Switch } from "@/components/ui/switch";
import { Combobox } from "@/components/form/Combobox";
import { ScrollArea } from "@/components/ui/scroll-area";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: CustomerRes;
  refetch?: () => Promise<void>;
};
const CustomerEditorDialog = ({
  isOpen,
  onClose,
  item,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "customers"]);
  const [title, setTitle] = useState("");
  const [customerTypes, setCustomerTypes] = useState<LookupValues[]>([]);
  const formSchema = z.object({
    companyName: z.string().nonempty(),
    contactPhone: z.string().nonempty(),
    contactEmail: z.string().email(),
    customerTypeId: z.number(),
    id: z.number().optional(),
    active: z.boolean(),
    notes: z.string().optional(),
    address: z.string().nonempty(),
  });

  type Customer = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    companyName: "",
    contactPhone: "",
    contactEmail: "",
    customerTypeId: undefined as unknown,
    active: false,
    notes: "",
    address: "",
  } as Customer;

  const form = useForm<Customer>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: Customer) => {
    let response;
    try {
      if (values.id) {
        const data = values as UpdateCustomerReq;
        response = await customerService.updateCustomer(data.id, data);
      } else {
        const data = values as CreateCustomerReq;
        response = await customerService.createCustomer(data);
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

  const fetchData = async () => {
    try {
      const response = await lookupService.getCustomerTypes();
      setCustomerTypes(response.data.data);
    } catch (error) {
      console.error("failed to load customer types");
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(
        !item?.id
          ? `${t("add")} ${t("customer:title")}`
          : `${t("update")} ${t("customer:title")}`
      );
    }
  }, [item, isOpen]);

  useEffect(() => {
    if (item) {
      form.reset(item as Customer); // Reset the form with the item values
    }
  }, [item, form]);

  useEffect(() => {
    fetchData();
  }, []);

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
                  name="customerTypeId"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>
                          {t("customers:form.customerTypeId.label")}
                        </FormLabel>
                        <FormControl>
                          <Combobox
                            value={field.value}
                            onChange={field.onChange}
                            options={customerTypes}
                            getOptionValue={(option) => option.value}
                            placeholder={t(
                              "customers:form.customerTypeId.placeholder"
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
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("customers:form.companyName.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t(
                            "customers:form.companyName.placeholder"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("customers:form.contactEmail.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t(
                            "customers:form.contactEmail.placeholder"
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
                      <FormLabel>{t("customers:form.address.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("customers:form.address.placeholder")}
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
                        {t("customers:form.contactPhone.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t(
                            "customers:form.contactPhone.placeholder"
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
                      <FormLabel>{t("customers:form.notes.label")}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t("customers:form.notes.placeholder")}
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
                      <FormLabel>{t("customers:form.active.label")}</FormLabel>
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

export default CustomerEditorDialog;
