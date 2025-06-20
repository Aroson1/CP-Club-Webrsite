import { PageHeader } from "@/components/shared/page-header";
import { BlogDetail } from "@/components/blogs/blog-detail";

interface BlogPageProps {
  params: {
    id: string;
  };
}

// Generate static pages for all blog posts
export async function generateStaticParams() {
  return [
    { id: "1" }
  ];
}

export default function BlogPage({ params }: BlogPageProps) {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader 
        title="Blog Details" 
        subtitle="Dive deep into technical content and insights."
        backgroundImage="https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <BlogDetail blogId={params.id} />
    </div>
  );
}