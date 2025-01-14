import service from "../services/palletTypeService";
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

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
  refetch?: () => Promise<void>;
};
const PalletTypeEditorDialog = ({
  isOpen,
  onClose,
  data,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "form", "palletType"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    name: z.string().nonempty(),
    weight: z.number(),
    notes: z.string().optional(),
    id: z.number().optional(),
  });

  type PalletType = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    name: "",
    notes: "",
    weight: "",
  } as PalletType;

  const form = useForm<PalletType>({
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

  const onSubmit = async (formData: PalletType) => {
    let response;
    try {
      if (formData.id) {
        response = await service.updatePalletType(formData.id, formData);
      } else {
        response = await service.createPalletType(formData);
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
          ? `${t("add")} ${t("palletType:title")}`
          : `${t("update")} ${t("palletType:title")}`
      );
    }
  }, [data, isOpen]);

  useEffect(() => {
    if (data) {
      form.reset(data as PalletType); // Reset the form with the item values
    }
  }, [data, form]);

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
                      <FormLabel>{t("palletType:form.name.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("palletType:form.name.placeholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("palletType:form.weight.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("palletType:form.weight.placeholder")}
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
                      <FormLabel>{t("palletType:form.notes.label")}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t("palletType:form.notes.placeholder")}
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
    </>
  );
};

export default PalletTypeEditorDialog;
