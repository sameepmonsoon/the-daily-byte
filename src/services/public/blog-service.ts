import { supabase } from "@/lib/supabaseClient";
import {
  AdminBlogs,
  BlogCategory,
  BlogPayload,
} from "@/types/dashboard/dashboard-types";
import { PaginatedResponse, ApiResponse } from "@/types/common";
import { v4 as uuidv4 } from "uuid";
import Categories from "@/components/home/categories";

interface UploadBlogImageProps {
  payload: FormData;
  multiple?: boolean;
  userId: string;
}

export const uploadBlogImage = async ({
  payload,
  userId,
}: UploadBlogImageProps): Promise<ApiResponse<string>> => {
  try {
    const file = payload.get("file") as File;
    if (!file) {
      return {
        data: null,
        success: false,
        message: "No file found",
        error: "FILE_MISSING",
      };
    }

    const filePath = `${userId}/${uuidv4()}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (uploadError) {
      return {
        data: null,
        success: false,
        message: uploadError.message,
        error: uploadError.message,
      };
    }

    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    return {
      data: urlData.publicUrl,
      success: true,
      message: "Image uploaded successfully",
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      success: false,
      message: "Upload failed",
      error: err?.message || "",
    };
  }
};

export const BlogService = {
  list: async (
    page = 1,
    limit = 10,
    search = "",
  ): Promise<PaginatedResponse<AdminBlogs>> => {
    try {
      const safePage = Math.max(1, page);
      const safeLimit = Math.max(1, limit);

      const from = (safePage - 1) * safeLimit;
      const to = from + safeLimit - 1;

      let query = supabase
        .from("blogs")
        .select("*", { count: "exact" })
        .eq("active", true);

      // SEARCH
      if (search) {
        query = query.or(
          `title.ilike.%${search}%,description.ilike.%${search}%`,
        );
      }

      const { data, count, error } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        return {
          data: null,
          success: false,
          message: "Failed to fetch blogs",
          error: error.message,
        };
      }

      const totalItems = count ?? 0;
      const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

      return {
        data,
        success: true,
        message: "Blogs fetched successfully",
        error: null,
        meta: {
          totalPages,
          page: safePage,
          limit: safeLimit,
          hasNextPage: safePage < totalPages,
          hasPrevPage: safePage > 1,
          totalCount: totalItems,
        },
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Unexpected error occurred",
        error: err?.message || "UNKNOWN",
      };
    }
  },

  getBlogBySlug: async (slug: string): Promise<ApiResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        return {
          data: null,
          success: false,
          message: "Blog not found",
          error: error.message,
        };
      }

      return {
        data,
        success: true,
        message: "Blog loaded",
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Failed to fetch blog",
        error: err?.message || "",
      };
    }
  },

  getBlogById: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return {
          data: null,
          success: false,
          message: "Blog not found",
          error: error.message,
        };
      }

      return {
        data,
        success: true,
        message: "Blog loaded",
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Failed to fetch blog",
        error: err?.message || "",
      };
    }
  },

  create: async (payload: BlogPayload): Promise<ApiResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .insert(payload)
        .select()
        .single();

      if (error) {
        return {
          data: null,
          success: false,
          message: "Failed to create blog",
          error: error.message,
        };
      }

      return {
        data,
        success: true,
        message: "Blog created successfully",
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Unexpected error",
        error: err?.message || "",
      };
    }
  },

  update: async (
    payload: BlogPayload,
    id?: string,
  ): Promise<ApiResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return {
          data: null,
          success: false,
          message: "Failed to update blog",
          error: error.message,
        };
      }

      return {
        data,
        success: true,
        message: "Blog updated successfully",
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Unexpected error",
        error: err?.message || "",
      };
    }
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const { error } = await supabase
        .from("blogs")
        .update({ active: false })
        .eq("id", id);

      if (error) {
        return {
          data: null,
          success: false,
          message: "Delete failed",
          error: error.message,
        };
      }

      return {
        data: null,
        success: true,
        message: "Blog deleted successfully",
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Delete failed",
        error: err?.message || "",
      };
    }
  },

  restore: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const { error } = await supabase
        .from("blogs")
        .update({ active: true })
        .eq("id", id);

      if (error) {
        return {
          data: null,
          success: false,
          message: "Restore failed",
          error: error.message,
        };
      }

      return {
        data: null,
        success: true,
        message: "Blog restored successfully",
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Restore failed",
        error: err?.message || "",
      };
    }
  },

  listDeleted: async (
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<AdminBlogs>> => {
    try {
      const safePage = Math.max(1, page);
      const safeLimit = Math.max(1, limit);

      const from = (safePage - 1) * safeLimit;
      const to = from + safeLimit - 1;

      const { data, count, error } = await supabase
        .from("blogs")
        .select("*", { count: "exact" })
        .eq("active", false)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        return {
          data: null,
          success: false,
          message: "Fetch failed",
          error: error.message,
        };
      }

      const totalItems = count ?? 0;
      const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

      return {
        data,
        success: true,
        message: "Deleted blogs fetched",
        error: null,
        meta: {
          totalPages,
          page: safePage,
          limit: safeLimit,
          hasNextPage: safePage < totalPages,
          hasPrevPage: safePage > 1,
          totalCount: totalItems,
        },
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Error occurred",
        error: err?.message || "",
      };
    }
  },

  latest: async (limit = 5): Promise<PaginatedResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        return {
          data: null,
          success: false,
          message: "Failed to fetch latest blogs",
          error: error.message,
        };
      }

      return {
        data: data || [],
        success: true,
        message: "Latest blogs fetched successfully",
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Unexpected error occurred",
        error: err?.message || "UNKNOWN",
      };
    }
  },

  Categories: async (): Promise<{
    data: BlogCategory[] | null;
    success: boolean;
    message: string;
    error: string | null;
  }> => {
    try {
      // Fetch categories
      const { data: categories, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        return {
          data: null,
          success: false,
          message: "Failed to fetch categories",
          error: error.message,
        };
      }

      return {
        data: categories ?? [],
        success: true,
        message: "Categories fetched successfully",
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Unexpected error",
        error: err.message || "UNKNOWN",
      };
    }
  },

  byCategory: async (
    categoryId: number,
    limit = 5,
    search = "",
  ): Promise<PaginatedResponse<any>> => {
    try {
      let query = supabase
        .from("blogs")
        .select("*")
        .eq("active", true)
        .eq("category_id", categoryId);

      if (search && search.trim() !== "") {
        query = query.or(
          `title.ilike.%${search}%,description.ilike.%${search}%`,
        );
      }
      const { data, error } = await query
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        return {
          data: null,
          success: false,
          message: `Failed to fetch blogs for category ID ${categoryId}`,
          error: error.message,
        };
      }

      return {
        data: data || [],
        success: true,
        message: `Blogs for category ID ${categoryId} fetched successfully`,
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        success: false,
        message: "Unexpected error occurred",
        error: err?.message || "UNKNOWN",
      };
    }
  },
};
