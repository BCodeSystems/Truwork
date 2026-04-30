import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/truwork-hero.jpeg"
          alt="Contractor using TruWork beside service van"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/55 md:bg-white/42" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold leading-tight text-brand-blue md:text-6xl">
            Professional Invoicing Made Simple.
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-700 md:text-lg">
            Create invoices on the job site. Add photos, send instantly, and get paid faster. Built for service businesses who need tools that just work.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/signup"
              className="rounded-lg bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Start Free Trial
            </a>

            <a
              href="#install"
              className="rounded-lg border border-[#0B1F3B] bg-white/80 px-5 py-3 text-sm font-semibold text-brand-blue hover:bg-white"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            No credit card required • Free 14-day trial
          </p>
        </div>
      </div>
    </section>
  );
}