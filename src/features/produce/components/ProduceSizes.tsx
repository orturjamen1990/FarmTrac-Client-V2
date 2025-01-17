import { Button } from "@/components/ui/button";
import Lucide from "@/components/Base/Lucide";
import { Trash2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import produceService from "../services/produceService";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { MoreHorizontal } from "lucide-react";
import { useConfirm } from "@/context/confirm-context";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader } from "@/components/datatable";
import { ProduceSizeReq, ProduceSizes } from "../types";
import ProduceSizeEditorDialog from "./ProduceSizeEditorDialog";

type ProduceSizesProps = {
  produceId: number;
};

const ProduceSize = ({ produceId }: ProduceSizesProps) => {
  const { t } = useTranslation(["global", "produceSize"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [produceSizes, setProduceSizes] = useState<ProduceSizes[]>([]);
  const [produceSize, setProduceSize] = useState<Partial<ProduceSizeReq>>();
  const confirm = useConfirm();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("id")} />
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("name")} />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      size: 80,
      minSize: 80,
      cell: ({ row }) => {
        const produceSize = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="pt-[12px] pb-[12px]" align="end">
              <DropdownMenuItem
                onClick={() => onEdit(produceSize)}
                className="pl-[18px] pr-[24px] font-normal focus:bg-[#e7f0ff] focus:text-[#116dff]"
              >
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(produceSize)}
                className="pl-[18px] pr-[24px] text-[#ee5951]	font-normal focus:bg-[#fdeceb] focus:text-[#ee5951]"
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const fetchData = async () => {
    const response = await produceService.getProduceSizes(produceId);
    setProduceSizes(response.data.data.sizes ?? []);
  };

  const onEdit = async (data: ProduceSizes) => {
    setProduceSize({
      id: data.id,
      size: data.name,
      produceId: produceId,
    });
    setIsOpen(true);
  };

  const onCloseDialog = () => {
    setProduceSize(undefined);
    setIsOpen(false);
  };

  const onDelete = async (row: any) => {
    confirm({
      title: "Delete Confirmation",
      message: "Do you want to delete this record?",
      acceptClassName: "text-white bg-red-500 hover:bg-red-600",
      onConfirm: async () => {
        const response = await produceService.deleteProduceSize(row.id);
        await fetchData();
        toast.success("Action Successful", {
          description: response?.data?.messages[0],
        });
      },
    });
  };

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      await fetchData();
      setIsLoading(false);
    }
    fetch();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="col-span-12">
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t("produceSize:title")}
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 ltr:md:ml-auto rtl:md:mr-auto">
            <Button
              onClick={() => {
                setProduceSize({
                  produceId,
                });
                setIsOpen(true);
              }}
              className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            >
              <Lucide
                icon="PenLine"
                className="stroke-[1.3] w-4 h-4 ltr:mr-2 rtl:ml-2"
              />
              {`${t("add")} ${t("produceSize:title")}`}
            </Button>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={produceSizes}
            columns={columns}
            showViewOptions={true}
            showGlobalFilter={true}
          />
        </div>
        <ProduceSizeEditorDialog
          refetch={fetchData}
          isOpen={isOpen}
          onClose={onCloseDialog}
          item={produceSize}
        />
      </div>
    </div>
  );
};

export default ProduceSize;
