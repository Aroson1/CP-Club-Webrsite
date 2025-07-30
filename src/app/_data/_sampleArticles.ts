import { blogPosts } from "./_blogs-details";

export interface Article {
  id: string;
  image: string;
  date: string;
  authorName: string;
  title: string;
  tags: string[];
}

// Convert blogPosts to Article format for backward compatibility, too lazy to change all references
export const sampleArticles: Article[] = blogPosts.map(blog => ({
  id: blog.id,
  image: blog.image,
  date: blog.date,
  authorName: blog.author,
  title: blog.title,
  tags: blog.tags
}));
