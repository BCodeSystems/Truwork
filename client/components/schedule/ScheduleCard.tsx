type ScheduleCardProps = {
  scheduleItem: {
    id: string;
    job: string;
    time: string;
    client: string;
    address: string;
  };
  isSelected: boolean;
  onSelect: () => void;
};

export default function ScheduleCard({
  scheduleItem,
  isSelected,
  onSelect,
}: ScheduleCardProps) {
  const { job, time, client, address } = scheduleItem;

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition ${
        isSelected
          ? "border-brand-blue bg-blue-50 shadow-md"
          : "border-gray-200 hover:border-brand-blue hover:shadow-md"
      }`}
    >
      <div className="flex flex-col gap-3">
        {/* Top row */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold text-brand-blue">{job}</p>
          <p className="text-sm font-medium text-gray-700">{time}</p>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-800">{client}</p>
          <p className="text-xs text-gray-500">{address}</p>
        </div>

        {/* Expanded selected state */}
        {isSelected ? (
          <div className="border-t border-gray-200 pt-3">
            <h3 className="text-sm font-semibold text-brand-blue">
              Job Actions
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              Scheduling actions will be enabled when saved jobs and backend updates are connected.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled
                onClick={(e) => e.stopPropagation()}
                className="cursor-not-allowed rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-400"
              >
                Reschedule
              </button>

              <button
                type="button"
                disabled
                onClick={(e) => e.stopPropagation()}
                className="cursor-not-allowed rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-400"
              >
                Cancel Job
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}