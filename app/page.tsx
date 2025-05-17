import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { FeaturedBlogs } from '@/components/home/featured-blogs';
import { QuotesSection } from '@/components/home/quotes-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturedBlogs />
      <QuotesSection />
    </div>
  );
}