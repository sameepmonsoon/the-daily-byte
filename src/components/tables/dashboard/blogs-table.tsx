"use client";
import { useReactTable } from "@tanstack/react-table";
import { getCoreRowModel, TableOptions } from "@tanstack/table-core";
import { Edit, EyeIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import { AdminBlogsColumns } from "../columns/blogs-table-columns";
import { DataTableRender } from "../data-table/renderRow";
import { ActionsDropdownMenu } from "@/components/common/actions-menu";
import { AdminBlogs } from "@/types/dashboard/dashboard-types";
import ConfirmDeleteDialog from "@/components/common/dialogs/confirm-delete";
import { BlogService } from "@/services/public/blog-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function AdminBlogsTable({ blogs }: { blogs: AdminBlogs[] }) {
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
          <Link
            prefetch={false}
            href={`/dashboard/blogs/${blog.slug}`}
            className="flex items-center"
          >
            <EyeIcon className="h-3 w-3" />
            <span>View Details</span>
          </Link>
        ),
        asChild: true,
      },
      {
        label: (
          <Link
            prefetch={false}
            href={`/dashboard/blogs/${blog.slug}/edit`}
            className="flex items-center"
          >
            <Edit className="mr-2.5 h-3 w-3" />
            <span>Edit</span>
          </Link>
        ),
        onClick: () => {
          setIsStatusUpdating(false);
        },
      },
      {
        label: (
          <div className="flex items-center">
            <Trash2 className="mr-2.5 h-3 w-3" />
            <span>Delete</span>
          </div>
        ),
        onClick: () => {
          setDeleteConfirm({
            open: true,
            id: blog.id,
            loading: false,
          });
        },
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
          const blog = row.original;

          return <ActionsDropdownMenu menuItems={actionsMenuItems(blog)} />;
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

  async function deleteBlog(id: string | undefined) {
    if (!id) return;
    const response = await BlogService.delete(id);

    if (response.success) {
      toast.success(response.message);
      resetDeleteConfirm();
      router.refresh();

      // Optional: navigate to page 1 if needed
      router.replace(`/dashboard/blogs/list?page=1`, { scroll: true });
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
        onDelete={() => deleteBlog(deleteConfirm.id)}
        name={"this blog"}
      />
    </div>
  );
}

export default AdminBlogsTable;
