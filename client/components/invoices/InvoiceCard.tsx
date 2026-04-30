import React from "react";

type InvoiceCardProps = {
  invoice: {
    client: string;
    job: string;
    amount: number;
    type: "INVOICE" | "ESTIMATE";
    status: "DRAFT" | "SENT" | "PAID";
    date: string;
    dueDate?: string | null;
    documentNumber?: string;
    description?: string | null;
    subtotal?: number;
    tax?: number;
    depositPaid?: number;
    balanceDue?: number;
    paymentMethods?: string[];
    lineItems?: {
      id: string;
      description: string;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
    }[];
  };
  isSelected: boolean;
  onSelect: () => void;
  onModify?: () => void;
  onResend?: () => void;
};

export default function InvoiceCard({
  invoice,
  isSelected,
  onSelect,
  onModify,
  onResend,
}: InvoiceCardProps) {
  const {
    client,
    job,
    amount,
    type,
    status,
    date,
    dueDate,
    documentNumber,
    description,
    subtotal,
    tax,
    depositPaid,
    balanceDue,
    paymentMethods = [],
    lineItems = [],
  } = invoice;

  const businessName = localStorage.getItem("truworkBusinessName") || "Your Business Name";
  const logoUrl = localStorage.getItem("truworkLogoUrl") || "";

  const descriptionText = description || "";

  const legacyBusinessNameMatch = descriptionText.match(/Business:\s*([^|]+)/i);
  const legacyPaymentMethodsMatch = descriptionText.match(/Payment methods:\s*([^|]+)/i);
  const legacyDueDateMatch = descriptionText.match(/Due:\s*([^|]+)/i);

  const cleanDescription = descriptionText
    .replace(/\s*\|\s*Business:\s*[^|]+/i, "")
    .replace(/\s*\|\s*Payment methods:\s*[^|]+/i, "")
    .replace(/\s*\|\s*Due:\s*[^|]+/i, "")
    .trim();

  const exportBusinessName =
    legacyBusinessNameMatch?.[1]?.trim() || businessName;

  const exportDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString()
    : legacyDueDateMatch?.[1]?.trim() || "Not set";

  const exportPaymentMethods =
    paymentMethods.length > 0
      ? paymentMethods.join(", ")
      : legacyPaymentMethodsMatch?.[1]?.trim() || "Not specified";

  const handleExportInvoice = () => {
    const invoiceWindow = window.open("", "_blank");

    if (!invoiceWindow) return;

    const lineItemsHtml = lineItems
      .map(
        (item) => `
          <tr>
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>$${item.unitPrice.toFixed(2)}</td>
            <td>$${item.lineTotal.toFixed(2)}</td>
          </tr>
        `
      )
      .join("");

    invoiceWindow.document.write(`
      <html>
        <head>
          <title>${documentNumber || type}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #0B1F3B;
            }
            h1 {
              margin-bottom: 4px;
            }
            .muted {
              color: #6b7280;
              font-size: 14px;
            }
            .section {
              margin-top: 24px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 12px;
            }
            th, td {
              border-bottom: 1px solid #e5e7eb;
              padding: 10px;
              text-align: left;
              font-size: 14px;
            }
            th {
              background: #f9fafb;
            }
            .totals {
              margin-top: 24px;
              margin-left: auto;
              width: 280px;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              padding: 6px 0;
              font-size: 14px;
            }
            .balance {
              border-top: 2px solid #0B1F3B;
              margin-top: 8px;
              padding-top: 10px;
              font-weight: bold;
            }
            @media print {
              button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <button onclick="window.print()">Print / Save PDF</button>

          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            ${logoUrl ? `<img src="${logoUrl}" style="height:50px;width:50px;border-radius:8px;object-fit:cover;" />` : ""}
            <div>
              <h2 style="margin:0;">${exportBusinessName}</h2>
              <p class="muted" style="margin:0;">${documentNumber || "Document"} • ${date}</p>
            </div>
          </div>

          <h1>${type}</h1>

          <div class="section">
            <h3>Client</h3>
            <p>${client}</p>
            <p class="muted">${job}</p>
          </div>

          <div class="section">
            <h3>Description</h3>
            <p>${cleanDescription || `Review this ${type.toLowerCase()} for ${job}.`}</p>
          </div>

          <div class="section">
            <h3>Details</h3>
            <p class="muted">Generated for job: ${job}</p>
          </div>

          <div class="section">
            <h3>Line Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${lineItemsHtml || "<tr><td colspan='4'>No line items saved.</td></tr>"}
              </tbody>
            </table>
          </div>

          <div class="totals">
            <div class="total-row"><span>Subtotal</span><span>$${(subtotal ?? amount).toFixed(2)}</span></div>
            <div class="total-row"><span>Tax</span><span>$${(tax ?? 0).toFixed(2)}</span></div>
            <div class="total-row"><span>Deposit Paid</span><span>$${(depositPaid ?? 0).toFixed(2)}</span></div>
            <div class="total-row balance"><span>Balance Due</span><span>$${(balanceDue ?? amount).toFixed(2)}</span></div>
          </div>

          <div class="section">
            <h3>Payment</h3>
            <p class="muted">Accepted payment methods: ${exportPaymentMethods}</p>
            <p class="muted">Due: ${exportDueDate}</p>
          </div>
        </body>
      </html>
    `);

    invoiceWindow.document.close();
    onResend?.();
  };

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
        <div className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-brand-blue">{client}</p>
            <p className="text-sm text-gray-600">{job}</p>
          </div>
          <p className="text-lg font-bold text-brand-blue">
            ${amount.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
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

        {isSelected ? (
          <div className="border-t border-gray-200 pt-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-brand-blue">
                  {type} Actions
                </h3>
                <p className="mt-1 text-xs text-gray-600">
                  {documentNumber ? `${documentNumber} • ` : ""}
                  {cleanDescription || `Review this ${type.toLowerCase()} for ${job}.`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {status}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onModify?.();
                  }}
                  disabled={!onModify}
                  className={`rounded-lg border px-3 py-1 text-xs font-semibold transition ${
                    onModify
                      ? "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                      : "cursor-not-allowed border-gray-200 text-gray-400"
                  }`}
                >
                  Modify
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExportInvoice();
                  }}
                  className="rounded-lg border border-brand-blue px-3 py-1 text-xs font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
                >
                  Export
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Line Items
                </p>
                <div className="mt-3 space-y-2">
                  {lineItems.length === 0 ? (
                    <p className="text-xs text-gray-500">
                      No line items saved for this document.
                    </p>
                  ) : (
                    lineItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <div>
                          <p className="font-medium text-gray-700">
                            {item.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty {item.quantity} × ${item.unitPrice.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-semibold text-brand-blue">
                          ${item.lineTotal.toFixed(2)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Totals
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${(subtotal ?? amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(tax ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Deposit Paid</span>
                    <span>${(depositPaid ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between font-semibold text-brand-blue">
                      <span>Balance Due</span>
                      <span>${(balanceDue ?? amount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}