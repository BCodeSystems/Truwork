"use client";

import React, { useEffect, useRef, useState } from "react";
import InvoiceCard from "@/components/invoices/InvoiceCard";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

type JobPhoto = {
  id: string;
  name: string;
  url: string;
  category: "Before" | "During" | "After";
};

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
  lineItems?: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    photoIds: string[];
  }[];
};

type InvoicesListProps = {
  invoices: Invoice[];
  selectedInvoiceId: string | null;
  setSelectedInvoiceId: (id: string | null) => void;
};

export default function InvoicesList({
  invoices,
  selectedInvoiceId,
  setSelectedInvoiceId,
}: InvoicesListProps) {
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);
  const [photosByInvoiceId, setPhotosByInvoiceId] = useState<Record<string, JobPhoto[]>>({});

  useEffect(() => {
    if (!selectedInvoiceId) return;
    if (photosByInvoiceId[selectedInvoiceId]) return;

    const invoice = invoices.find((inv) => inv.id === selectedInvoiceId);
    if (!invoice?.jobId) return;

    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/api/jobs/${invoice.jobId}/photos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPhotosByInvoiceId((prev) => ({
            ...prev,
            [selectedInvoiceId]: data.map((p: any) => ({
              id: p.id,
              name: p.fileName || "Job photo",
              url: p.photoUrl,
              category:
                p.category === "during"
                  ? "During"
                  : p.category === "after"
                    ? "After"
                    : "Before",
            })),
          }));
        }
      })
      .catch((err) => console.error("Fetch invoice photos error:", err));
  }, [selectedInvoiceId, invoices]);
  const [editForm, setEditForm] = useState({
    description: "",
    status: "DRAFT" as "DRAFT" | "SENT" | "PAID",
    subtotal: "",
    taxPercent: "",
    depositPaid: "",
  });
  const editFormRef = useRef<HTMLDivElement | null>(null);

  const startEditing = (invoice: Invoice) => {
    setSelectedInvoiceId(invoice.id);
    setEditingInvoiceId(invoice.id);
    const baseSubtotal = Number(invoice.subtotal ?? invoice.amount) || 0;
    const baseTax = Number(invoice.tax ?? 0) || 0;
    const computedTaxPercent = baseSubtotal > 0 ? (baseTax / baseSubtotal) * 100 : 0;

    setEditForm({
      description: invoice.description ?? "",
      status: invoice.status,
      subtotal: String(baseSubtotal),
      taxPercent: String(Number.isFinite(computedTaxPercent) ? computedTaxPercent : 0),
      depositPaid: String(invoice.depositPaid ?? 0),
    });

    setTimeout(() => {
      editFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleSaveInvoice = async (invoiceId: string) => {
    try {
      const token = localStorage.getItem("token");
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
      const subtotal = Number(editForm.subtotal) || 0;
      const taxRate = Number(editForm.taxPercent) || 0;
      const tax = subtotal * (taxRate / 100);
      const depositPaid = Number(editForm.depositPaid) || 0;
      const total = subtotal + tax;
      const balanceDue = Math.max(total - depositPaid, 0);

      const res = await fetch(`${apiBaseUrl}/api/invoices/${invoiceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: editForm.description,
          status: editForm.status.toLowerCase(),
          subtotal,
          tax,
          total,
          depositPaid,
          balanceDue,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error response:", text);
        return;
      }

      const data = await res.json();

      if (!data.success) {
        console.error(data.message);
        return;
      }

      setEditingInvoiceId(null);
      window.location.reload();
    } catch (error) {
      console.error("Update invoice error:", error);
    }
  };

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
        <div key={invoice.id} className="space-y-3">
          <InvoiceCard
            invoice={invoice}
            isSelected={invoice.id === selectedInvoiceId}
            photos={photosByInvoiceId[invoice.id] || []}
            onSelect={() =>
              setSelectedInvoiceId(
                invoice.id === selectedInvoiceId ? null : invoice.id
              )
            }
            onClose={() => setSelectedInvoiceId(null)}
            onModify={() => startEditing(invoice)}
            onResend={() => {
              console.log("Export invoice", invoice.id);
            }}
          />

          {editingInvoiceId === invoice.id && (
            <div
              ref={editFormRef}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-brand-blue">
                    Modify Invoice
                  </h3>
                  <p className="text-xs text-gray-500">
                    Update the invoice details and save changes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingInvoiceId(null)}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        status: e.target.value as "DRAFT" | "SENT" | "PAID",
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="SENT">Sent</option>
                    <option value="PAID">Paid</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Subtotal
                  </label>
                  <input
                    type="number"
                    value={editForm.subtotal}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, subtotal: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Tax (%)
                  </label>
                  <input
                    type="number"
                    value={editForm.taxPercent}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, taxPercent: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Deposit Paid
                  </label>
                  <input
                    type="number"
                    value={editForm.depositPaid}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        depositPaid: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>


              </div>

              <div className="mt-4 ml-auto w-full max-w-sm space-y-2 text-sm">
                {(() => {
                  const subtotal = Number(editForm.subtotal) || 0;
                  const taxRate = Number(editForm.taxPercent) || 0;
                  const tax = subtotal * (taxRate / 100);
                  const total = subtotal + tax;
                  const depositPaid = Number(editForm.depositPaid) || 0;
                  const balanceDue = Math.max(total - depositPaid, 0);

                  return (
                    <>
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax ({taxRate}%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-brand-blue">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Deposit Paid</span>
                        <span>${depositPaid.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between text-lg font-bold text-brand-blue">
                          <span>Balance Due</span>
                          <span>${balanceDue.toFixed(2)}</span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingInvoiceId(null)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveInvoice(invoice.id)}
                  className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}