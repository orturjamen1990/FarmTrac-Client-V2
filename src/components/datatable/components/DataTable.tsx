import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TreesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showViewOptions?: boolean;
  showGlobalFilter?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showViewOptions = false,
  showGlobalFilter = false,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(), // needed for client-side global filtering
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {showGlobalFilter && (
          <Input
            value={globalFilter}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            placeholder="Search..."
            className="max-w-sm"
          />
        )}
        {showViewOptions && <DataTableViewOptions table={table} />}
      </div>

      <div className="rounded-md border ">
        <Table>
          <TableHeader className="bg-[--gray-a2]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-[#21201c]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  className={cn({
                    "align-middle ": true,
                    "bg-[--gray-1] hover:bg-[--gray-3] ark:bg-[--gray-1] dark:hover:bg-[--gray-3]":
                      index % 2 === 0,
                    "bg-[--accent-2] hover:bg-[--accent-3] dark:bg-[--accent-2] dark:hover:bg-[--accent-3]":
                      index % 2 !== 0,
                  })}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-3">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
