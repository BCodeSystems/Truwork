"use client";
import { useState } from "react";
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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddJob(job: Job) {
    setJobs((prevJobs) => [job, ...prevJobs]);
  }

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F3B]">Jobs</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage scheduled, active, and completed jobs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          + New Job
        </button>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <NewJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddJob}
      />
    </section>
  );
}