import Link from "next/link";
export default function MenuPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Menu</h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage your account, team, and support options from one place.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="grid gap-3">
          <Link
            href="/menu/account"
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-blue hover:shadow-md"
          >
            <p className="text-sm font-semibold text-brand-blue">
              Account Settings
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Change your logo, update contact information shown on invoices,
              and manage your subscription.
            </p>
          </Link>

          <Link
            href="/menu/team"
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-blue hover:shadow-md"
          >
            <p className="text-sm font-semibold text-brand-blue">Team</p>
            <p className="mt-1 text-sm text-gray-600">
              View your team, manage permissions, and edit user details like
              name, phone number, and access level.
            </p>
          </Link>

          <Link
            href="/menu/payments"
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-blue hover:shadow-md"
          >
            <p className="text-sm font-semibold text-brand-blue">Payments</p>
            <p className="mt-1 text-sm text-gray-600">
              Manage future payment tools, payout options, and Square integration settings.
            </p>
          </Link>

          <Link
            href="/menu/support"
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-blue hover:shadow-md"
          >
            <p className="text-sm font-semibold text-brand-blue">Support</p>
            <p className="mt-1 text-sm text-gray-600">
              Contact support and access help resources like FAQs and future
              troubleshooting guides.
            </p>
          </Link>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <button
            type="button"
            className="w-full rounded-xl bg-brand-red px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}