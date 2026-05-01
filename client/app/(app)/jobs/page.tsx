"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import  JobCard from "@/components/jobs/JobCard"
import NewJobModal from "@/components/jobs/NewJobModal";

type Job = {
  id: number;
  title: string;
  client: string;
  address: string;
  status: string;
  date: string;
};

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Kitchen Sink Repair",
    client: "Sarah Johnson",
    address: "123 Main St, San Diego, CA",
    status: "Scheduled",
    date: "Today • 10:00 AM",
  },
  {
    id: 2,
    title: "Weekly Lawn Maintenance",
    client: "Mike Rodriguez",
    address: "456 Oak Ave, Chula Vista, CA",
    status: "In Progress",
    date: "Today • 1:30 PM",
  },
  {
    id: 3,
    title: "Garage Cleanout",
    client: "Tom Chen",
    address: "789 Pine Rd, Oceanside, CA",
    status: "Completed",
    date: "Yesterday • 4:00 PM",
  },
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setIsModalOpen(true);

      const params = new URLSearchParams(searchParams.toString());
      params.delete("new");
      const nextQuery = params.toString();
      router.replace(nextQuery ? `/jobs?${nextQuery}` : "/jobs");
    }
  }, [searchParams, router]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/api/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          const formattedJobs = data.jobs.map((job: any) => ({
            id: job.id,
            title: job.title,
            client: job.customerName,
            address: job.serviceAddress,
            status: "Scheduled",
            date: new Date(job.scheduledAt).toLocaleString(),
          }));

          setJobs(formattedJobs);
        }
      } catch (error) {
        console.error("Fetch jobs error:", error);
      }
    };

    fetchJobs();
  }, []);

  function handleAddJob(job: Job) {
    setJobs((prevJobs) => [job, ...prevJobs]);
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">Jobs</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage scheduled, active, and completed jobs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-lg bg-brand-red px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
        >
          + New Job
        </button>
      </div>

      <div className="border-t border-gray-300 pt-4">
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
      <NewJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddJob}
      />
    </section>
  );
}