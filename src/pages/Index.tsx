import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import VideoSection from "@/components/sections/VideoSection";
import WhyAttendSection from "@/components/sections/WhyAttendSection";
import WalkAwaySection from "@/components/sections/WalkAwaySection";
import AboutPreviewSection from "@/components/sections/AboutPreviewSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PartnersSection from "@/components/sections/PartnersSection";
import CountdownSection from "@/components/sections/CountdownSection";
import RegistrationSection from "@/components/sections/RegistrationSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <VideoSection />
        <WhyAttendSection />
        <WalkAwaySection />
        <AboutPreviewSection />
        <TestimonialsSection />
        <PartnersSection />
        <CountdownSection />
        <RegistrationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
