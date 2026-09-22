import AboutSection from "@/component/about-section";
import AppointmentBanner from "@/component/bookappoint";
import ClinicHero from "@/component/clinic-hero";
import FAQSection from "@/component/faq";
import SiteFooter from "@/component/footer";
import { MobileActionBar } from "@/component/MobileActionBar";
import Navbar from "@/component/navbar";
import RoadmapSection from "@/component/roadmap-section";
import { ScrollTextReveal } from "@/component/ScrollTextReveal";
import TreatmentCards from "@/component/treatment-cards";
import TreatmentsTailored from "@/component/treatments-tailored";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black">
      <MobileActionBar />
      <Navbar />
      <ScrollTextReveal />
      <main id="home-content" className="flex flex-1 flex-col">
        <ClinicHero />
        <TreatmentCards />
        <TreatmentsTailored />
        <AboutSection />
        <div data-no-reveal><RoadmapSection /></div>
        <AppointmentBanner />
        <FAQSection />
      </main>
      <SiteFooter />
    </div>
  );
}
