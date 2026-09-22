import AboutSection from "@/component/about-section";
import AppointmentBanner from "@/component/bookappoint";
import ClinicHero from "@/component/clinic-hero";
import FAQSection from "@/component/faq";
import SiteFooter from "@/component/footer";
import Navbar from "@/component/navbar";
import RoadmapSection from "@/component/roadmap-section";
import TreatmentCards from "@/component/treatment-cards";
import TreatmentsTailored from "@/component/treatments-tailored";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black">
      <Navbar />
      <ClinicHero />
      <TreatmentCards />
      <TreatmentsTailored />
      <AboutSection />
      <RoadmapSection />
      <AppointmentBanner />
      <FAQSection />
      <SiteFooter />
    </div>
  );
}
