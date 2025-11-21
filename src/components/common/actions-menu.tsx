'use client';

import { MoreHorizontal } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ActionsMenuItem {
  label: React.ReactNode;
  asChild?: boolean;
  onClick?: () => void;
}

// Menu item | Separator | Label
export type ActionsMenuListItem = ActionsMenuItem | null | string;

export type ActionsMenuItems = ActionsMenuListItem[];

export interface ActionMenuProps extends React.PropsWithChildren {
  menuItems: ActionsMenuItems;
}

// Dropdown

function ActionsDropdownMenuItem({ item }: { item: ActionsMenuListItem }) {
  if (!item) {
    return <DropdownMenuSeparator />;
  }
  if (typeof item === 'string') {
    return <DropdownMenuLabel>{item}</DropdownMenuLabel>;
  }
  return (
    <DropdownMenuItem onClick={item.onClick} asChild={item.asChild} className='cursor-pointer'>
      {item.label}
    </DropdownMenuItem>
  );
}

function DefaultDropdownTrigger() {
  return (
    <Button variant='ghost' className='h-8 w-8 p-0'>
      <span className='sr-only'>Open menu</span>
      <MoreHorizontal className='h-4 w-4' />
    </Button>
  );
}

export function ActionsDropdownMenu({ menuItems, children }: ActionMenuProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children ? children : DefaultDropdownTrigger()}</DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {menuItems.map((item, ix) => (
            <ActionsDropdownMenuItem key={ix} item={item} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// Context menu

function ActionsContextMenuItem({ item }: { item: ActionsMenuListItem }) {
  if (!item) {
    return <ContextMenuSeparator />;
  }
  if (typeof item === 'string') {
    return <ContextMenuLabel>{item}</ContextMenuLabel>;
  }
  return (
    <ContextMenuItem onClick={item.onClick} asChild={item.asChild} className='cursor-pointer'>
      {item.label}
    </ContextMenuItem>
  );
}

export function ActionsContextMenu({ menuItems, children }: ActionMenuProps) {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          {menuItems.map((item, ix) => (
            <ActionsContextMenuItem key={ix} item={item} />
          ))}
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
