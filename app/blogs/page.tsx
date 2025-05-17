import { PageHeader } from "@/components/shared/page-header";
import { BlogList } from "@/components/blogs/blog-list";

export default function BlogsPage() {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader 
        title="Blogs" 
        subtitle="Technical articles, tutorials, and insights from our community."
        backgroundImage="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <BlogList />
    </div>
  );
}