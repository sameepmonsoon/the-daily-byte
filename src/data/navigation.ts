import { Menu, SearchOption } from "@/types/menu";

export const menuData: Menu[] = [
  { id: 1, title: 'Home', path: '/', newTab: false },
  { id: 2, title: 'Popular', path: '/popular', newTab: false },
  { id: 3, title: 'Categories', path: '/categories', newTab: false, submenu: [
      { id: 31, title: 'Tech', path: '/categories/tech' },
      { id: 32, title: 'Lifestyle', path: '/categories/lifestyle' },
      { id: 33, title: 'Travel', path: '/categories/travel' },
    ]
  },
  { id: 4, title: 'About', path: '/about', newTab: false },
  { id: 5, title: 'Contact', path: '/contact', newTab: false },
];

export const searchOptions: SearchOption[] = [
  { label: 'All Categories', value: '0' },
  { label: 'Tech', value: 'tech' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Travel', value: 'travel' },
  { label: 'Business', value: 'business' },
  { label: 'Food', value: 'food' },
  { label: 'Health', value: 'health' },
  { label: 'Education', value: 'education' },
];
