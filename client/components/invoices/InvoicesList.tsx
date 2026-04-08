import React from "react";
import InvoiceCard from "@/components/invoices/InvoiceCard";

type Invoice = {
  id: string;
  client: string;
  job: string;
  amount: number;
  type: "INVOICE" | "ESTIMATE";
  status: "DRAFT" | "SENT" | "PAID";
  date: string;
};

type InvoicesListProps = {
  invoices: Invoice[];
};

export default function InvoicesList({ invoices }: InvoicesListProps) {
  if (invoices.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
        No invoices or estimates yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
}