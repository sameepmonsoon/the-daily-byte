import BlogEntryForm from "@/components/form/dashboard/add-blog-form";
import { BlogService } from "@/services/public/blog-service";
interface BlogsPageProps {
  params: {
    slug: string;
  };
}

async function EditBlogPage({ params }: BlogsPageProps) {
  const searchparam = await params;

  const { data, error } = await BlogService.getBlogBySlug(searchparam?.slug);
  if (error) {
    return <div>Something went wrong</div>;
  }
  const existingData = {
    ...data,
    blogDetails: data?.blogdetails,
    categoryId: data?.category_id,
    category: data?.category_id,
    featuredImage: data?.coverimage,
  };
  return (
    <BlogEntryForm type="update" existingData={existingData} id={data?.id} />
  );
}

export default EditBlogPage;
