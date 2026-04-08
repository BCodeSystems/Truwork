import React from "react";

type JobSummarySectionProps = {
  job: {
    title: string;
    client: string;
    address: string;
    phone: string;
    status: string;
    date: string;
  };
  jobId: number;
  onEdit: () => void;
};

export default function JobSummarySection({
  job,
  jobId,
  onEdit,
}: JobSummarySectionProps) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Job #{jobId}</p>
          <h2 className="text-2xl font-bold text-brand-blue">{job.title}</h2>
          <p className="mt-1 text-sm text-gray-600">
            View job details, client info, photos, and invoice actions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            {job.status}
          </span>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Edit Job
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-brand-blue">
            Client Information
          </h3>

          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium text-[#0B1F3B]">Client:</span>{" "}
              {job.client}
            </p>
            <p>
              <span className="font-medium text-[#0B1F3B]">Phone:</span>{" "}
              {job.phone}
            </p>
            <p>
              <span className="font-medium text-[#0B1F3B]">Address:</span>{" "}
              {job.address}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-brand-blue">
            Job Details
          </h3>

          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium text-[#0B1F3B]">Scheduled:</span>{" "}
              {job.date}
            </p>
            <p>
              <span className="font-medium text-[#0B1F3B]">Status:</span>{" "}
              {job.status}
            </p>
            <p>
              <span className="font-medium text-[#0B1F3B]">Service:</span>{" "}
              {job.title}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}