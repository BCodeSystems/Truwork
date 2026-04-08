import { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  client: string;
  address: string;
  date: string;
  status: string;
};

type NewJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: Job) => void;
  initialJob?: Job | null;
};

export default function NewJobModal({
  isOpen,
  onClose,
  onSubmit,
  initialJob = null,
}: NewJobModalProps) {
  const [form, setForm] = useState({
    title: "",
    client: "",
    address: "",
    date: "",
  });

  useEffect(() => {
    if (initialJob) { 
      setForm({
        title: initialJob.title,
        client: initialJob.client,
        address: initialJob.address,
        date: initialJob.date,
      });
    } else { 
      setForm({
        title: "",
        client: "",
        address: "",
        date: "",
      });
    }
  }, [initialJob, isOpen]);

  if (!isOpen) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newJob: Job = {
      id: initialJob ? initialJob.id : Date.now(),
      title: form.title,
      client: form.client,
      address: form.address,
      date: form.date,
      status: initialJob ? initialJob.status : "Scheduled",
    };

    onSubmit(newJob);

    setForm({
      title: "",
      client: "",
      address: "",
      date: "",
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-brand-blue">
              {initialJob ? "Edit Job" : "New Job"}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {initialJob ? "Update the job details." : "Create a new job for a client."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-brand-blue"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Kitchen Sink Repair"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              name="client"
              value={form.client}
              onChange={handleChange}
              placeholder="Ex: Sarah Johnson"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Ex: 123 Main St, San Diego, CA"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Date / Time
            </label>
            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="Ex: Today • 10:00 AM"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              {initialJob ? "Update Job" : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}