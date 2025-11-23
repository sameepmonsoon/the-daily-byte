import { SanitizedHTML } from "@/components/common/sanitized-html";
import BlogOverViewSkeleton from "@/components/skeleton/blog-overview-loader";
import { Button } from "@/components/ui/button";
import { BlogService } from "@/services/public/blog-service";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

interface BlogsPageProps {
  slug: string;
}

async function BlogDetail({ slug }: BlogsPageProps) {
  const { data: blog } = await BlogService.getBlogBySlug(slug);
  return (
    <div className="w-full space-y-8 lg:max-w-[750px]">
      {/* DATE */}
      <span className="text-muted-foreground block text-sm">
        {format(new Date(blog.created_at), "MMMM dd, yyyy")}
      </span>

      {/* TITLE + EDIT BUTTON */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl leading-tight font-bold">{blog.title}</h1>

        <Button asChild size="sm" variant="outline" className="shrink-0">
          <Link href={`/dashboard/blogs/${blog.slug}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      {/* IMAGE */}
      {blog.coverimage && (
        <Image
          src={blog.coverimage}
          alt={blog.title}
          className="w-full rounded-md object-cover"
          width={800}
          height={450}
          priority
        />
      )}

      {/* DESCRIPTION */}
      {blog.description && (
        <p className="text-muted-foreground text-base">{blog.description}</p>
      )}

      {/* BLOG CONTENT */}
      <SanitizedHTML html={blog.blogdetails} />
    </div>
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const searchparam = await params;

  return (
    <Suspense fallback={<BlogOverViewSkeleton />}>
      <BlogDetail slug={searchparam?.slug} />
    </Suspense>
  );
}
