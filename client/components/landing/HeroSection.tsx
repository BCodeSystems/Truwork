export default function HeroSection() {
    return (
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="max-w-lg text-4xl font-bold leading-tight text-[#0B1F3B] md:text-5xl">
              Professional Invoicing Made Simple.
            </h1>
  
            <p className="mt-4 max-w-md text-base leading-7 text-gray-600">
              Create invoices on the job site. Add photos, send instantly, and get
              paid faster. Built for service businesses who need tools that just work.
            </p>
  
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/login"
                className="rounded-lg bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Start Free Trial
              </a>
  
              <a
                href="#install"
                className="rounded-lg border border-[#0B1F3B] px-5 py-3 text-sm font-semibold text-[#0B1F3B] hover:bg-gray-50"
              >
                See How It Works
              </a>
            </div>
  
            <p className="mt-4 text-sm text-gray-500">
              No credit card required • Free 14-day trial
            </p>
          </div>
  
          <div className="rounded-2xl bg-gray-100 shadow-lg">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-300" />
          </div>
        </div>
      </section>
    );
  }