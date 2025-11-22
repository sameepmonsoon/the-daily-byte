import { BlogSchemaType } from "@/schema/private/blog.schema";
import { BlogCategory } from "@/types/dashboard/dashboard-types";
import { FileText, ImageIcon, LucideIcon, User } from "lucide-react";

type BlogFieldType = {
  id: keyof BlogSchemaType;
  label: string;
  placeholder: string;
  type?: string;
  icon?: LucideIcon;
  component: "input" | "richtext" | "avatar";
  maxLength?: number;
  required: boolean;
  numberOfFiles?: number;
};

export const BLOG_FORM_FIELDS: Record<string, BlogFieldType> = {
  title: {
    id: "title",
    label: "Blog Title",
    placeholder: "Enter blog title",
    type: "text",
    icon: FileText,
    component: "input",
    maxLength: 72,
    required: true,
  },
  description: {
    id: "description",
    label: "Description",
    placeholder: "Enter blog description",
    type: "text",
    icon: FileText,
    component: "input",
    maxLength: 200,
    required: true,
  },
  category: {
    id: "category",
    label: "Category",
    placeholder: "Select blog category",
    type: "select",
    icon: User,
    component: "input",
    required: true,
  },
  blogDetails: {
    id: "blogDetails",
    label: "Blog Details",
    placeholder: "Enter blog details",
    type: "richtext",
    component: "richtext",
    required: true,
    maxLength: 5000,
  },
  featuredImage: {
    id: "featuredImage",
    label: "Featured Image",
    placeholder: "Upload Blog Image",
    type: "file",
    icon: ImageIcon,
    component: "avatar",
    required: false,
    numberOfFiles: 1,
  },
} as const;

export const blogCategories: BlogCategory[] = [
  { id: "1", key: "tech", value: "Technology", name: "Technology" },
  { id: "2", key: "lifestyle", value: "Lifestyle", name: "Lifestyle" },
  { id: "3", key: "business", value: "Business", name: "Business" },
  {
    id: "4",
    key: "health",
    value: "Health & Wellness",
    name: "Health & Wellness",
  },
  { id: "5", key: "travel", value: "Travel", name: "Travel" },
  { id: "6", key: "food", value: "Food & Recipes", name: "Food & Recipes" },
  { id: "7", key: "education", value: "Education", name: "Education" },
];
