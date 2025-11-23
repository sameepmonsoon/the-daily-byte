import { BlogService } from "@/services/public/blog-service";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const LatestPosts = async () => {
  const { data: blogs, error } = await BlogService.latest(3);
  if (error) {
    return <></>;
  }
  return (
    <div className="shadow-1 rounded-xl p-0">
      <div className="border-gray-3 border-b px-4 py-4.5 pt-0">
        <h2 className="text-dark text-lg font-medium">Recent Posts</h2>
      </div>

      <div className="p-4 px-4! sm:p-6">
        <div className="flex flex-col gap-6">
          {blogs?.map((blog) => (
            <div className="flex items-start gap-4" key={blog.id}>
              <Link
                href={`/blogs/${blog.slug}`}
                className="h-full max-w-[110px] overflow-hidden rounded-[10px]"
              >
                <Image
                  src={blog.coverimage}
                  alt={blog.title}
                  className="rounded-[10px]"
                  width={110}
                  height={80}
                  priority={true}
                />
              </Link>

              <div className="flex-1">
                <h3 className="text-dark mb-1.5 line-clamp-2 text-sm leading-[22px] font-medium duration-200 ease-out hover:underline">
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h3>

                <span className="text-custom-xs flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {format(new Date(blog?.created_at), "MMMM dd, yyyy")}
                  </span>

                  {/* divider */}
                  <span className="bg-gray-4 block h-4 w-px"></span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestPosts;
