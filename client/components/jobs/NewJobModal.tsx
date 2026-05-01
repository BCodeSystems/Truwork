import { useEffect, useState } from "react";

type Job = {
  id: string;
  title: string;
  client: string;
  address: string;
  clientPhone?: string;
  clientEmail?: string;
  description?: string;
  date: string;
  status: string;
};

type NewJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: Job) => void;
  initialJob?: Job | null;
};

function formatJobDateTime(date: string, time: string) {
  if (!date) return "";

  const dateParts = new Date(`${date}T00:00:00`);
  const formattedDate = dateParts.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!time) return formattedDate;

  const [hoursString, minutes] = time.split(":");
  const hours = Number(hoursString);
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${formattedDate} • ${displayHours}:${minutes} ${suffix}`;
}

function getInitialDateAndTime(dateValue: string) {
  if (!dateValue) {
    return { date: "", time: "" };
  }

  const [datePart, timePart] = dateValue.split(" • ");
  const parsedDate = new Date(datePart);

  const formattedDate = Number.isNaN(parsedDate.getTime())
    ? ""
    : parsedDate.toISOString().split("T")[0];

  if (!timePart) {
    return { date: formattedDate, time: "" };
  }

  const [timeValue, suffix] = timePart.split(" ");
  const [hoursString, minutes] = timeValue.split(":");
  let hours = Number(hoursString);

  if (suffix === "PM" && hours !== 12) hours += 12;
  if (suffix === "AM" && hours === 12) hours = 0;

  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

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
    clientPhone: "",
    clientEmail: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (initialJob) {
      const { date, time } = getInitialDateAndTime(initialJob.date);

      setForm({
        title: initialJob.title,
        client: initialJob.client,
        address: initialJob.address,
        clientPhone: initialJob.clientPhone ?? "",
        clientEmail: initialJob.clientEmail ?? "",
        description: initialJob.description ?? "",
        date,
        time,
      });
    } else {
      setForm({
        title: "",
        client: "",
        address: "",
        clientPhone: "",
        clientEmail: "",
        description: "",
        date: "",
        time: "",
      });
    }
  }, [initialJob, isOpen]);

  if (!isOpen) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newJob: Job = {
      id: initialJob ? initialJob.id : crypto.randomUUID(),
      title: form.title,
      client: form.client,
      address: form.address,
      clientPhone: form.clientPhone,
      clientEmail: form.clientEmail,
      description: form.description,
      date: formatJobDateTime(form.date, form.time),
      status: initialJob ? initialJob.status : "Scheduled",
    };

    onSubmit(newJob);

    setForm({
      title: "",
      client: "",
      address: "",
      clientPhone: "",
      clientEmail: "",
      description: "",
      date: "",
      time: "",
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/40 px-4 py-6">
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-6 pb-28 shadow-xl">
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 pb-8">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Job Name
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Client Phone
              </label>
              <input
                type="tel"
                name="clientPhone"
                value={form.clientPhone}
                onChange={handleChange}
                placeholder="Client phone (optional)"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Client Email
              </label>
              <input
                type="email"
                name="clientEmail"
                value={form.clientEmail}
                onChange={handleChange}
                placeholder="Client email (optional)"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Job Notes
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Job notes (optional)"
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0B1F3B] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
              />
            </div>
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