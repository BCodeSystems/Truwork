import {
  LandingNavbar,
  HeroSection,
  FeaturesSection,
  ProcessSection,
  InstallOnPhoneSection,
  TestimonialsSection,
  CtaSection,
  LandingFooter,
} from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <section id="install">
        <InstallOnPhoneSection />
      </section>
      <TestimonialsSection />
      <CtaSection />
      <LandingFooter />
    </main>
  );
}