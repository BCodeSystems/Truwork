export default function CtaSection() {
    return (
      <section className="bg-brand-red py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-6">
  
          <h2 className="text-3xl font-bold">
            Start Creating Professional Invoices Today
          </h2>
  
          <p className="mt-4 text-sm text-red-100 sm:text-base">
            Join service businesses who want a faster, cleaner invoicing workflow.
          </p>
  
          <a
            href="/signup"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#C62828] hover:opacity-90"
          >
            Start Free Trial
          </a>
  
          <p className="mt-4 text-xs text-red-100">
            Takes less than 2 minutes to set up
          </p>
  
        </div>
      </section>
    );
  }