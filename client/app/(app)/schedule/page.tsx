"use client";

import { useState, useEffect } from "react";
import ScheduleList from "@/components/schedule/ScheduleList";

// Schedule item shape for this page.
type ScheduleItem = {
  id: string;
  job: string;
  time: string;
  client: string;
  address: string;
};

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
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (data.success && data.jobs) {
          const today = new Date();
          const todayJobs = data.jobs.filter((job: any) => {
            const jobDate = new Date(job.scheduledAt);
            return (
              jobDate.getFullYear() === today.getFullYear() &&
              jobDate.getMonth() === today.getMonth() &&
              jobDate.getDate() === today.getDate()
            );
          });
          const formatted = todayJobs.map((job: any) => {
            const scheduledDate = new Date(job.scheduledAt);

            const timeString = scheduledDate.toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            });

            return {
              id: job.id,
              job: job.title,
              time: formatTime(timeString),
              client: job.customerName,
              address: job.serviceAddress,
            };
          });

          setScheduleItems(formatted);
        }
      } catch (error) {
        console.error("Schedule fetch error:", error);
      }
    };

    fetchSchedule();
  }, []);

  const sortedScheduleItems = [...scheduleItems].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

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
          scheduleItems={sortedScheduleItems}
          selectedScheduleItemId={selectedScheduleItemId}
          setSelectedScheduleItemId={setSelectedScheduleItemId}
        />
      </div>
    </section>
  );
}