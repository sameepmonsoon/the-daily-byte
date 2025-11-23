import BlogCategories from "@/components/blogs/blog-categories";
import { BlogItem } from "@/components/blogs/blog-item";
import LatestPosts from "@/components/blogs/latest-blogs";
import PageBreadcrumb from "@/components/common/breadcrumbs/custom-page-bread-crumb";
import PaginationComponent from "@/components/common/pagination";
import { searchOptions } from "@/constants/navigation";
import { parseSearchParams } from "@/lib/utils";
import { BlogService } from "@/services/public/blog-service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
export const metadata: Metadata = {
  title: "Blog Categories",
  description: "",
};
export default async function BlogCategoriespage({
  params,
}: {
  params: { [key: string]: string };
}) {
  const searchparams = await params;
  const fetchOptions = parseSearchParams({
    ...params,
  });
  const {
    data: blog,
    error,
    meta,
  } = await BlogService.byCategory(
    Number(searchparams.slug),
    10,
    fetchOptions?.search,
  );

  if (error) {
    notFound();
  }
  const categoryType = searchOptions?.find(
    (opt) => opt?.value === searchparams.slug,
  );

  return (
    <>
      <PageBreadcrumb
        title={`Blogs by ${categoryType?.label ?? "Category"}`}
        pages={["blogs", "/", "categories"]}
      />
      <main className="bg-gray-100/70 dark:bg-gray-900">
        <section className="bg-gray-2 overflow-hidden py-20">
          <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
            <div className="flex flex-col gap-7.5 lg:flex-row xl:gap-12.5">
              {/* <!-- Blog list --> */}
              <div className="w-full space-y-12 lg:max-w-[750px]">
                <div className="grid grid-cols-1 gap-x-7.5 gap-y-10 sm:grid-cols-2">
                  {(blog ?? [])?.length > 0 ? (
                    blog?.map((blog) => <BlogItem key={blog.id} {...blog} />)
                  ) : (
                    <div className="col-span-full flex h-40 items-center justify-center rounded-xl bg-white text-lg font-medium text-gray-500 shadow-sm dark:bg-gray-800 dark:text-white">
                      No blogs found in this category.
                    </div>
                  )}
                </div>
                <div className="mt-8 flex flex-1 items-center justify-between">
                  <PaginationComponent
                    currentPage={
                      fetchOptions.page ? parseInt(fetchOptions.page) : 1
                    }
                    totalPages={meta?.totalPages ?? 1}
                    className="flex-1 justify-start md:justify-center"
                  />
                </div>
              </div>

              {/* <!-- Sidebar --> */}
              <div className="w-full space-y-10 lg:max-w-[370px]">
                <div className="rounded-lg bg-white p-5 shadow-sm dark:bg-gray-800 dark:text-white">
                  <LatestPosts />
                </div>
                <div className="rounded-lg bg-white p-5 shadow-sm dark:bg-gray-800 dark:text-white">
                  <BlogCategories />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
