'use client';
import { useReactTable } from '@tanstack/react-table';
import { getCoreRowModel, TableOptions } from '@tanstack/table-core';
import { Edit, EyeIcon, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { AdminBlogsColumns } from '../columns/blogs-table-columns';
import { DataTableRender } from '../data-table/renderRow';
import { ActionsDropdownMenu } from '@/components/common/actions-menu';
import { AdminBlogs } from '@/types/dashboard/dashboard-types';

function AdminBlogsTable({ blogs }: { blogs: AdminBlogs[] }) {
  const [isStatusUpdating, setIsStatusUpdating] = useState<boolean>(false);

  const actionsMenuItems = useCallback(
    (blog: AdminBlogs) => [
      {
        label: (
          <Link prefetch={false} href={`/admin/blogs/${blog.slug}`} className='flex items-center'>
            <EyeIcon className='w-3 h-3' />
            <span>View Details</span>
          </Link>
        ),
        asChild: true,
      },
      {
        label: (
          <Link prefetch={false} href={`/admin/blogs/${blog.slug}/edit`} className='flex items-center'>
            <Edit className='w-3 h-3 mr-2.5' />
            <span>Edit</span>
          </Link>
        ),
        onClick: () => {
          setIsStatusUpdating(false);
        },
      },
      {
        label: (
          <div className='flex items-center'>
            <Trash2 className='w-3 h-3 mr-2.5' />
            <span>Delete</span>
          </div>
        ),
        onClick: () => {
          setIsStatusUpdating(false);
        },
      },
    ],

    []
  );

  const blogsColumnTable = useMemo(
    () => [
      ...AdminBlogsColumns,
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const order = row.original;

          return <ActionsDropdownMenu menuItems={actionsMenuItems(order)} />;
        },
      },
    ],
    [actionsMenuItems]
  );
  const tableOptions: TableOptions<any> = {
    data: blogs || [],
    columns: blogsColumnTable,
    getCoreRowModel: getCoreRowModel(),
  };

  const table = useReactTable(tableOptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-4 mb-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search by product...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='pl-9 h-12 dark:bg-gray-900! bg-white/70'
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='w-full sm:w-[200px] !h-12 cursor-pointer dark:bg-gray-900! bg-white/70'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent className='dark:bg-gray-900! bg-white dark:text-white'>
            <SelectItem value='all' className='cursor-pointer'>
              All Category
            </SelectItem>
            <SelectItem value='pending' className='cursor-pointer'>
              Electronics
            </SelectItem>
            <SelectItem value='processing' className='cursor-pointer'>
              Wearables
            </SelectItem>
            <SelectItem value='delivered' className='cursor-pointer'>
              Accessories
            </SelectItem>
            <SelectItem value='cancelled' className='cursor-pointer'>
              Furniture
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTableRender
        table={table}
        columns={blogsColumnTable}
        actionsMenuItems={actionsMenuItems}
        isTableContentUpdating={isStatusUpdating}
      />
    </div>
  );
}

export default AdminBlogsTable;
