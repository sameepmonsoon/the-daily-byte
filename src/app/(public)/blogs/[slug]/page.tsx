import { BlogService } from "@/services/public/blog-service";
import Image from "next/image";
import { SanitizedHTML } from "@/components/common/sanitized-html";
import { notFound } from "next/navigation";
import LatestPosts from "@/components/blogs/latest-blogs";
import { format } from "date-fns";
import PageBreadcrumb from "@/components/common/breadcrumbs/custom-page-bread-crumb";

interface BlogsPageProps {
  params: {
    slug: string;
  };
}
export async function generateMetadata({ params }: BlogsPageProps) {
  const searchParams = await params;
  const { data: blog, error } = await BlogService.getBlogBySlug(
    searchParams.slug,
  );
  if (error || !blog) {
    return {
      title: "Blog Detail",
      description: "",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.coverimage
        ? [
            {
              url: blog.coverimage,
              width: 800,
              height: 600,
              alt: blog.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.coverimage ? [blog.coverimage] : undefined,
    },
  };
}

export default async function BlogsPage({ params }: BlogsPageProps) {
  const searchparams = await params;
  const { data: blog, error } = await BlogService.getBlogBySlug(
    searchparams.slug,
  );
  if (error) {
    notFound();
  }

  return (
    <>
      <PageBreadcrumb
        title={"Blog Detail"}
        pages={["blogs", "/", "blog detail"]}
      />
      <main className="text-primary min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
        <section className="bg-gray-2 overflow-hidden py-20">
          <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
            <div className="flex flex-col gap-7.5 lg:flex-row xl:gap-12.5">
              <div className="w-full space-y-12 lg:max-w-[750px]">
                {blog?.coverimage && (
                  <Image
                    src={blog.coverimage}
                    alt={blog.title}
                    className="mb-6 rounded-md"
                    width={800}
                    height={800}
                  />
                )}
                <span className="mb-5">
                  {format(new Date(blog?.created_at), "MMMM dd, yyyy")}
                </span>
                <h1 className="mb-4 text-3xl font-bold">{blog?.title}</h1>
                <p className="mb-6 text-gray-500">{blog?.description}</p>
                {/* Render sanitized HTML safely */}
                <SanitizedHTML html={blog.blogdetails} />
              </div>
              <div className="w-full space-y-10 lg:max-w-[370px]">
                <div className="rounded-lg bg-white p-5 shadow-sm dark:bg-gray-800 dark:text-white">
                  <LatestPosts />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
