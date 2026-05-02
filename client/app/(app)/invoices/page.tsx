"use client";

import InvoicesList from "@/components/invoices/InvoicesList";
import { useState, useEffect } from "react";

// Invoice data shape for this page (matches child components)
type Invoice = {
  id: string;
  jobId: string;
  client: string;
  job: string;
  amount: number;
  type: "INVOICE" | "ESTIMATE";
  status: "DRAFT" | "SENT" | "PAID";
  date: string;
  documentNumber?: string;
  description?: string | null;
  subtotal?: number;
  tax?: number;
  depositPaid?: number;
  balanceDue?: number;
  paymentMethods?: string[];
  dueDate?: string | null;
  lineItems?: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    photoIds: string[];
  }[];
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

export default function InvoicesPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/api/invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          const formatted = data.invoices.map((inv: any) => ({
            id: inv.id,
            jobId: inv.jobId,
            client: inv.job?.customerName || "Unknown",
            job: inv.job?.title || "Job",
            amount: Number(inv.total),
            type: inv.type?.toUpperCase() === "ESTIMATE" ? "ESTIMATE" : "INVOICE",
            status: inv.status?.toUpperCase() === "PAID"
              ? "PAID"
              : inv.status?.toUpperCase() === "SENT"
              ? "SENT"
              : "DRAFT",
            date: new Date(inv.createdAt).toLocaleDateString(),
            documentNumber: inv.documentNumber,
            description: inv.description,
            subtotal: Number(inv.subtotal),
            tax: Number(inv.tax),
            depositPaid: Number(inv.depositPaid),
            balanceDue: Number(inv.balanceDue),
            paymentMethods: inv.paymentMethods ?? [],
            dueDate: inv.dueDate ?? null,
            lineItems: inv.lineItems?.map((item: any) => ({
              id: item.id,
              description: item.description,
              quantity: item.quantity,
              unitPrice: Number(item.unitPrice),
              lineTotal: Number(item.lineTotal),
              photoIds: item.photoIds ?? [],
            })) ?? [],
          }));

          setInvoices(formatted);
        }
      } catch (error) {
        console.error("Fetch invoices error:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <section className="space-y-4">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Invoices</h2>
        <p className="mt-2 text-sm text-gray-600">
          See previous invoices to resend or review.
        </p>
      </div>

      {/* Invoices list */}
      <div className="border-t border-gray-200 pt-4">
        <InvoicesList
          invoices={invoices}
          selectedInvoiceId={selectedInvoiceId}
          setSelectedInvoiceId={(id) => setSelectedInvoiceId(id)}
        />
      </div>
    </section>
  );
}