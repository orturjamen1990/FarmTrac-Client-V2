import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Lucide from "@/components/Base/Lucide";
import service from "./services/palletService";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { MarketerRes, PalletRes, PalletsRes } from "./types";
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
  const { t, i18n } = useTranslation(["global", "pallets"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pallets, setPallets] = useState<PalletsRes[]>([]);
  const [pallet, setPallet] = useState<PalletRes>();
  const confirm = useConfirm();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      size: 50,
      minSize: 20,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("pallets:table.columns.id")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "externalNumber",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("pallets:table.columns.externalNumber")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("externalNumber")}</div>,
    },
    {
      accessorKey: "packagingCount",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("pallets:table.columns.packagingCount")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("packagingCount")}</div>,
    },
    {
      accessorKey: "produce.name",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("pallets:table.columns.produce")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("produce.name")}</div>,
    },
    {
      accessorKey: "species.name",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("pallets:table.columns.species")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("species.name")}</div>,
    },
    {
      accessorKey: "produceSize.name",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("pallets:table.columns.size")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("produceSize.name")}</div>,
    },
    {
      accessorKey: "palletType.name",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("palletType:table.columns.palletType")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("palletType.name")}</div>,
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
    const response = await service.getPallets();
    setPallets(response.data.data);
  };

  const onEdit = async (id: number) => {
    const { data } = await service.getPalletById(id);
    setPallet(data.data);
    setIsOpen(true);
    console.log(data);
  };

  const onCloseDialog = () => {
    setPallet(undefined);
    setIsOpen(false);
  };

  const onDelete = async (row: any) => {
    confirm({
      title: "Delete Confirmation",
      message: "Do you want to delete this record?",
      acceptClassName: "text-white bg-red-500 hover:bg-red-600",
      onConfirm: async () => {
        const response = await service.deletePallet(row.id);
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
            {t("pallets:title")}
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
              {`${t("add")} ${t("pallets:title")}`}
            </Button>
          </div>
        </div>
        <DataTable
          data={pallets}
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
