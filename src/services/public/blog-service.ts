import { supabase } from "@/lib/supabaseClient";
import { BlogPayload } from "@/types/dashboard/dashboard-types";
import { v4 as uuidv4 } from "uuid";

interface UploadBlogImageProps {
  payload: FormData;
  multiple?: boolean;
  userId: string;
}

export const uploadBlogImage = async ({
  payload,
  multiple = false,
  userId,
}: UploadBlogImageProps) => {
  const file = payload.get("file") as File;
  const folder = payload.get("folder") as string;

  if (!file) throw new Error("No file provided");

  const filePath = userId + "/" + uuidv4();
  // Upload to Supabase
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file);
  // .upload(filePath, file, { cacheControl: '3600', upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("blog-images")
    .getPublicUrl(filePath);

  if (!urlData) throw new Error("err");

  return urlData.publicUrl;
};

export const BlogService = {
  list: async (page = 1, limit = 10) => {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const from = (safePage - 1) * safeLimit;
    const to = from + safeLimit - 1;

    const { data, error, count } = await supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .eq("active", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error);

      return {
        data: [],
        meta: {
          total: 0,
          page: safePage,
          limit: safeLimit,
          hasNextPage: false,
          hasPrevPage: false,
          count,
        },
      };
    }

    const totalBlogs = count ?? 0;
    const totalPages = Math.ceil(totalBlogs / safeLimit) || 1;

    return {
      data: data || [],
      meta: {
        total: totalPages,
        page: safePage,
        limit: safeLimit,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
        count,
      },
    };
  },
  getBlogBySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from("blogs")
      .select(
        `
      *
    `,
      )
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  },
  create: async (payload: BlogPayload) => {
    const { data, error } = await supabase
      .from("blogs")
      .insert(payload)
      .select()
      .single();

    if (error)
      return { data: null, success: false, message: "Failed to addb Blog!" };
    return { data, success: true, message: "Blog created successfully!" };
  },

  update: async (id: string, payload: any) => {
    const { data, error } = await supabase
      .from("blogs")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  delete: async (id?: string) => {
    const { data, status, statusText, error } = await supabase
      .from("blogs")
      .update({ active: false })
      .eq("id", id);
    if (error) return { success: false, message: "Failed to delete blog." };
    return { data: null, success: true, message: "Blog deleted successfully" };
  },
  restore: async (id?: string) => {
    const { data, status, statusText, error } = await supabase
      .from("blogs")
      .update({ active: true })
      .eq("id", id);
    if (error) return { success: false, message: "Failed to delete blog." };
    return { data: null, success: true, message: "Blog deleted successfully" };
  },
  listDeleted: async (page = 1, limit = 10) => {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const from = (safePage - 1) * safeLimit;
    const to = from + safeLimit - 1;

    const { data, error, count } = await supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .eq("active", false)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error);

      return {
        data: [],
        meta: {
          total: 0,
          page: safePage,
          limit: safeLimit,
          hasNextPage: false,
          hasPrevPage: false,
          count,
        },
      };
    }

    const totalBlogs = count ?? 0;
    const totalPages = Math.ceil(totalBlogs / safeLimit) || 1;

    return {
      data: data || [],
      meta: {
        total: totalPages,
        page: safePage,
        limit: safeLimit,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
        count,
      },
    };
  },
};
