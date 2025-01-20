import calendarEventsService from "../services//calendarEventsService";
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
import {
  CalendarEventsRes,
  CreateCalendarEventReq,
  UpdateCalendarEventReq,
} from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: CalendarEventsRes;
  refetch?: () => Promise<void>;
};
const CalendarEventEditorDialog = ({
  isOpen,
  onClose,
  item,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "customers"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    title: z.string().nonempty(),
    startTime: z.date(),
    endTime: z.date(),
    id: z.number().optional(),
    description: z.string().optional(),
  });

  type CalendarEvent = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    title: "",
    startTime: undefined as unknown,
    endTime: undefined as unknown,
    description: "",
  } as CalendarEvent;

  const form = useForm<CalendarEvent>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: CalendarEvent) => {
    let response;
    try {
      if (values.id) {
        const data = values as UpdateCalendarEventReq;
        response = await calendarEventsService.updateCalendarEvent(
          data.id,
          data
        );
      } else {
        const data = values as CreateCalendarEventReq;
        response = await calendarEventsService.createCalendarEvent(data);
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
          ? `${t("add")} ${t("a New Event")}`
          : `${t("update")} ${t("a New Event")}`
      );
    }
  }, [item, isOpen]);

  useEffect(() => {
    if (item) {
      form.reset(item as CalendarEvent); // Reset the form with the item values
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("title")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("title")}</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("startTime")}</FormLabel>
                      <FormControl>
                        <CalendarDatePicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("endTime")}</FormLabel>
                      <FormControl>
                        <CalendarDatePicker {...field} />
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
  );
};

export default CalendarEventEditorDialog;
