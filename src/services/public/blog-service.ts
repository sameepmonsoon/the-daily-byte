import { supabase } from "@/lib/supabaseClient";

export const BlogService = {
  list: async (page = 1, limit = 10) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);
    return data;
  },

  getBySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  create: async (payload: {
    title: string;
    slug: string;
    content: string;
    created_by: string; // userId
    coverImage?: string | null;
  }) => {
    const { data, error } = await supabase
      .from("blogs")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
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

  delete: async (id: string) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) throw new Error(error.message);
    return true;
  },
};
