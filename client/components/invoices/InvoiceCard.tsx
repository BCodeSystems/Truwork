import React from "react";

type InvoiceCardProps = {
  invoice: {
    client: string;
    job: string;
    amount: number;
    type: "INVOICE" | "ESTIMATE";
    status: "DRAFT" | "SENT" | "PAID";
    date: string;
  };
};

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  const { client, job, amount, type, date } = invoice;

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-gray-200 cursor-pointer transition hover:shadow-md hover:border-brand-blue">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-brand-blue">{client}</p>
          <p className="text-sm text-gray-600">{job}</p>
        </div>
        <p className="text-lg font-bold text-brand-blue">${amount.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            type === "INVOICE"
              ? "bg-brand-blue text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {type}
        </span>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}