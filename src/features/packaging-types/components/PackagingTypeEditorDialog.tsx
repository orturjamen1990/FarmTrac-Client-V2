import service from "../services/packagingTypeService";
import {
  UpdatePackagingTypeReq,
  CreatePackagingTypeReq,
  PackagingTypeRes,
} from "../types";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { flushSync } from "react-dom";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: PackagingTypeRes;
  refetch?: () => Promise<void>;
};
const PackagignTypeEditorDialog = ({
  isOpen,
  onClose,
  data,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "packagingType"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    name: z.string().nonempty(),
    unitWeight: z.coerce.number().min(1),
    notes: z.string().optional(),
    id: z.number().optional(),
  });

  const schemaOptional = formSchema.partial();

  type PackagignTypeOptional = z.infer<typeof schemaOptional>;

  type PackagignType = z.infer<typeof formSchema>;

  const defaultValues = {
    name: "",
    notes: "",
    unitWeight: "" as unknown,
  } as PackagignTypeOptional;

  const form = useForm<PackagignType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onOpenChange = (event: boolean) => {
    onCloseDialog();
  };

  const onCloseDialog = () => {
    flushSync(() => {
      onClose();
      form.reset(defaultValues);
    });
  };

  const onSubmit = async (formData: PackagignType) => {
    let response;
    try {
      if (formData.id) {
        response = await service.updatePackagingType(
          formData.id,
          formData as UpdatePackagingTypeReq
        );
      } else {
        response = await service.createPackagingType(
          formData as CreatePackagingTypeReq
        );
      }
      toast.success("Action Successful", {
        description: response?.data?.messages[0],
      });
      await refetch?.();
      onCloseDialog();
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
          ? `${t("add")} ${t("packagingType:title")}`
          : `${t("update")} ${t("packagingType:title")}`
      );
      form.reset(data as PackagignType);
    }
  }, [data, isOpen]);

  //   useEffect(() => {
  //     if (data) {
  //       form.reset(data as PackagignType); // Reset the form with the item values
  //     }
  //   }, [data, form]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription></DialogDescription>
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
                      <FormLabel>
                        {t("packagingType:form.name.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("packagingType:form.name.placeholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unitWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("packagingType:form.unitWeight.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder={t(
                            "packagingType:form.unitWeight.placeholder"
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
                      <FormLabel>
                        {t("packagingType:form.notes.label")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t(
                            "packagingType:form.notes.placeholder"
                          )}
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

export default PackagignTypeEditorDialog;
