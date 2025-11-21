'use client';
import { useReactTable } from '@tanstack/react-table';
import { getCoreRowModel, TableOptions } from '@tanstack/table-core';
import { RefreshCwIcon, Search } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTableRender } from '../data-table/renderRow';
import { AdminBlogs } from '@/types/dashboard/dashboard-types';
import { ActionsDropdownMenu } from '@/components/common/actions-menu';
import { AdminDeletedBlogsColumns } from '../columns/deleted-blogs-table-column ';

function AdminDeletedBlogsTable({ blogs }: { blogs: AdminBlogs[] }) {
  const [isStatusUpdating, setIsStatusUpdating] = useState<boolean>(false);

  const actionsMenuItems = useCallback(
    (blog: AdminBlogs) => [
      {
        label: (
          <div className='flex items-center'>
            <RefreshCwIcon className='w-3 h-3 mr-2.5' />
            <span>Restore</span>
          </div>
        ),
        onClick: () => {
          setIsStatusUpdating(false);
        },
      },
    ],

    []
  );

  const deletedBlogsColumnTable = useMemo(
    () => [
      ...AdminDeletedBlogsColumns,
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
    columns: deletedBlogsColumnTable,
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
            className='pl-9 h-12'
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='w-full sm:w-[200px] !h-12 cursor-pointer'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
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
        columns={deletedBlogsColumnTable}
        actionsMenuItems={actionsMenuItems}
        isTableContentUpdating={isStatusUpdating}
      />
    </div>
  );
}

export default AdminDeletedBlogsTable;
