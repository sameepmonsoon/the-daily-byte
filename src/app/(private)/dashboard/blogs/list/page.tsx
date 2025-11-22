import PaginationComponent from "@/components/common/pagination";
import AdminBlogsTable from "@/components/tables/dashboard/blogs-table";
import { parseSearchParams } from "@/lib/utils";
import { BlogService } from "@/services/public/blog-service";
interface SearchParamType {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function BlogsListPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const fetchOptions = parseSearchParams({
    ...params,
  });
  const res = await BlogService.list(Number(fetchOptions?.page ?? 1));

  console.log({ res });
  return (
    <div>
      <AdminBlogsTable key={fetchOptions.page} blogs={res?.data} />
      <div className="mt-8 flex flex-1 items-center justify-between">
        <PaginationComponent
          currentPage={fetchOptions.page ? parseInt(fetchOptions.page) : 1}
          totalPages={res?.meta?.total}
          className="flex-1 justify-start md:justify-center"
        />
      </div>
    </div>
  );
}
