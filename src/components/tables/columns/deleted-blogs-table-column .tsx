"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Shield, ShieldOff } from "lucide-react";
import Image from "next/image";

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
export const AdminDeletedBlogsColumns: ColumnDef<AdminBlogs>[] = [
  {
    id: "id",
    header: "Blog ID",
    accessorKey: "id",
    cell: ({ row }) => {
      const id = row.original.id;
      return <Badge variant="outline">{id}</Badge>;
    },
  },

  {
    id: "title",
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      const name = row.original.title;
      return <span className={`font-semibold`}>{name}</span>;
    },
  },
  {
    id: "createdAt",
    header: "Created At",
    accessorKey: "createdAt",
  },

  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => {
      const price = row.original.description;
      return <span className={`font-semibold`}>{price}</span>;
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
      const imgUrl = row.original.image;
      return (
        <div className="flex w-auto items-center">
          <div className="flex -space-x-2">
            <div className="h-14 w-14 overflow-hidden rounded-lg border-2 border-white bg-gray-100 shadow-sm">
              <Image
                src={imgUrl}
                alt={"Product Image"}
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
