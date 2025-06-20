import { PageHeader } from "@/components/shared/page-header";
import { ContentPlaceholder } from "@/components/shared/content-placeholder";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader 
        title="Resources" 
        subtitle="Tutorials, guides, and tools to help you on your coding journey."
        backgroundImage="https://images.pexels.com/photos/1102797/pexels-photo-1102797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <ContentPlaceholder title="Learning Resources" />
    </div>
  );
}