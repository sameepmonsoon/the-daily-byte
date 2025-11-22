import { BlogService } from "@/services/public/blog-service";
import Image from "next/image";
// import DOMPurify from "isomorphic-dompurify";

interface BlogsPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogsPage({ params }: BlogsPageProps) {
  const searchparam = await params;
  const blog = await BlogService.getBlogBySlug(searchparam.slug);
  console.log({ blog, searchparam });
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-3xl font-bold">{blog?.title}</h1>
      <p className="mb-6 text-gray-500">{blog?.description}</p>
      {/* <div             dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog?.blogDetails) }} /> */}
      {blog?.coverimage && (
        <Image
          src={blog.coverimage}
          alt={blog.title}
          className="mt-6 rounded-md"
          width={800}
          height={800}
        />
      )}
    </div>
  );
}
