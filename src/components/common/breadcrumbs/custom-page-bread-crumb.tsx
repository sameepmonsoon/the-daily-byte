import Link from "next/link";

const PageBreadcrumb = ({
  title,
  pages,
}: {
  title: string;
  pages: string[];
}) => {
  return (
    <div className="shadow-breadcrumb overflow-hidden pt-[209px] sm:pt-[155px] lg:pt-[95px] xl:pt-[165px] dark:bg-gray-900 dark:text-white">
      <div className="border-gray-3 border-t">
        <div className="mx-auto w-full max-w-[1170px] px-4 py-5 sm:px-8 xl:px-0 xl:py-10">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h1 className="text-dark xl:text-custom-2 text-xl font-semibold sm:text-2xl">
              {title}
            </h1>

            <ul className="flex items-center gap-2">
              <li className="text-custom-sm hover:text-green">
                <Link href="/">Home /</Link>
              </li>

              {pages.length > 0 &&
                pages.map((page, key) => (
                  <li
                    className="text-custom-sm last:text-green capitalize"
                    key={key}
                  >
                    {page}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBreadcrumb;
