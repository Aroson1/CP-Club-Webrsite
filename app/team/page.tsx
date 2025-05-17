import { PageHeader } from "@/components/shared/page-header";
import { ContentPlaceholder } from "@/components/shared/content-placeholder";

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader 
        title="Our Team" 
        subtitle="Meet the dedicated members who make TechBytes possible."
        backgroundImage="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <ContentPlaceholder title="Team Members" />
    </div>
  );
}