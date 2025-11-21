
import { BlogService } from '@/services/public/blog-service';
import Image from 'next/image';
import { SanitizedHTML } from '@/components/common/sanitized-html';

interface BlogsPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogsPage({ params }: BlogsPageProps) {
    const searchparams = await params
  const blog = await BlogService.getBlogBySlug(searchparams.slug);
  console.log({ blog, params });


  return (
    <main className="text-primary min-h-screen bg-gray-50 py-20 md:py-52 dark:bg-gray-900 dark:text-white text-center flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
      <p className="text-gray-500 mb-6">{blog?.description}</p>

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
