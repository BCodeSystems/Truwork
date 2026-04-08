export default function DashboardPage() {
    return (
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F3B]">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-600">
            Overview of jobs, invoices, and team activity.
          </p>
        </div>
  
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Today&apos;s Jobs</p>
            <p className="mt-2 text-3xl font-bold text-[#0B1F3B]">8</p>
          </div>
  
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Invoices Sent</p>
            <p className="mt-2 text-3xl font-bold text-[#0B1F3B]">14</p>
          </div>
  
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Active Team Members</p>
            <p className="mt-2 text-3xl font-bold text-[#0B1F3B]">3</p>
          </div>
        </div>
  
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#0B1F3B]">
            Recent Activity
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Your dashboard data will appear here once the backend is connected.
          </p>
        </div>
      </section>
    );
  }