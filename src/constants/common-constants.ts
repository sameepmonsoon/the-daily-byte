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
      url: '/dashboard/blog',
      icon: BookCopy,
      items: [
        {
          title: 'View All Blogs',
          url: '/dashboard/blogs/list',
        },
{
          title: 'Deleted Blog',
          url: '/dashboard/blogs/deleted',
        },
        {
          title: 'Add Blog',
          url: '/dashboard/blogs/add',
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


/**
 * Enum for file upload folders.
 */
export enum FILE_UPLOAD_FOLDERS {
   /**
   * Folder for product variant uploads.
   */
  BLOG = 'blogs',
}
