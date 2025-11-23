"use client";

import { ColumnDef, flexRender, type Row } from "@tanstack/react-table";
import { Table as TableType } from "@tanstack/table-core";
import * as React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ActionsContextMenu,
  ActionsMenuItems,
} from "@/components/common/actions-menu";
import FormLoader from "@/components/skeleton/form-loader";

export const EmptyDataTable = ({ colLength }: { colLength: number }) => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={colLength} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    </>
  );
};

export function defaultRenderRow<TData>(row: Row<TData>) {
  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

interface DataTableRenderProps<TData, TValue> {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  // renderRow?: (row: Row<TData>) => React.ReactNode
  actionsMenuItems?: ActionsMenuItems | ((tdata: TData) => ActionsMenuItems);
  EmptyTable?: (props: { colLength: number }) => React.ReactNode;
  isTableContentUpdating?: boolean;
}

export function DataTableRender<TData, TValue>({
  table,
  columns,
  actionsMenuItems,
  EmptyTable = EmptyDataTable,
  isTableContentUpdating = false,
}: DataTableRenderProps<TData, TValue>) {
  const renderRow = actionsMenuItems
    ? (row: Row<TData>) => {
        return (
          <ActionsContextMenu
            key={row.id}
            menuItems={
              typeof actionsMenuItems === "function"
                ? actionsMenuItems(row.original)
                : actionsMenuItems
            }
          >
            {defaultRenderRow(row)}
          </ActionsContextMenu>
        );
      }
    : defaultRenderRow;

  return (
    <ScrollArea className="rounded-lg border bg-white dark:bg-gray-900">
      {isTableContentUpdating && <FormLoader />}
      <Table className="relative">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="dark:text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map(renderRow)
            : EmptyTable({ colLength: columns.length })}
        </TableBody>
      </Table>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
