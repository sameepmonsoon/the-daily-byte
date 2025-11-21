import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from 'uuid';

interface UploadBlogImageProps {
  payload: FormData;
  multiple?: boolean;userId:string
}

export const uploadBlogImage = async ({ payload, multiple = false, userId }: UploadBlogImageProps) => {
  const file = payload.get('file') as File;
  const folder = payload.get('folder') as string;

  if (!file) throw new Error('No file provided');

  const filePath = userId + "/" + uuidv4();
console.log({first:userId, uuid:uuidv4(),file})
  // Upload to Supabase
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('blog-images') 
      .upload(filePath, file)
    // .upload(filePath, file, { cacheControl: '3600', upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  // Get public URL
  const { data: urlData, } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  if (!urlData) throw new Error('err');

  return urlData.publicUrl;
};



export const BlogService = {
  list: async (page = 1, limit = 10) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error,count } = await supabase
      .from("blogs")
  .select("*", { count: "exact" })      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);
    
    const total = count ?? 0
    const totalPages = Math.ceil(total / limit)

    return {data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },error:null};
  },

getBlogBySlug : async (slug: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *
    `)
    .eq("slug", slug)
    .single()

  if (error) throw error
  return data
}
,

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
