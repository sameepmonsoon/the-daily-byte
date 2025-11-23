import { Menu, SearchOption } from "@/types/menu";
import { blogCategories } from "./private/blog-constants";

export const menuData: Menu[] = [
  {
    id: 3,
    title: "Blogs",
    path: "/blogs",
    newTab: false,
  },
  { id: 4, title: "About", path: "/about", newTab: false },
  { id: 5, title: "Contact", path: "/contact", newTab: false },
];

export const searchOptions: SearchOption[] = [
  { label: "All Categories", value: "0" },
  ...blogCategories.map((cat) => ({
    label: cat.label,
    value: cat.id,
  })),
];
