'use client';
import { HomeIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function capitalizeAndRemoveDashes(str: string): string {
  if (!str) return '';
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

interface BreadcrumbItem {
  href: string;
  label: string;
  isCurrent: boolean;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    if (!pathname) return;

    // Split pathname into segments and remove empty strings
    const segments = pathname.split('/').filter(Boolean);

    // Generate array of breadcrumb items with proper links
    const breadcrumbItems = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      const isVariable = segment.startsWith('[') && segment.endsWith(']');
      const label = isVariable ? capitalizeAndRemoveDashes(segment.slice(1, -1)) : capitalizeAndRemoveDashes(segment);

      return {
        href,
        label,
        isCurrent: index === segments.length - 1,
      };
    });

    setBreadcrumbs(breadcrumbItems);
  }, [pathname]);

  // Don't render anything on the homepage
  if (!pathname || pathname === '/') return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/' aria-label='Home'>
            <HomeIcon className='h-4 w-4 dark:hover:text-white' />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.length > 0 && <BreadcrumbSeparator />}

        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbItem>
              {breadcrumb.isCurrent ? (
                <>
                  <BreadcrumbPage className='dark:text-white'>{breadcrumb.label}</BreadcrumbPage>
                </>
              ) : (
                <>
                  <Breadcrumb className='dark:text-white/70'>{breadcrumb.label}</Breadcrumb>
                </>
              )}
            </BreadcrumbItem>

            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
