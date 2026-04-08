"use client";

import InvoicesList from "@/components/invoices/InvoicesList";
import { useState } from "react";

// Invoice data shape for this page (matches child components)
type Invoice = {
  id: string;
  client: string;
  job: string;
  amount: number;
  type: "INVOICE" | "ESTIMATE";
  status: "DRAFT" | "SENT" | "PAID";
  date: string;
};

// Temporary mock data for V1
const mockInvoices: Invoice[] = [
  {
    id: "1",
    client: "Sarah Johnson",
    job: "Kitchen Sink Repair",
    amount: 150,
    type: "INVOICE",
    status: "PAID",
    date: "Mar 20, 2026",
  },
  {
    id: "2",
    client: "Mike Rodriguez",
    job: "Weekly Lawn Maintenance",
    amount: 80,
    type: "ESTIMATE",
    status: "SENT",
    date: "Mar 22, 2026",
  },
];

export default function InvoicesPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  return (
    <section className="space-y-4">
      {/* Page header */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold text-brand-blue">Invoices</h2>
        <p className="mt-2 text-sm text-gray-600">
          See previous invoices to resend or review.
        </p>
      </div>

      {/* Invoices list */}
      <InvoicesList
        invoices={mockInvoices}
        selectedInvoiceId={selectedInvoiceId}
        setSelectedInvoiceId={setSelectedInvoiceId}
      />
    </section>
  );
}