import BackButton from "@/components/ui/BackButton";
export default function PaymentsPage() {
    return (
      <section className="space-y-4">
        <BackButton label="Back to Menu" />
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">Payments</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage future payment tools, payout options, and customer payment
            settings for TruWork.
          </p>
        </div>
  
        <div className="border-t border-gray-200 pt-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-brand-blue">
              Square Integration
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Connect your Square account to accept customer payments online and
              on-site directly through TruWork.
            </p>
  
            <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
              Coming in V2
            </div>
          </div>
  
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-brand-blue">
              Payout Preferences
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Choose where future customer payments will be deposited and manage
              payout timing options.
            </p>
  
            <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
              Available after payments launch
            </div>
          </div>
  
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-brand-blue">
              Payment Activity
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              View successful payments, pending transactions, and refunded
              invoices once payment processing is enabled.
            </p>
  
            <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
              No payment activity yet
            </div>
          </div>
        </div>
      </section>
    );
  }