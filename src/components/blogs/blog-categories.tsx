import { BlogService } from "@/services/public/blog-service";
import Link from "next/link";

const BlogCategories = async () => {
  const { data: blogCategories, error } = await BlogService.Categories();
  if (error) {
    return <></>;
  }
  return (
    <div className="shadow-1 rounded-xl p-0">
      {/* Header */}
      <div className="border-gray-3 border-b px-4 py-4.5 pt-0">
        <h2 className="text-dark text-lg font-medium">Blog Categories</h2>
      </div>

      {/* Category List */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {blogCategories?.map((category) => (
            <Link
              key={category.id}
              href={`/blogs/categories/${category.id}`}
              className="hover:bg-green hover:border-primary rounded-full border border-gray-300 px-4 py-2 text-sm transition-colors dark:hover:border-white dark:hover:bg-gray-900 dark:hover:text-white"
            >
              <span className="text-dark text-sm font-normal dark:text-white">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCategories;
