"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Shield, ShieldOff } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { AdminBlogs, AdminStatus } from "@/types/dashboard/dashboard-types";

export const statusConfig: Record<
  AdminStatus | "default",
  { icon: React.ReactNode; color: string }
> = {
  active: {
    icon: <Shield className="h-4 w-4" />,
    color: "bg-green-100 text-green-800",
  },
  inactive: {
    icon: <ShieldOff className="h-4 w-4" />,
    color: "bg-amber-100 text-amber-800",
  },
  default: {
    icon: <ShieldOff className="h-4 w-4" />,
    color: "bg-amber-100 text-amber-800",
  },
};
export const AdminBlogsColumns: ColumnDef<AdminBlogs>[] = [
  {
    id: "id",
    header: "Blog ID",
    accessorKey: "id",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Badge
          variant="outline"
          className="line-clamp-1 max-w-22 text-ellipsis"
        >
          {id}
        </Badge>
      );
    },
  },

  {
    id: "title",
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      const name = row.original.title;
      return (
        <span className={`line-clamp-2 max-w-52 font-semibold text-ellipsis`}>
          {name}
        </span>
      );
    },
  },
  {
    id: "createdAt",
    header: "Created At",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return <span>{format(new Date(createdAt), "MMMM dd, yyyy")}</span>;
    },
  },

  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => {
      const description = row.original.description;
      return (
        <span
          className={`line-clamp-1 w-52 overflow-hidden font-semibold text-ellipsis`}
        >
          {description}
        </span>
      );
    },
  },

  {
    id: "category",
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => {
      const category = row.original.category;
      return <span className={`font-semibold`}>{category}</span>;
    },
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.active ? "active" : "inactive";
      const { icon, color } = statusConfig[status] || statusConfig.default;
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${color}`}
        >
          {icon}
          {status}
        </span>
      );
    },
  },
  {
    id: "image",
    header: "Blog Image",
    accessorKey: "image",
    cell: ({ row }) => {
      const imgUrl = row.original.coverimage;
      return (
        <div className="flex w-auto items-center">
          <div className="flex -space-x-2">
            <div className="h-14 w-14 overflow-hidden rounded-lg border-2 border-white bg-gray-100 shadow-sm">
              <Image
                src={imgUrl}
                alt={"Blog Image"}
                className="h-full w-full object-cover"
                height={48}
                width={48}
                unoptimized
              />
            </div>
          </div>
        </div>
      );
    },
  },
];
