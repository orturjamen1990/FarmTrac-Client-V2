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
import { Combobox } from "@/components/form/Combobox";
import lookupService, { KeyValueEntity, LookupValues } from "@/api/lookup";

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
  refetch?: () => Promise<void>;
};

type Produce = {
  value: number;
  label: string;
  sizes: Map<number, LookupValues>;
  species: Map<number, LookupValues>;
};

type ProduceMap = Record<number, Produce>;

const PalletEditorDialog = ({
  isOpen,
  onClose,
  data,
  refetch,
}: ComponentProps) => {
  const { t } = useTranslation(["global", "form", "pallets"]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [producesMap, setProducesMap] = useState<ProduceMap>();
  const [produces, setProduces] = useState<LookupValues[]>([]);
  const [produceSpeices, setProduceSpeices] = useState<LookupValues[]>([]);
  const [produceSizes, setProduceSizes] = useState<LookupValues[]>([]);
  const [palletTypes, setPalletTypes] = useState<LookupValues[]>([]);

  const formSchema = z.object({
    externalNumber: z.coerce.number(),
    id: z.number().optional(),
    packagingCount: z.number().min(1).max(100),
    produceId: z.number(),
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

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await lookupService.getProducesWithSpeciesAndSizes();
      const { data: palletTypes } = await lookupService.getPalletTypes();
      setPalletTypes(palletTypes.data);
      setProduces(
        response.data.data.map((x) => {
          return {
            label: x.name,
            value: x.id,
          };
        })
      );
      setProducesMap(buildProduceHashMap(response.data.data));
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  function buildProduceHashMap(data: any): any {
    return data.reduce((acc, item) => {
      acc[item.id] = {
        value: item.id,
        label: item.name,
        sizes: item.sizes.map((size) => ({
          value: size.id,
          label: size.name,
        })),
        species: item.species.map((species) => ({
          value: species.id,
          label: species.name,
        })),
      };
      return acc;
    }, {});
  }

  function onProduceChange(produceId: number) {
    console.log(produceId);
    form.setValue("produceSizeId", undefined);
    form.setValue("speciesId", undefined);
    setProduceSpeices(
      (producesMap?.[produceId]?.species ?? []) as LookupValues[]
    );
    setProduceSizes((producesMap?.[produceId]?.sizes ?? []) as LookupValues[]);
  }

  useEffect(() => {
    if (isOpen) {
      fetchData();
      setTitle(
        !data?.id
          ? `${t("add")} ${t("pallets:title")}`
          : `${t("update")} ${t("pallets:title")}`
      );
      if (data) {
        form.reset(data as Pallet); // Reset the form with the item values
      }
    } else {
      setProduces([]);
      setProduceSpeices([]);
      setProduceSizes([]);
      setPalletTypes([]);
      setProducesMap(undefined);
    }
  }, [isOpen]);

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
                        <Input
                          {...field}
                          placeholder={t(
                            "pallets:form.packagingCount.placeholder"
                          )}
                          type="number"
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
                    <FormItem>
                      <FormLabel>{t("growers:form.produceId.label")}</FormLabel>

                      <FormControl>
                        <Combobox
                          value={field.value}
                          onChange={(event) => {
                            onProduceChange(event);
                            field.onChange(event);
                          }}
                          options={produces}
                          getOptionValue={(option) => option.value}
                          placeholder={t(
                            "produceSize:form.produceId.placeholder"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="produceSizeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("pallets:form.size.label")}</FormLabel>
                      <FormControl>
                        <Combobox
                          value={field.value}
                          onChange={field.onChange}
                          options={produceSizes}
                          getOptionValue={(option) => option.value}
                          placeholder={t("pallets:form.size.label")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="speciesId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("pallets:form.species.label")}</FormLabel>
                      <FormControl>
                        <Combobox
                          value={field.value}
                          onChange={field.onChange}
                          options={produceSpeices}
                          getOptionValue={(option) => option.value}
                          placeholder={t("pallets:form.species.label")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="palletTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("pallets:form.palletType.label")}
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          value={field.value}
                          onChange={field.onChange}
                          options={palletTypes}
                          getOptionValue={(option) => option.value}
                          placeholder={t("pallets:form.palletType.label")}
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

export default PalletEditorDialog;
