import { PageHeader } from "@/components/shared/page-header";
import { ContentPlaceholder } from "@/components/shared/content-placeholder";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader 
        title="Leaderboard" 
        subtitle="See who's leading in coding challenges and contributions."
        backgroundImage="https://images.pexels.com/photos/7709292/pexels-photo-7709292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <ContentPlaceholder title="Member Rankings" />
    </div>
  );
}