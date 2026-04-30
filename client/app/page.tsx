import {
  LandingNavbar,
  HeroSection,
  FeaturesSection,
  ProcessSection,
  InstallOnPhoneSection,
  PricingSection,
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
      <PricingSection />
      <section id="install">
        <InstallOnPhoneSection />
      </section>
      {/* <TestimonialsSection /> */}
      <CtaSection />
      <LandingFooter />
    </main>
  );
}