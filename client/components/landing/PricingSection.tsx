

export default function PricingSection() {
  return (
    <section className="bg-white py-20" id="pricing">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-blue md:text-4xl">
            Simple pricing for independent service businesses
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            One clear monthly plan with the tools you need to stay organized,
            send professional invoices, and keep work moving in the field.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
                TruWork
              </p>
              <h3 className="mt-2 text-2xl font-bold text-brand-blue">
                One plan. No bloated tiers.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
                Built for contractors and service professionals who want a clean,
                mobile-first workflow without paying for a complicated all-in-one
                platform they do not need.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 px-6 py-5 text-left md:min-w-[220px]">
              <p className="text-sm font-medium text-gray-500">Monthly price</p>
              <p className="mt-2 text-4xl font-bold text-brand-blue">$29</p>
              <p className="mt-1 text-sm text-gray-600">per month</p>
              <p className="mt-4 text-sm text-gray-600">
                Add an additional user for <span className="font-semibold text-brand-blue">$12/month</span>.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-sm font-semibold text-brand-blue">Included</p>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li>Unlimited invoices and estimates</li>
                <li>Photo documentation built into the workflow</li>
                <li>Mobile-first job and schedule management</li>
                <li>Professional customer-ready invoice presentation</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-sm font-semibold text-brand-blue">Coming soon</p>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li>Square payments integration</li>
                <li>QuickBooks sync</li>
                <li>Expanded team features</li>
                <li>Customer history and deeper reporting</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              Start with a 14-day free trial and see if TruWork fits your workflow.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-brand-red px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}