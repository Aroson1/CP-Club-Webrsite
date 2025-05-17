import { PageHeader } from "@/components/shared/page-header";
import { ContentPlaceholder } from "@/components/shared/content-placeholder";

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader 
        title="Events" 
        subtitle="Stay updated with our workshops, hackathons, and tech talks."
        backgroundImage="https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <ContentPlaceholder title="Events Calendar" />
    </div>
  );
}