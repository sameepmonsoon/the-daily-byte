"use client";
import { FileText, ImageIcon, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

import RHFFileInput from "@/components/rhf/rhf-file-input";
import RHFInput from "@/components/rhf/rhf-input";
import RHFSelect from "@/components/rhf/rhf-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { BlogCreatePayload } from "@/schema/private/blog.schema";
import {
  BLOG_FORM_FIELDS,
  blogCategories,
} from "@/constants/private/blog-constants";
import { useBlogForm } from "@/hooks/forms/use-blogs-hook";
import SubmitFormButton from "@/components/common/buttons/submit-button";

const RHFRichtextEditor = dynamic(
  () => import("@/components/rhf/rhf-rich-text"),
);

interface BlogEntryFormProps {
  type: "create" | "update";
  id?: string;
  existingData?: BlogCreatePayload;
}

export default function BlogEntryForm({
  type,
  existingData,
  id,
}: BlogEntryFormProps) {
  const { form, blogAction } = useBlogForm({
    type,
    id,
    existingData,
  });

  return (
    <Form {...form}>
      <form
        className="mx-auto flex w-full max-w-4xl flex-wrap justify-center space-y-4 gap-x-5"
        onSubmit={form.handleSubmit(blogAction)}
      >
        {/* Basic Information */}
        <Card className="border-border bg-card w-4xl p-6 sm:p-8 dark:bg-gray-900 dark:text-white">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg dark:bg-white/5">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Basic Information</h2>
              <p className="text-muted-foreground text-sm">
                Start with the essentials
              </p>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div className="flex flex-wrap space-y-4 gap-x-5">
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
                inputFieldClassName="!h-12 border-input bg-border/20 dark:bg-gray-800 text-base placeholder:text-muted-foreground text-sm font-normal"
                selectItems={blogCategories}
                disabled={form.formState.isSubmitting}
              />
            </div>
          </div>
        </Card>

        {/* Blog Content */}
        <Card className="border-border bg-card w-4xl p-6 sm:p-8 dark:bg-gray-900 dark:text-white">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg dark:bg-white/5">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Blog Content</h2>
              <p className="text-muted-foreground text-sm">Tell your story</p>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div className="flex flex-wrap space-y-4 gap-x-5">
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
        <Card className="border-border bg-card w-4xl p-6 sm:p-8 dark:bg-gray-900 dark:text-white">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg dark:bg-white/5">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Cover Image</h2>
              <p className="text-muted-foreground text-sm">
                Add a cover image to your post
              </p>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div className="flex flex-wrap space-y-4 gap-x-5">
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
          <SubmitFormButton
            btnText={`${type === "create" ? "Create" : "Update"} Blog`}
            isSubmitting={form.formState.isSubmitting}
            submittingText={`${type === "create" ? "Creating" : "Updating"} Blog`}
          />
        </div>
      </form>
    </Form>
  );
}
