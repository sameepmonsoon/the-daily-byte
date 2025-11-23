"use client";
import { useReactTable } from "@tanstack/react-table";
import { getCoreRowModel, TableOptions } from "@tanstack/table-core";
import { ArchiveRestore } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AdminBlogsColumns } from "../columns/blogs-table-columns";
import { DataTableRender } from "../data-table/renderRow";
import { ActionsDropdownMenu } from "@/components/common/actions-menu";
import { AdminBlogs } from "@/types/dashboard/dashboard-types";
import ConfirmDeleteDialog from "@/components/common/dialogs/confirm-delete";
import { BlogService } from "@/services/public/blog-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function DeletedBlogsTable({ blogs }: { blogs: AdminBlogs[] }) {
  const [refreshKey, setRefreshKey] = useState<string | number>(0);
  const [isStatusUpdating, setIsStatusUpdating] = useState<boolean>(false);
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    id: string | undefined;
    loading: boolean;
  }>({
    open: false,
    id: undefined,
    loading: false,
  });

  const resetDeleteConfirm = () => {
    setDeleteConfirm({
      open: false,
      id: undefined,
      loading: false,
    });
  };

  const actionsMenuItems = useCallback(
    (blog: AdminBlogs) => [
      {
        label: (
          <div className="flex items-center">
            <ArchiveRestore className="mr-2.5 h-3 w-3" />
            <span>Restore</span>
          </div>
        ),
        onClick: () => restoreBlog(blog.id),
      },
    ],

    [],
  );

  const blogsColumnTable = useMemo(
    () => [
      ...AdminBlogsColumns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const order = row.original;

          return <ActionsDropdownMenu menuItems={actionsMenuItems(order)} />;
        },
      },
    ],
    [actionsMenuItems],
  );
  const tableOptions: TableOptions<any> = {
    data: blogs || [],
    columns: blogsColumnTable,
    getCoreRowModel: getCoreRowModel(),
  };

  const table = useReactTable(tableOptions);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  async function restoreBlog(id: string | undefined) {
    if (!id) return;
    const response = await BlogService.restore(id);

    if (response.success) {
      toast.success(response.message);
      resetDeleteConfirm();
      setRefreshKey(id);
      router.refresh(); // refreshes the current page data

      // Optional: navigate to page 1 if needed
      router.replace(`/dashboard/blogs/deleted?page=1`, { scroll: true });
    } else {
      toast.error(response?.message);
    }
  }
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-12! w-full cursor-pointer bg-white/70 sm:w-[200px] dark:bg-gray-900!">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-900! dark:text-white">
            <SelectItem value="all" className="cursor-pointer">
              All Category
            </SelectItem>
            <SelectItem value="pending" className="cursor-pointer">
              Electronics
            </SelectItem>
            <SelectItem value="processing" className="cursor-pointer">
              Wearables
            </SelectItem>
            <SelectItem value="delivered" className="cursor-pointer">
              Accessories
            </SelectItem>
            <SelectItem value="cancelled" className="cursor-pointer">
              Furniture
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTableRender
        key={JSON.stringify(blogs)}
        table={table}
        columns={blogsColumnTable}
        actionsMenuItems={actionsMenuItems}
        isTableContentUpdating={isStatusUpdating}
      />

      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        loading={deleteConfirm.loading}
        onReset={resetDeleteConfirm}
        onDelete={() => restoreBlog(deleteConfirm.id)}
        name={"this blog"}
      />
    </div>
  );
}

export default DeletedBlogsTable;
