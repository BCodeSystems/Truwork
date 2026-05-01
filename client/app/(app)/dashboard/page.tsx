"use client";
import { useEffect, useState } from "react";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

export default function DashboardPage() {
  const greeting = getGreeting();
  const [summary, setSummary] = useState({
    todaysJobs: 0,
    openInvoices: 0,
    paidThisMonth: 0,
    outstandingBalance: 0,
  });
  const [recentActivity, setRecentActivity] = useState({
    jobs: [] as any[],
    invoices: [] as any[],
  });
  const [userName, setUserName] = useState<string>("");

  const mergedActivity = [
    ...recentActivity.jobs.map((job) => ({
      id: `job-${job.id}`,
      type: "job" as const,
      label: `Created job ${job.title}`,
      date: job.createdAt,
    })),
    ...recentActivity.invoices.map((inv) => ({
      id: `inv-${inv.id}`,
      type: "invoice" as const,
      label: `Invoice ${inv.documentNumber} ($${inv.total.toFixed(2)})`,
      date: inv.createdAt,
    })),
  ].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setSummary(data.summary);
          if (data.recentActivity) {
            setRecentActivity(data.recentActivity);
          }
          if (data.user && data.user.name) {
            setUserName(data.user.name);
          }
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchDashboard();
  }, []);

    return (
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">
            {userName ? `${greeting}, ${userName}` : greeting}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Here is what is scheduled, open, and owed right now.
          </p>
        </div>
  
        <div className="border-t border-gray-200 pt-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Today&apos;s Jobs</p>
              <p className="mt-2 text-3xl font-bold text-brand-blue">{summary.todaysJobs}</p>
            </div>
    
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Open Invoices</p>
              <p className="mt-2 text-3xl font-bold text-brand-blue">{summary.openInvoices}</p>
            </div>
    
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Paid This Month</p>
              <p className="mt-2 text-3xl font-bold text-brand-blue">${summary.paidThisMonth.toFixed(2)}</p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Outstanding Balance</p>
              <p className="mt-2 text-3xl font-bold text-brand-blue">${summary.outstandingBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>
  
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-brand-blue">
            Recent Activity
          </h3>
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            {mergedActivity.length === 0 ? (
              <p className="text-gray-500">No recent activity yet.</p>
            ) : (
              mergedActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-sm">
                      {activity.type === "job" ? "🛠️" : "🧾"}
                    </span>
                    <span>{activity.label}</span>
                  </div>

                  <span className="shrink-0 text-xs text-gray-400">
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    );
  }