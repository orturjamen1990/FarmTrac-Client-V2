import growingAreaService from "../services/growingAreaService";
import { GrowingAreaRes } from "../types";
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
import { ScrollArea } from "@/components/ui/scroll-area";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: GrowingAreaRes;
  refetch?: () => Promise<void>;
};
const GrowingAreaEditorDialog = ({
  isOpen,
  onClose,
  item,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "growingAreas"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    name: z.string().nonempty(),
    location: z.string().nonempty(),
    size: z.string().optional(),
    soilType: z.string().optional(),
    climate: z.string().optional(),
    notes: z.string().optional(),
    irrigationType: z.string().optional(),
    id: z.number().optional(),
  });

  type GrowingAreaType = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    name: "",
    notes: "",
    location: "",
    size: "",
    soilType: "",
    climate: "",
    irrigationType: "",
  } as GrowingAreaType;

  const form = useForm<GrowingAreaType>({
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

  const onSubmit = async (formData: GrowingAreaType) => {
    let response;
    try {
      if (formData.id) {
        response = await growingAreaService.updateGrowingArea(
          formData.id,
          formData
        );
      } else {
        response = await growingAreaService.createGrowingArea(formData);
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
        !item?.id
          ? `${t("add")} ${t("growingAreas:title")}`
          : `${t("update")} ${t("growingAreas:title")}`
      );
    }
  }, [item, isOpen]);

  useEffect(() => {
    if (item) {
      form.reset(item as GrowingAreaType); // Reset the form with the item values
    }
  }, [item, form]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
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
                      <FormItem>
                        <FormLabel>
                          {t("growingAreas:form.name.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              "growingAreas:form.name.placeholder"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("growingAreas:form.location.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              "growingAreas:form.location.placeholder"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("growingAreas:form.size.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              "growingAreas:form.size.placeholder"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soilType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("growingAreas:form.soilType.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              "growingAreas:form.soilType.placeholder"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="irrigationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("growingAreas:form.irrigationType.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              "growingAreas:form.irrigationType.placeholder"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="climate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("growingAreas:form.climate.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              "growingAreas:form.climate.placeholder"
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
                          {t("growingAreas:form.notes.label")}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={t(
                              "growingAreas:form.notes.placeholder"
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
    </>
  );
};

export default GrowingAreaEditorDialog;
