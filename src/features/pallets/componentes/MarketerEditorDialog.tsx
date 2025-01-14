import service from "../services/palletService";
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
import { CreatePalletReq } from "../types";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
  refetch?: () => Promise<void>;
};
const PalletEditorDialog = ({
  isOpen,
  onClose,
  data,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "form", "pallets"]);
  const [title, setTitle] = useState("");

  const formSchema = z.object({
    externalNumber: z.coerce.number(),
    id: z.number().optional(),
    packagingCount: z.number().min(1).max(100),
    produceId: z.coerce.number(),
    produceSizeId: z.coerce.number().optional(),
    palletTypeId: z.coerce.number().optional(),
    speciesId: z.coerce.number().optional(),
  });

  type Pallet = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    externalNumber: "" as unknown,
    packagingCount: "" as unknown,
    produceId: "" as unknown,
    produceSizeId: "" as unknown,
    palletTypeId: "" as unknown,
    speciesId: "" as unknown,
  } as Pallet;

  const form = useForm<Pallet>({
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

  const onSubmit = async (formData: Pallet) => {
    let response;
    try {
      if (formData.id) {
        response = await service.updatePallet(formData.id, formData);
      } else {
        response = await service.createPallet(formData);
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
          ? `${t("add")} ${t("pallets:title")}`
          : `${t("update")} ${t("pallets:title")}`
      );
    }
  }, [data, isOpen]);

  useEffect(() => {
    if (isOpen && data) {
      form.reset(data as Pallet); // Reset the form with the item values
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
                  name="externalNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("pallets:form.externalNumber.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t(
                            "pallets:form.externalNumber.placeholder"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="packagingCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("pallets:form.packagingCount.label")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t(
                            "pallets:form.packagingCount.placeholder"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="produceId"
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

export default PalletEditorDialog;
