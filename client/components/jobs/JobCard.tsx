import Link from "next/link";

type Job = {
    id: number;
    title: string;
    client: string;
    address: string;
    date: string;
    status: string;
};

type JobCardProps = {
    job: Job;
};

export default function JobCard({ job }: JobCardProps) {
    return (
      <Link href={`/jobs/${job.id}`} className="block">
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-brand-blue">
                {job.title}
              </h3>

              <p className="mt-1 text-sm text-gray-700">{job.client}</p>

              <p className="mt-1 text-sm text-gray-500">{job.address}</p>

              <p className="mt-2 text-sm text-gray-500">{job.date}</p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {job.status}
            </span>
          </div>
        </article>
      </Link>
    );
}