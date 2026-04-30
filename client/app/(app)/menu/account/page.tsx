import BackButton from "@/components/ui/BackButton";

export default function AccountSettingsPage() {
  return (
    <section className="space-y-4">
      <BackButton label="Back to Menu" />
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Account Settings</h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage the business details that appear on invoices and customer-facing documents.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <form className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Business Logo
              </label>
              <div className="mt-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-sm text-gray-500">
                Logo upload will be connected when account storage is added.
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                placeholder="TruWork Plumbing"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                placeholder="Mike Johnson"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(619) 555-1234"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="mike@truwork.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Business Address
              </label>
              <input
                type="text"
                placeholder="123 Main St, San Diego, CA"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Invoice Footer Note
              </label>
              <textarea
                rows={4}
                placeholder="Thank you for your business. Payment is due upon receipt."
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Changes will be saved to your business profile once backend persistence is connected.
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-brand-red px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-brand-blue">Subscription</h3>
          <p className="mt-2 text-sm text-gray-600">
            Subscription management and cancellation controls will be added when billing is connected.
          </p>
        </div>
      </div>
    </section>
  );
}