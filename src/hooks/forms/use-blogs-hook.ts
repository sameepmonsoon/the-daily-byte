import { blogCategories } from "@/constants/private/blog-constants";
import { generateSlug } from "@/lib/utils";
import {
  BlogCreatePayload,
  blogSchema,
  BlogSchemaType,
} from "@/schema/private/blog.schema";
import { BlogService } from "@/services/public/blog-service";
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
            // featuredImage: [existingData?.coverImage],
            active: existingData?.active,
            blogDetails: existingData?.blogDetails,
          },
  });

  const blogAction = async (data: BlogSchemaType) => {
    if (type === "create" && data.form_type === "create") {
      const payload: BlogPayload = {
        title: data?.title,
        description: data?.description,
        category_id: data?.category,
        category: data?.category,
        authorid: data?.authorid,
        active: data.active,
        blogdetails: data?.blogDetails,
        slug: data?.title ? generateSlug(data.title) : `blog-${Date.now()}`,
        created_by: session?.data?.user?.id ?? "User_0",
        coverimage:
          "https://cdnugybsittcrtgflnwq.supabase.co/storage/v1/object/public/blog-images/urban-vintage-78A265wPiO4-unsplash.jpg",
      };
      try {
        // const imageUrl = await uploadBlogImage({ payload: formData, userId:session?.data?.user?.id });
        // console.log('Uploaded image URL:', imageUrl);

        // Pass to your create blog service
        const newBlog = await BlogService.create({
          ...payload,
        });
        if (newBlog?.success) {
          toast.success(newBlog?.message ?? "Blog added successfully!");
          router.replace(`/dashboard/blogs/list`);
        }
        if (!newBlog?.success) throw Error(newBlog.message);
      } catch (err) {
        console.error(err);
        toast.error("Failed to add blog.");
      }

      // try {
      //   if (data.featuredImage) {
      //     const formData = new FormData();
      //     formData.append("file", data.featuredImage[0]);
      //     formData.append("folder", FILE_UPLOAD_FOLDERS.BLOG);
      //     formData.append("userId", session?.data?.user?.id ?? "12");
      //     console.log({ userId: session.data?.user.id });
      //     try {
      //       const imageUrl = await uploadBlogImage({
      //         payload: formData,
      //         userId: session?.data?.user?.id ?? "",
      //       });
      //       console.log("Uploaded image URL:", imageUrl);

      //       // Pass to your create blog service
      //       const newBlog = await BlogService.create({
      //         ...payload,
      //         coverImage:
      //           "https://cdnugybsittcrtgflnwq.supabase.co/storage/v1/object/public/blog-images/urban-vintage-78A265wPiO4-unsplash.jpg",
      //         created_by: session?.data?.user?.id ?? "User_0",
      //       });

      //       console.log("Blog created:", newBlog);
      //     } catch (err) {
      //       console.error(err);
      //     }
      //   }

      //   // const response = await createEvent(payload);

      //   // if (response.success) {
      //   //   showSuccessToast(response.message);
      //   //   setNewlyCreatedEvent({
      //   //     id: response.data.data.id,
      //   //     name: response.data.data.name,
      //   //   });
      //   //   setSavedStepsRecord(savedRecord => ({
      //   //     ...savedRecord,
      //   //     createEvent: true,
      //   //   }));
      //   // } else {
      //   //   throw response;
      //   // }
      // } catch (error) {
      //   const err = error;

      //   toast.error("err");
      // }
    }

    if (type === "update" && data.form_type === "update") {
      const payload: BlogPayload = {
        title: data?.title,
        description: data?.description,
        category_id: data?.category,
        category: data?.category,
        authorid: data?.authorid,
        active: data.active,
        blogdetails: data?.blogDetails,
        slug: data?.title ? generateSlug(data.title) : `blog-${Date.now()}`,
        created_by: session?.data?.user?.id ?? "User_0",
        coverimage:
          "https://cdnugybsittcrtgflnwq.supabase.co/storage/v1/object/public/blog-images/urban-vintage-78A265wPiO4-unsplash.jpg",
      };
      try {
        // const imageUrl = await uploadBlogImage({ payload: formData, userId:session?.data?.user?.id });
        // console.log('Uploaded image URL:', imageUrl);

        // Pass to your create blog service
        const newBlog = await BlogService.update(
          {
            ...payload,
          },
          id,
        );
        if (newBlog?.success) {
          toast.success(newBlog?.message ?? "Blog updated successfully!");
          router.replace(`/dashboard/blogs/list`);
        }
        if (!newBlog?.success) throw Error(newBlog.message);
      } catch (err) {
        console.error(err);
        toast.error("Failed to update blog.");
      }

      // try {
      //   if (data.featuredImage) {
      //     const formData = new FormData();
      //     formData.append("file", data.featuredImage[0]);
      //     formData.append("folder", FILE_UPLOAD_FOLDERS.BLOG);
      //     formData.append("userId", session?.data?.user?.id ?? "12");
      //     console.log({ userId: session.data?.user.id });
      //     try {
      //       const imageUrl = await uploadBlogImage({
      //         payload: formData,
      //         userId: session?.data?.user?.id ?? "",
      //       });
      //       console.log("Uploaded image URL:", imageUrl);

      //       // Pass to your create blog service
      //       const newBlog = await BlogService.create({
      //         ...payload,
      //         coverImage:
      //           "https://cdnugybsittcrtgflnwq.supabase.co/storage/v1/object/public/blog-images/urban-vintage-78A265wPiO4-unsplash.jpg",
      //         created_by: session?.data?.user?.id ?? "User_0",
      //       });

      //       console.log("Blog created:", newBlog);
      //     } catch (err) {
      //       console.error(err);
      //     }
      //   }

      //   // const response = await createEvent(payload);

      //   // if (response.success) {
      //   //   showSuccessToast(response.message);
      //   //   setNewlyCreatedEvent({
      //   //     id: response.data.data.id,
      //   //     name: response.data.data.name,
      //   //   });
      //   //   setSavedStepsRecord(savedRecord => ({
      //   //     ...savedRecord,
      //   //     createEvent: true,
      //   //   }));
      //   // } else {
      //   //   throw response;
      //   // }
      // } catch (error) {
      //   const err = error;

      //   toast.error("err");
      // }
    }
  };

  return { blogAction, form };
}
