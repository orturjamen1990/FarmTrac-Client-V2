import growerService from "../services/growerService";
import { GrowerRes, GrowerReq } from "../types/types";
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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  grower?: GrowerRes;
  refetch?: () => Promise<void>;
};
const GrowerEditorDialog = ({
  isOpen,
  onClose,
  grower,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "growers"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    contactNumber: z.string().nonempty(),
    notes: z.string().optional(),
    establishedYear: z.date().optional(),
    location: z.string().optional(),
    active: z.boolean().optional(),
    id: z.number().optional(),
  });

  type GrowerType = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    name: "",
    notes: undefined,
    email: "",
    contactNumber: "",
    establishedYear: undefined,
    location: undefined,
    active: undefined,
  } as GrowerType;

  const form = useForm<GrowerType>({
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

  const onSubmit = async (formData: GrowerType) => {
    let response;
    try {
      if (formData.id) {
        response = await growerService.updateGrower(formData.id, formData);
      } else {
        response = await growerService.createGrower(formData);
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
      setTitle(!grower?.id ? "Create Grower" : "Update Grower");
    }
  }, [grower, isOpen]);

  useEffect(() => {
    if (grower) {
      form.reset(grower as GrowerType); // Reset the form with the item values
    }
  }, [grower, form]);

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
                      <FormLabel>{t("growers:form.name.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("growers:form.name.placeholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("growers:form.email.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("growers:form.email.placeholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="establishedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("growers:form.establishedYear.label")}
                      </FormLabel>
                      <FormControl>
                        <CalendarDatePicker
                          onChange={field.onChange}
                          value={field.value}
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
                      <FormLabel>{t("growers:form.location.label")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("growers:form.location.placeholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("growers:form.contactNumber.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t(
                            "growers:form.contactNumber.placeholder"
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
                      <FormLabel>{t("growers:form.notes.label")}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t("growers:form.notes.placeholder")}
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

export default GrowerEditorDialog;
