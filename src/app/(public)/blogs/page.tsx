import { BlogService } from "@/services/public/blog-service";
import React from "react";

export default async function PubliBlogsPage() {
  const allBlogs = await BlogService.list();
  console.log({ allBlogs });
  return (
    <main className="text-primary min-h-screen bg-gray-50 py-20 md:py-52 dark:bg-gray-900 dark:text-white">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fuga quam,
      magnam ea minus, aspernatur tempore dolorum, ipsam rerum explicabo qui?
      Repellat amet culpa a aliquid, consequatur tempora rerum optio!
    </main>
  );
}
