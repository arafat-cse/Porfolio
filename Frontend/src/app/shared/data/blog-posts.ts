export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryId?: number | null;
  flags: string[];
  date: string;
  publishDate?: string;
  readTime: string;
  views: string;
  tags: string[];
  image: string;
  featured?: boolean;
  trending?: boolean;
  status?: 'draft' | 'published';
  mediaId?: number | null;
}

export const BLOG_POSTS: BlogPost[] = [];
