"use client";

import { useState } from "react";
import ScheduleList from "@/components/schedule/ScheduleList";

// Schedule item shape for this page.
type ScheduleItem = {
  id: string;
  job: string;
  time: string;
  client: string;
  address: string;
};

// Temporary mock schedule data for V1.
const mockScheduleItems: ScheduleItem[] = [
  {
    id: "1",
    job: "Kitchen Sink Repair",
    time: "10:00",
    client: "Sarah Johnson",
    address: "123 Main St, San Diego, CA",
  },
  {
    id: "2",
    job: "Weekly Lawn Maintenance",
    time: "13:30",
    client: "Mike Rodriguez",
    address: "456 Oak Ave, Chula Vista, CA",
  },
  {
    id: "3",
    job: "Drywall Patch Repair",
    time: "09:00",
    client: "Monica Lee",
    address: "789 Palm St, National City, CA",
  },
];

function formatTime(time: string) {
  const [hoursString, minutes] = time.split(":");
  const hours = Number(hoursString);
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${displayHours}:${minutes} ${suffix}`;
}

export default function SchedulePage() {
  const [selectedScheduleItemId, setSelectedScheduleItemId] =
    useState<string | null>(null);
  const scheduleItems = [...mockScheduleItems]
    .sort((a, b) => a.time.localeCompare(b.time))
    .map((item) => ({
      ...item,
      time: formatTime(item.time),
    }));

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Schedule</h2>
        <p className="mt-2 text-sm text-gray-600">
          See what is planned for today in time order.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <ScheduleList
          scheduleItems={scheduleItems}
          selectedScheduleItemId={selectedScheduleItemId}
          setSelectedScheduleItemId={setSelectedScheduleItemId}
        />
      </div>
    </section>
  );
}