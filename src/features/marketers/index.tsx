import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Lucide from "@/components/Base/Lucide";
import service from "./services/marketerService";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { MarketerRes } from "./types";
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
import { Badge } from "@/components/ui/badge";
import MarketerEditorDialog from "./components/MarketerEditorDialog";

const Grower = () => {
  const { t, i18n } = useTranslation(["global", "marketers"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [marketers, setMarketers] = useState<MarketerRes[]>([]);
  const [marketer, setMarketer] = useState<MarketerRes>();
  const confirm = useConfirm();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      size: 50,
      minSize: 20,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("marketers:fields.id")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("marketers:fields.name")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "active",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("marketers:table.columns.active")}
        />
      ),
      cell: ({ row }) => {
        const className = row.getValue("active")
          ? "ring-green-600 text-green-700	bg-green-50 rounded-md border-green-200"
          : "ring-red-600 text-red-700	bg-red-50 rounded-md border-red-200";
        const text = row.getValue("active") ? t("active") : t("inactive");
        return (
          <>
            <Badge variant="outline" className={className}>
              {text}
            </Badge>
          </>
        );
      },
    },
    {
      accessorKey: "notes",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("marketers:fields.notes")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("notes")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      size: 80,
      minSize: 80,
      cell: ({ row }) => {
        const marketer = row.original;
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
                onClick={() => onEdit(marketer.id)}
                className="pl-[18px] pr-[24px] font-normal focus:bg-[#e7f0ff] focus:text-[#116dff]"
              >
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(marketer)}
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
    const response = await service.getMarketers();
    setMarketers(response.data.data);
  };

  const onEdit = async (id: number) => {
    const { data } = await service.getMarketerById(id);
    setMarketer(data.data);
    setIsOpen(true);
    console.log(data);
  };

  const onCloseDialog = () => {
    setMarketer(undefined);
    setIsOpen(false);
  };

  const onDelete = async (row: any) => {
    confirm({
      title: "Delete Confirmation",
      message: "Do you want to delete this record?",
      acceptClassName: "text-white bg-red-500 hover:bg-red-600",
      onConfirm: async () => {
        const response = await service.deleteMarketer(row.id);
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
          <div className="text-base font-medium group-[.mode--light]:text-white">
            {t("marketers:title")}
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
              {`${t("add")} ${t("marketers:title")}`}
            </Button>
          </div>
        </div>
        <DataTable
          data={marketers}
          columns={columns}
          showViewOptions={true}
          showGlobalFilter={true}
        />

        <MarketerEditorDialog
          isOpen={isOpen}
          onClose={onCloseDialog}
          data={marketer}
          refetch={fetchData}
        />
      </div>
    </div>
  );
};

export default Grower;
