import { BlogService } from "@/services/public/blog-service";
import Image from "next/image";
import { SanitizedHTML } from "@/components/common/sanitized-html";

interface BlogsPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogsPage({ params }: BlogsPageProps) {
  const searchparams = await params;
  const blog = await BlogService.getBlogBySlug(searchparams.slug);
  console.log({ blog, params });

  return (
    <main className="text-primary flex min-h-screen flex-col items-center justify-center bg-gray-50 py-20 text-center md:py-52 dark:bg-gray-900 dark:text-white">
      <h1 className="mb-4 text-3xl font-bold">{blog?.title}</h1>
      <p className="mb-6 text-gray-500">{blog?.description}</p>

      {/* Render sanitized HTML safely */}
      <SanitizedHTML html={blog.blogdetails} />

      {blog?.coverimage && (
        <Image
          src={blog.coverimage}
          alt={blog.title}
          className="mt-6 rounded-md"
          width={800}
          height={800}
        />
      )}
    </main>
  );
}
