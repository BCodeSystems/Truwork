import BackButton from "@/components/ui/BackButton";

export default function SupportPage() {
  return (
    <section className="space-y-4">
      <BackButton label="Back to Menu" />
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Support</h2>
        <p className="mt-2 text-sm text-gray-600">
          Get help with TruWork and find answers to common questions.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-brand-blue">Contact Support</h3>
          <p className="mt-2 text-sm text-gray-600">
            Need help with your account, invoices, or workflow? Reach out and we will be here to help.
          </p>

          <div className="mt-4 grid gap-3">
            <a
              href="mailto:support@truwork.com"
              className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-brand-blue transition hover:bg-gray-50"
            >
              Email Support
            </a>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-brand-blue">Frequently Asked Questions</h3>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-800">
                Do I need to download an app?
              </p>
              <p className="mt-1 text-sm text-gray-600">
                No. TruWork is designed to run directly in your browser and can be added to your phone for quick access.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                Can I add photos to my invoices?
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Yes. TruWork is built around documenting completed work with photos as part of the invoicing workflow.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                Can I add team members?
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Yes. Additional users can be added to your account, and permission controls will expand as team features grow.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                Are payments integrated yet?
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Payments integration is planned for a future version. TruWork will support a cleaner payment workflow as the platform expands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}