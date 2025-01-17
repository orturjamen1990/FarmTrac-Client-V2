import produceService from "../services/produceService";
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
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: any;
  refetch?: () => Promise<void>;
};
const ProduceEditorDialog = ({
  isOpen,
  onClose,
  item,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "produce"]);
  const [title, setTitle] = useState("");
  const formSchema = z.object({
    name: z.string().nonempty(),
    id: z.number().optional(),
  });

  type Produce = z.infer<typeof formSchema>;

  const defaultValues = {
    id: undefined,
    name: "",
  } as Produce;

  const form = useForm<Produce>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: Produce) => {
    let response;
    try {
      if (values.id) {
        const data = values as any;
        response = await produceService.updateProduce(data.id, data);
      } else {
        const data = values as any;
        response = await produceService.createProduce(data);
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
          ? `${t("add")} ${t("produce:title")}`
          : `${t("update")} ${t("produce:title")}`
      );
    }
  }, [item, isOpen]);

  useEffect(() => {
    if (item) {
      form.reset(item as Produce); // Reset the form with the item values
    }
  }, [item, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid">
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
                    <FormLabel>{t("produce:form.name.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("produce:form.name.placeholder")}
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

export default ProduceEditorDialog;
