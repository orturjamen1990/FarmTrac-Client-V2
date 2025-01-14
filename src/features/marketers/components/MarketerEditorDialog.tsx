import service from "../services/marketerService";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { CreateMarketerReq, UpdateMarketerReq } from "../types";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
  refetch?: () => Promise<void>;
};
const MarketerEditorDialog = ({
  isOpen,
  onClose,
  data,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "form", "marketers"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    name: z.string().nonempty(),
    active: z.boolean().optional(),
    notes: z.string().optional(),
    id: z.number().optional(),
  });

  type Marketer = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    name: "",
    notes: "",
    active: false,
  } as Marketer;

  const form = useForm<Marketer>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onOpenChange = (event: boolean) => {
    onCloseDialog();
  };

  const onCloseDialog = () => {
    form.reset(defaultValues);
    onClose();
  };

  const onSubmit = async (formData: Marketer) => {
    let response;
    try {
      if (formData.id) {
        response = await service.updateMarketer(
          formData.id,
          formData as UpdateMarketerReq
        );
      } else {
        response = await service.createMarketer(formData as CreateMarketerReq);
      }
      toast.success("Action Successful", {
        description: response?.data?.messages[0],
      });
      await refetch?.();
      onClose();
    } catch (error) {
      toast.error("Action Failed", {
        description: response?.data?.messages[0],
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(
        !data?.id
          ? `${t("add")} ${t("marketers:title")}`
          : `${t("update")} ${t("marketers:title")}`
      );
    }
  }, [data, isOpen]);

  useEffect(() => {
    if (isOpen && data) {
      form.reset(data as Marketer); // Reset the form with the item values
    }
  }, [data, isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
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
                      <FormLabel>{t("marketers:form.name.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("marketers:form.name.placeholder")}
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
                      <FormLabel>{t("marketers:form.notes.label")}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t("marketers:form.notes.placeholder")}
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
                      <FormLabel>{t("growers:form.active.label")}</FormLabel>
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
    </>
  );
};

export default MarketerEditorDialog;
