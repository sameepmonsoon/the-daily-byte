"use client";
import { useReactTable } from "@tanstack/react-table";
import { getCoreRowModel, TableOptions } from "@tanstack/table-core";
import { ArchiveRestore } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

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
