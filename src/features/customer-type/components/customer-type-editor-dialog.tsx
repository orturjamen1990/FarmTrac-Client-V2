import customerTypeService from "../services/customerTypeService";
import { useTranslation } from "react-i18next";
import {
  CreateCustomerTypeReq,
  CustomerTypeRes,
  UpdateCustomerTypeReq,
} from "../types/types";
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

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: CustomerTypeRes;
  refetch?: () => Promise<void>;
};
const CustomerTypeEditorDialog = ({
  isOpen,
  onClose,
  item,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "customerType"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    name: z.string().nonempty(),
    notes: z.string().optional(),
    id: z.number().optional(),
  });

  type CustomerType = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    name: "",
    notes: "",
  } as CustomerType;

  const form = useForm<CustomerType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: CustomerType) => {
    let response;
    try {
      if (values.id) {
        const data = values as UpdateCustomerTypeReq;
        response = await customerTypeService.updateCustomerType(data.id, data);
      } else {
        const data = values as CreateCustomerTypeReq;
        response = await customerTypeService.createCustomerType(data);
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
          ? `${t("add")} ${t("customerType:title")}`
          : `${t("update")} ${t("customerType:title")}`
      );
    }
  }, [item, isOpen]);

  useEffect(() => {
    if (item) {
      form.reset(item as CustomerType); // Reset the form with the item values
    }
  }, [item, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
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
                  <FormItem>
                    <FormLabel>{t("customerType:form.name.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("customerType:form.name.placeholder")}
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
                    <FormLabel>{t("customerType:form.notes.label")}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t("customerType:form.notes.placeholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
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

export default CustomerTypeEditorDialog;
