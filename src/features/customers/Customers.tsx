import { Button } from "@/components/ui/button";
import Lucide from "@/components/Base/Lucide";
import { Trash2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import customerService from "./services/customerService";
import { DataTable, DataTableColumnHeader } from "@/components/datatable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import CustomerEditorDialog from "./components/CustomerEditorDialog";

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
import { CustomerRes } from "./types";

const Customers = () => {
  const { t } = useTranslation(["global", "customers"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [customers, setCustomers] = useState<CustomerRes[]>([]);
  const [customer, setCustomer] = useState<CustomerRes>();
  const confirm = useConfirm();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("customers:table.columns.companyName")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "companyName",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("customers:table.columns.companyName")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("companyName")}</div>,
    },
    {
      accessorKey: "contactEmail",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("customers:table.columns.contactEmail")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("contactEmail")}</div>,
    },
    {
      accessorKey: "contactPhone",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("customers:table.columns.contactPhone")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("contactPhone")}</div>,
    },
    {
      accessorKey: "address",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("customers:table.columns.address")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("address")}</div>,
    },
    {
      accessorKey: "customerType.name",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("customers:fields.customerType")}
        />
      ),
      cell: ({ row }) => <div>{row.getValue("customerType.name")}</div>,
    },
    {
      accessorKey: "notes",
      size: 550,
      minSize: 100,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("customers:table.columns.notes")}
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
        const customer = row.original;

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
                onClick={() => onEdit(customer.id)}
                className="pl-[18px] pr-[24px] font-normal focus:bg-[#e7f0ff] focus:text-[#116dff]"
              >
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(customer)}
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
    const response = await customerService.getCustomers();
    setCustomers(response.data.data);
  };

  const onEdit = async (id: number) => {
    const { data } = await customerService.getCustomerById(id);
    setCustomer(data.data);
    setIsOpen(true);
  };

  const onCloseDialog = () => {
    setCustomer(undefined);
    setIsOpen(false);
  };

  const onDelete = async (row: any) => {
    confirm({
      title: "Delete Confirmation",
      message: "Do you want to delete this record?",
      acceptClassName: "text-white bg-red-500 hover:bg-red-600",
      onConfirm: async () => {
        const response = await customerService.deleteCustomer(row.id);
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
              {t("customers:title")}
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
              {`${t("add")} ${t("customers:title")}`}
            </Button>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={customers}
            columns={columns}
            showViewOptions={true}
            showGlobalFilter={true}
          />
        </div>
        <CustomerEditorDialog
          refetch={fetchData}
          isOpen={isOpen}
          onClose={onCloseDialog}
          item={customer}
        />
      </div>
    </div>
  );
};

export default Customers;
