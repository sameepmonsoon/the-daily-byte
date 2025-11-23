import { blogCategories } from "@/constants/private/blog-constants";
import { generateSlug } from "@/lib/utils";
import {
  BlogCreatePayload,
  blogSchema,
  BlogSchemaType,
} from "@/schema/private/blog.schema";
import { BlogService, uploadBlogImage } from "@/services/public/blog-service";
import { BlogPayload } from "@/types/dashboard/dashboard-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useBlogForm({
  type,
  id,
  existingData,
}: {
  type: "create" | "update";
  id?: string;
  existingData?: BlogCreatePayload;
}) {
  const router = useRouter();
  const session = useSession();
  const form = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema as any),
    defaultValues:
      type === "create"
        ? {
            form_type: "create",
            authorid: session?.data?.user?.id ?? "12",
            categoryId: blogCategories?.[0]?.id,
          }
        : {
            form_type: "update",
            title: existingData?.title,
            description: existingData?.description,
            categoryId: String(existingData?.categoryId),
            category: String(existingData?.category),
            authorid: existingData?.authorid,
            active: existingData?.active,
            blogDetails: existingData?.blogDetails,
          },
  });

  const blogAction = async (data: BlogSchemaType) => {
    const payload: BlogPayload = {
      title: data.title,
      description: data.description,
      category_id: data.category,
      category: data.category,
      authorid: data.authorid,
      active: data.active,
      blogdetails: data.blogDetails,
      slug: data.title ? generateSlug(data.title) : `blog-${Date.now()}`,
      created_by: session?.data?.user?.id ?? "User_0",
    };

    try {
      let imageUrl: string | null = null;

      // Upload image if provided
      if (data.featuredImage?.length) {
        const formData = new FormData();
        formData.append("file", data.featuredImage[0]);
        formData.append("userId", session?.data?.user?.id ?? "12");
        const uploaded = await uploadBlogImage({
          payload: formData,
          userId: session?.data?.user?.id,
        });
        imageUrl =
          uploaded?.data ??
          "https://cdnugybsittcrtgflnwq.supabase.co/storage/v1/object/public/blog-images/urban-vintage-78A265wPiO4-unsplash.jpg";
      }

      // Only include coverimage if image was uploaded
      if (imageUrl) {
        payload.coverimage = imageUrl;
      }

      let result;
      if (type === "create" && data.form_type === "create") {
        result = await BlogService.create(payload);
      } else if (type === "update" && data.form_type === "update" && id) {
        result = await BlogService.update(payload, id);
      }

      if (result?.success) {
        toast.success(result.message ?? `Blog ${type}d successfully!`);
        router.replace(`/dashboard/blogs/list`);
      } else {
        throw new Error(result?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${type} blog.`);
    }
  };

  return { blogAction, form };
}
