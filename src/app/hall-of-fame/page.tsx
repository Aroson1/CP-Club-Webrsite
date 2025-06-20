import { PageHeader } from "@/components/shared/page-header";
import { HallOfFameGallery } from "@/components/hall-of-fame/hall-of-fame-gallery";

export default function HallOfFamePage() {
  return (
    <div className="min-h-screen pt-20">
      <PageHeader 
        title="Hall of Fame" 
        subtitle="Celebrating our outstanding members, alumni, and projects."
        backgroundImage="https://images.pexels.com/photos/5926390/pexels-photo-5926390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <HallOfFameGallery />
    </div>
  );
}