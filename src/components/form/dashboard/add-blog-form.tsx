"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, ImageIcon, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

import RHFFileInput from "@/components/rhf/rhf-file-input";
import RHFInput from "@/components/rhf/rhf-input";
import RHFSelect from "@/components/rhf/rhf-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FILE_UPLOAD_FOLDERS } from "@/constants/common-constants";
import {
  BlogCreatePayload,
  blogSchema,
  BlogSchemaType,
} from "@/schema/private/blog.schema";
import { BlogService, uploadBlogImage } from "@/services/public/blog-service";
import { toast } from "sonner";
import {
  BLOG_FORM_FIELDS,
  blogCategories,
} from "@/constants/private/blog-constants";
import { useSession } from "next-auth/react";
import { generateSlug } from "@/lib/utils";
import { BlogPayload } from "@/types/dashboard/dashboard-types";
import { useRouter } from "next/navigation";

const RHFRichtextEditor = dynamic(
  () => import("@/components/rhf/rhf-rich-text"),
);

interface BlogEntryFormProps {
  type: "create" | "update";
  id?: number;
  existingData?: BlogCreatePayload;
}

export default function BlogEntryForm({ type }: BlogEntryFormProps) {
  const router = useRouter();
  const session = useSession();
  const form = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema as any),
    defaultValues: {
      form_type: "create",
      title: "",
      description: "",
      categoryId: "12",
      category: "",
      authorid: session?.data?.user?.id ?? "12",
      blogImages: [],
      featuredImage: [],
      active: true,
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

          form.reset();
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
  };
  return (
    <Form {...form}>
      <form
        className="mx-auto flex w-full max-w-4xl flex-wrap justify-center space-y-4 gap-x-5 bg-white"
        onSubmit={form.handleSubmit((data) => {
          console.log("FORM SUBMITTED", data);
          blogAction(data);
        })}
      >
        {/* Basic Information */}
        <Card className="border-border bg-card w-4xl p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <FileText className="text-primary h-5 w-5" />
            </div>
            <div>
              <h2 className="text-card-foreground text-xl font-semibold">
                Basic Information
              </h2>
              <p className="text-muted-foreground text-sm">
                Start with the essentials
              </p>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div className="flex flex-wrap space-y-4 gap-x-5 bg-white">
              <RHFInput
                label={BLOG_FORM_FIELDS.title.label}
                placeholder={BLOG_FORM_FIELDS.title.placeholder}
                required={BLOG_FORM_FIELDS.title.required}
                name={BLOG_FORM_FIELDS.title.id}
                disabled={form.formState.isSubmitting}
                inputFieldClassName="h-12 border-input bg-border/20 text-base placeholder:text-muted-foreground"
              />

              <RHFInput
                label={BLOG_FORM_FIELDS.description.label}
                placeholder={BLOG_FORM_FIELDS.description.placeholder}
                required={BLOG_FORM_FIELDS.description.required}
                name={BLOG_FORM_FIELDS.description.id}
                type="textarea"
                disabled={form.formState.isSubmitting}
                inputFieldClassName="min-h-[100px] resize-none border-input bg-border/20 text-base placeholder:text-muted-foreground"
              />

              <RHFSelect
                formLabel={BLOG_FORM_FIELDS.category.label}
                placeholder={BLOG_FORM_FIELDS.category.placeholder}
                required={BLOG_FORM_FIELDS.category.required}
                name={BLOG_FORM_FIELDS.category.id}
                inputFieldClassName="!h-12 border-input bg-border/20 text-base placeholder:text-muted-foreground text-sm font-normal"
                selectItems={blogCategories}
                disabled={form.formState.isSubmitting}
              />
            </div>
          </div>
        </Card>

        {/* Blog Content */}
        <Card className="border-border bg-card w-4xl p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Sparkles className="text-primary h-5 w-5" />
            </div>
            <div>
              <h2 className="text-card-foreground text-xl font-semibold">
                Blog Content
              </h2>
              <p className="text-muted-foreground text-sm">Tell your story</p>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div className="flex flex-wrap space-y-4 gap-x-5 bg-white">
              <RHFRichtextEditor
                formLabel={BLOG_FORM_FIELDS.blogDetails.label}
                name={BLOG_FORM_FIELDS.blogDetails.id}
                required={BLOG_FORM_FIELDS.blogDetails.required}
                placeholder={BLOG_FORM_FIELDS.blogDetails.placeholder}
                disabled={form.formState.isSubmitting}
              />
            </div>
          </div>
        </Card>

        {/* Featured Image */}
        <Card className="border-border bg-card w-4xl p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <ImageIcon className="text-primary h-5 w-5" />
            </div>
            <div>
              <h2 className="text-card-foreground text-xl font-semibold">
                Cover Image
              </h2>
              <p className="text-muted-foreground text-sm">
                Add a cover image to your post
              </p>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div className="flex flex-wrap space-y-4 gap-x-5 bg-white">
              <RHFFileInput
                name={BLOG_FORM_FIELDS.featuredImage.id}
                numberOfFiles={
                  BLOG_FORM_FIELDS.featuredImage.numberOfFiles ?? 1
                }
                formLabel={BLOG_FORM_FIELDS.featuredImage.label}
                required={BLOG_FORM_FIELDS.featuredImage.required}
              />
            </div>
          </div>
        </Card>

        <div className="my-4 flex w-full items-center justify-end">
          <Button
            className="h-12 w-52"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            Publish Blog
          </Button>
        </div>
      </form>
    </Form>
  );
}
