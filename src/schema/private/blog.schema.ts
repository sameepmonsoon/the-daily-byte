import { z } from "zod";

// Blog image schema
export const blogImageSchema = z.object({
  id: z.number(),
  path: z.string(),
  filename: z.string(),
  isFeatured: z.boolean(),
});

// Discriminated union for create and update

export const blogSchema = z.discriminatedUnion("form_type", [
  z.object({
    form_type: z.literal("create"),
    title: z.string().min(16, "Title must be at least 16 characters"),
    description: z
      .string()
      .min(16, "Description must be at least 16 characters"),
    categoryId: z.string().min(1, "Please select a category"),
    category: z.string().min(1, "Category name is required"),
    authorid: z.string().min(1, "Author is required"),
    blogImages: z.array(z.instanceof(File)).optional(),
    featuredImage: z
      .array(z.instanceof(File))
      .nonempty("Featured image is required"),
    active: z.coerce.boolean().default(true),
    blogDetails: z
      .string()
      .min(16, "Blog details must be at least 16 characters"),
  }),
  z.object({
    form_type: z.literal("update"),
    title: z.string().min(16, "Title must be at least 16 characters"),
    slug: z.string().optional(),
    description: z
      .string()
      .min(16, "Description must be at least 16 characters"),
    categoryId: z.string().min(1, "Please select a category"),
    category: z.string().min(1, "Category name is required"),
    authorid: z.string().min(1, "Author is required"),
    blogImages: z.array(z.instanceof(File)).optional(),
    featuredImage: z
      .array(z.instanceof(File))
      .nonempty("Featured image is required"),
    active: z.coerce.boolean().default(true),
    blogDetails: z
      .string()
      .min(16, "Blog details must be at least 16 characters"),
  }),
]);

// Type for selected photo IDs
type PhotoIds = {
  id: number;
  isFeatured: boolean;
};

// Infered types
export type BlogSchemaType = z.infer<typeof blogSchema>;

export type BlogCreatePayload = Omit<
  Extract<BlogSchemaType, { form_type: "create" }>,
  "blogImages" | "featuredImage"
> & { coverImage: string };

export type BlogUpdatePayload = Omit<
  Extract<BlogSchemaType, { form_type: "update" }>,
  "blogImages" | "featuredImage"
> & {
  coverImage: string;
};
