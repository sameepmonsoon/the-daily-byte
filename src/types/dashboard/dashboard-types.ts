// blogs
export interface AdminBlogs {
  id: number;
  title: string;
  description: string;
  content: string;
  imageId: number;
  image: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
  categoryId: number;
  slug: string;
}

export type AdminStatus = 'active' | 'inactive';

export interface BlogCategory {
  id: string;      
  key: string;    
  value: string;   
  name: string;  
}
