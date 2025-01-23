import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Lucide from "@/components/Base/Lucide";
import growingAreaService from "../services/growingAreaService";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { DataTable, DataTableColumnHeader } from "@/components/datatable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useConfirm } from "@/context/confirm-context";
import { toast } from "sonner";
import { TreatmentsRes } from "../types";
import { formatDate } from "@/lib/utils";
import TreatmentEditorDialog from "./TreatmentEditorDialog";

type Props = {
  growingAreaId: number;
};

const GrowingAreaTreatments = ({ growingAreaId }: Props) => {
  const { t, i18n } = useTranslation(["global", "growingAreas"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [treatments, setTreatments] = useState<TreatmentsRes[]>([]);
  const [treatment, setTreatment] = useState<any>({ growingAreaId });
  const confirm = useConfirm();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "treatmentId",
      size: 50,
      minSize: 20,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("growingAreas:table.columns.id")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "date",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("growingAreas:table.columns.date")}
        />
      ),
      cell: ({ row }) => <div>{formatDate(row.getValue("date")) as any}</div>,
    },
    {
      accessorKey: "chemical",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("growingAreas:table.columns.chemical")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("chemical")}</div>,
    },
    {
      accessorKey: "purpose",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("growingAreas:table.columns.purpose")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("purpose")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      size: 80,
      minSize: 80,
      cell: ({ row }) => {
        const treatment = row.original;
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
                onClick={() => onEdit(treatment.treatmentId)}
                className="pl-[18px] pr-[24px] font-normal focus:bg-[#e7f0ff] focus:text-[#116dff]"
              >
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(treatment)}
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
    const { data } =
      await growingAreaService.getGrowingAreaTreatments(growingAreaId);
    setTreatments(data.data.treatments);
  };

  const onEdit = async (id: number) => {
    const { data } = await growingAreaService.getGrowingAreaTreatmentById(id);
    setTreatment(data.data);
    setIsOpen(true);
  };

  const onCloseDialog = async () => {
    await fetchData();
    setTreatment({ growingAreaId });
    setIsOpen(false);
  };

  const onDelete = async (row: any) => {
    confirm({
      title: "Delete Confirmation",
      message: "Do you want to delete this record?",
      acceptClassName: "text-white bg-red-500 hover:bg-red-600",
      onConfirm: async () => {
        const response = await growingAreaService.deleteGrowingArea(row.id);
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
              {t("growingAreas:title")}
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 ltr:md:ml-auto rtl:md:mr-auto">
            <Button
              onClick={() => setIsOpen(true)}
              className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            >
              <Lucide
                icon="PenLine"
                className="stroke-[1.3] w-4 h-4 ltr:mr-2 rtl:ml-2"
              />
              {`${t("add")} ${t("growingAreas:title")}`}
            </Button>
          </div>
        </div>
        <DataTable
          data={treatments}
          columns={columns}
          showViewOptions={true}
          showGlobalFilter={true}
        />

        <TreatmentEditorDialog
          isOpen={isOpen}
          onClose={onCloseDialog}
          item={treatment}
          refetch={fetchData}
        />
      </div>
    </div>
  );
};

export default GrowingAreaTreatments;
