import { PageHeader } from "@/components/shared/page-header";
import { BlogDetail } from "@/components/blogs/blog-detail";
import { ScrambleText } from "@/components/shared/scramble-text";

interface BlogPageProps {
  params: {
    id: string;
  };
}

// Generate static pages for all blog posts
export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default function BlogPage({ params }: BlogPageProps) {
  return <BlogDetail blogId={params.id} />;
}
