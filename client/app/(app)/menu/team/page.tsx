import BackButton from "@/components/ui/BackButton";

export default function TeamPage() {
  return (
    <section className="space-y-4">
      <BackButton label="Back to Menu" />
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Team</h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage employees, permissions, and access levels for your business.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-brand-blue">
                Team Members
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Add users and control what they can view or edit.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Add Team Member
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-brand-blue">Mike Johnson</p>
                <p className="mt-1 text-sm text-gray-600">(619) 555-1234</p>
                <p className="mt-1 text-xs font-medium text-gray-500">Admin Access</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-brand-blue">David Lopez</p>
                <p className="mt-1 text-sm text-gray-600">(619) 555-9832</p>
                <p className="mt-1 text-xs font-medium text-gray-500">Field User</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-brand-blue">Sarah Martinez</p>
                <p className="mt-1 text-sm text-gray-600">(619) 555-4472</p>
                <p className="mt-1 text-xs font-medium text-gray-500">View Only</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-brand-blue">Permissions</h3>
          <p className="mt-2 text-sm text-gray-600">
            Admin users can manage billing and settings. Field users can manage jobs and invoices. View only users can review business activity without editing.
          </p>
        </div>
      </div>
    </section>
  );
}