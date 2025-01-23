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
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: Record<string, any>;
  refetch?: () => Promise<void>;
};

const TreatmentEditorDialog = ({
  isOpen,
  onClose,
  item,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "growingAreas"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    date: z.date(),
    chemical: z.string().nonempty(),
    purpose: z.string().nonempty(),
    treatmentId: z.number().optional(),
  });

  type GrowingAreaTreatmentType = z.infer<typeof formSchema>;

  const defaultValues = {
    treatmentId: undefined,
    date: "" as unknown,
    chemical: "",
    purpose: "",
  } as GrowingAreaTreatmentType;

  const form = useForm<GrowingAreaTreatmentType>({
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

  const onSubmit = async (formData: GrowingAreaTreatmentType) => {
    let response;
    try {
      if (formData.treatmentId) {
        response = await growingAreaService.updateGrowingAreaTreatment(
          formData.treatmentId,
          formData
        );
      } else {
        response =
          await growingAreaService.createGrowingAreaTreatment(formData);
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
      form.reset(item as GrowingAreaTreatmentType); // Reset the form with the item values
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
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("growingAreas:form.date.label")}
                        </FormLabel>
                        <FormControl>
                          <CalendarDatePicker {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="chemical"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("growingAreas:form.chemical.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              "growingAreas:form.chemical.placeholder"
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("growingAreas:form.purpose.label")}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={t(
                              "growingAreas:form.purpose.placeholder"
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

export default TreatmentEditorDialog;
