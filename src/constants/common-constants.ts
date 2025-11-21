import { BookCopy, LayoutDashboard } from "lucide-react";

/**
 * Defines user roles for a content-driven (blog / media) platform.
 * Used for permission-based access control in frontend and backend.
 *
 * @enum {string}
 */
export enum ROLE {
  OWNER = 'OWNER',

  EDITOR = 'EDITOR',

  AUTHOR = 'AUTHOR',

  MODERATOR = 'MODERATOR',

  SEO_MANAGER = 'SEO_MANAGER',

  SUBSCRIBER = 'SUBSCRIBER',

  GUEST = 'GUEST',
}

export const adminNavigation = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },

    {
      title: 'Blogs',
      url: '/blog',
      icon: BookCopy,
      items: [
        {
          title: 'View All Blogs',
          url: '/blog',
        },
{
          title: 'Deleted Blog',
          url: '/blog/deleted',
        },
        {
          title: 'Add Blog',
          url: '/blog/add',
        },
      ],}
    ]
};

export function getSidebarNavigation(role: string) {
  switch (role?.toLocaleUpperCase()) {
    case ROLE.OWNER:
      return adminNavigation;
    default:
      return { navMain: [], navUsers: [] };
  }
}