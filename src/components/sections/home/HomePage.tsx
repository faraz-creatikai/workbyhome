import CrmImagePage from "@/components/sections/home/crmImgSection";
import HeroSection from "@/components/sections/home/hero";
import IntegrationsSection from "@/components/sections/home/integrationsSection";
import PricingPage from "@/components/sections/home/pricing";
import RecentJobsPage from "@/components/sections/home/recentjobs";
import StatsSection from "@/components/sections/home/stats";
import TestimonialsSection from "@/components/sections/home/testimonials";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <HeroSection/>
    <StatsSection/>
    <RecentJobsPage/>
    <CrmImagePage/>
    <IntegrationsSection/>
    <TestimonialsSection/>
    <PricingPage/>
   </div>
  );
}
