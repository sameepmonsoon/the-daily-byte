import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverimage: string;
  created_at: string;
}

export const BlogItem = ({
  id,
  title,
  description,
  slug,
  coverimage,
  created_at,
}: BlogCardProps) => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 dark:text-white">
      <div className="mb-7.5 overflow-hidden rounded-[10px]">
        <Image
          className="w-full rounded-[10px] object-cover"
          src={coverimage}
          alt={title}
          width={750}
          height={480}
        />
      </div>

      <span className="mb-4 flex items-center gap-3 text-sm text-gray-600">
        {format(new Date(created_at), "MMMM dd, yyyy")}
      </span>

      <Link
        href={`/blogs/${slug}`}
        className="text-dark xl:text-custom-4xl cursor-pointer text-xl font-medium hover:text-blue-800 lg:text-xl"
      >
        {title}
      </Link>

      <div className="mt-4">
        <Link
          href={`/blogs/${slug}`}
          className="text-green inline-flex hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};
