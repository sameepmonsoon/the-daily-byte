'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getSidebarNavigation, ROLE } from '@/constants/common-constants';

import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { NavMain } from './nav-item';
import { NavUser } from './nav-user';
import { ThemeToggle } from '../common/buttons/theme-toggle-btn';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  serverSession: Session | null;
}
export function AppSidebar({ serverSession, ...props }: AppSidebarProps) {
  const navItems = getSidebarNavigation(ROLE.OWNER);
  return (
    <Sidebar collapsible='offcanvas' {...props} className='dark:bg-gray-900 dark:border-r-gray-800'>
      <SidebarHeader className='dark:bg-gray-900 '>
        <SidebarMenu >
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='data-[slot=sidebar-menu-button]:p-1.5! rounded-sm!  dark:hover:bg-gray-800'>
              <Link href={'/'} className='shrink-0 h-10 gap-2'>
                <Image
                  src={`/favicon.ico`}
                  alt='Logo'
                  width={12}
                  height={12}
                  className='size-6!'
                />
                <span className='text-md font-medium pr-2'>The Daily Byte</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='p-0 overflow-hidden dark:bg-gray-900 '>
        <ScrollArea className='h-[calc(100vh-8rem)]'>
          <div>
            <NavMain items={navItems.navMain} label='Admin Panel' />
          </div>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className='dark:bg-gray-900'>
        <NavUser
          user={{
            name: serverSession?.user?.firstName ?? 'N/A',
            email: serverSession?.user?.email ?? 'N/A',
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
