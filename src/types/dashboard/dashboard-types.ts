// blogs
export interface AdminBlogs {
  id: string;
  title: string;
  slug: string;
  description: string;
  blogdetails: string;
  category_id: number;
  category: string | null;
  coverimage: string;
  authorid: string;
  created_by: string;
  active: boolean;
  created_at: string;
}

export type AdminStatus = "active" | "inactive";

export interface BlogCategory {
  id: string;
  key: string;
  value: string;
  name: string;
  label: string;
}

export interface BlogPayload {
  title: string;
  slug: string;
  description?: string;
  category_id?: string | null;
  category?: string | null;
  authorid?: string;
  active?: boolean;
  coverImage?: string | null;
  created_by: string;
  blogdetails: string;
  coverimage?: string;
}
