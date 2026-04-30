import ScheduleCard from "./ScheduleCard";

type ScheduleItem = {
  id: string;
  job: string;
  time: string;
  client: string;
  address: string;
};

type ScheduleListProps = {
  scheduleItems: ScheduleItem[];
  selectedScheduleItemId: string | null;
  setSelectedScheduleItemId: (id: string) => void;
};

export default function ScheduleList({
  scheduleItems,
  selectedScheduleItemId,
  setSelectedScheduleItemId,
}: ScheduleListProps) {
  if (scheduleItems.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
        No jobs scheduled for today.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {scheduleItems.map((item) => (
        <ScheduleCard
          key={item.id}
          scheduleItem={item}
          isSelected={item.id === selectedScheduleItemId}
          onSelect={() => setSelectedScheduleItemId(item.id)}
        />
      ))}
    </div>
  );
}