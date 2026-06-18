import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import GoogleReviewsSlider from '@/components/sections/GoogleReviewsSlider';
import FeaturedListings from '@/components/sections/FeaturedListings';
import AreasGrid from '@/components/sections/AreasGrid';
import WhySamSalem from '@/components/sections/WhySamSalem';
import ComparisonSection from '@/components/sections/ComparisonSection';
import ProcessSection from '@/components/sections/ProcessSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import AwardsSection from '@/components/sections/AwardsSection';
import LatestNews from '@/components/sections/LatestNews';
import ContactCTA from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhySamSalem />
      <StatsSection />
      <GoogleReviewsSlider />
      <FeaturedListings />
      <AwardsSection />
      <AreasGrid />
      <ComparisonSection />
      <ProcessSection />
      <AchievementsSection />
      {/* <Testimonials /> */}
      <LatestNews />
      <ContactCTA />
    </>
  );
}
