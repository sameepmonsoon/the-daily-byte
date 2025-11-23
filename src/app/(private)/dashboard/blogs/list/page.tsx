import PaginationComponent from "@/components/common/pagination";
import AdminBlogsTable from "@/components/tables/dashboard/blogs-table";
import { parseSearchParams } from "@/lib/utils";
import { BlogService } from "@/services/public/blog-service";
import { AdminBlogs } from "@/types/dashboard/dashboard-types";
interface SearchParamType {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function BlogsListPage({ searchParams }: SearchParamType) {
  const params = await searchParams;
  const fetchOptions = parseSearchParams({
    ...params,
  });
  const res = await BlogService.list(Number(fetchOptions?.page ?? 1));
  if (res.error || !res.data) {
    return <>Something went wrong!</>;
  }
  return (
    <div>
      <AdminBlogsTable key={fetchOptions.page} blogs={res?.data} />
      <div className="mt-8 flex flex-1 items-center justify-between">
        <PaginationComponent
          currentPage={fetchOptions.page ? parseInt(fetchOptions.page) : 1}
          totalPages={res?.meta?.totalPages ?? 0}
          className="flex-1 justify-start md:justify-center"
        />
      </div>
    </div>
  );
}
