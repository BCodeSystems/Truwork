import React from "react";

type JobPhoto = {
  id: string;
  name: string;
  url: string;
  category: "Before" | "During" | "After";
};

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
      photoIds?: string[];
    }[];
  };
  photos?: JobPhoto[];
  isSelected: boolean;
  onSelect: () => void;
  onClose?: () => void;
  onModify?: () => void;
  onResend?: () => void;
};

export default function InvoiceCard({
  invoice,
  photos = [],
  isSelected,
  onSelect,
  onClose,
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
  const footerNote = localStorage.getItem("truworkFooterNote") || "";

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

    const lineItemsMarkup = lineItems
      .map((item) => {
        const itemPhotos = (item.photoIds ?? [])
          .map((pid) => photos.find((p) => p.id === pid))
          .filter(Boolean) as JobPhoto[];

        const photosMarkup = itemPhotos
          .map(
            (photo) => `
              <div style="display:inline-block;margin-right:8px;margin-top:8px;text-align:center;">
                <img src="${photo.url}" alt="${photo.name}" style="width:88px;height:88px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb;display:block;" />
                <div style="margin-top:4px;font-size:11px;color:#6b7280;">${photo.category}</div>
              </div>`
          )
          .join("");

        return `
          <div style="padding:16px 0;border-bottom:1px solid #e5e7eb;">
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px;font-size:14px;color:#111827;">
              <div>${item.description || "—"}</div>
              <div>${item.quantity}</div>
              <div>$${item.lineTotal.toFixed(2)}</div>
            </div>
            ${photosMarkup ? `<div style="margin-top:8px;">${photosMarkup}</div>` : ""}
          </div>`;
      })
      .join("");

    invoiceWindow.document.write(`
      <html>
        <head>
          <title>${documentNumber || type}</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 32px; color: #111827; background: #fff; }
            .document { max-width: 900px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #c62828; padding-bottom: 24px; margin-bottom: 24px; }
            .brand { font-size: 30px; font-weight: 600; color: #0b1f3b; }
            .doc-type { font-size: 36px; font-weight: 700; color: #0b1f3b; text-align: right; }
            .meta { margin-bottom: 24px; line-height: 1.8; font-size: 14px; }
            .section-title { font-size: 20px; font-weight: 600; color: #0b1f3b; margin: 24px 0 12px; }
            .line-items-header { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 12px; padding: 12px 0; border-bottom: 1px solid #d1d5db; font-size: 12px; font-weight: 600; color: #0b1f3b; text-transform: uppercase; letter-spacing: 0.04em; }
            .total { margin-top: 20px; padding-top: 16px; border-top: 1px solid #d1d5db; text-align: right; font-size: 22px; font-weight: 700; color: #0b1f3b; }
            .totals-breakdown { margin-top: 12px; text-align: right; font-size: 14px; color: #6b7280; line-height: 2; }
            .payment { margin-top: 28px; padding-top: 20px; border-top: 1px solid #d1d5db; }
            .payment p { margin: 8px 0; font-size: 14px; }
            @media print { body { padding: 0; } button { display: none; } }
          </style>
        </head>
        <body>
          <div class="document">
            <div style="margin-bottom:16px;">
              <button onclick="window.print()" style="padding:8px 16px;background:#0b1f3b;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px;">Print / Save PDF</button>
              <button onclick="window.close()" style="padding:8px 16px;background:#e5e7eb;color:#111827;border:none;border-radius:6px;cursor:pointer;font-size:13px;margin-left:8px;">Close</button>
            </div>
            <div class="header">
              <div style="display:flex;align-items:center;gap:12px;">
                ${logoUrl ? `<img src="${logoUrl}" style="height:60px;width:auto;border-radius:8px;object-fit:contain;max-width:120px;" />` : ""}
                <div class="brand">${exportBusinessName}</div>
              </div>
              <div class="doc-type">${type}</div>
            </div>

            <div class="meta">
              <div><strong>Client:</strong> ${client}</div>
              <div><strong>Job:</strong> ${job}</div>
              <div><strong>Date:</strong> ${date}</div>
            </div>

            <div class="section-title">Line Items</div>
            <div class="line-items-header">
              <div>Description</div>
              <div>Quantity</div>
              <div>Amount</div>
            </div>
            ${lineItemsMarkup || "<p style='font-size:14px;color:#6b7280;padding:16px 0;'>No line items saved.</p>"}

            <div class="totals-breakdown">
              <div>Subtotal: $${(subtotal ?? amount).toFixed(2)}</div>
              <div>Tax: $${(tax ?? 0).toFixed(2)}</div>
              <div>Deposit Paid: $${(depositPaid ?? 0).toFixed(2)}</div>
            </div>
            <div class="total">Total: $${(balanceDue ?? amount).toFixed(2)}</div>

            <div class="payment">
              <div class="section-title">Payment Instructions</div>
              <p><strong>Accepted Payment Methods:</strong> ${exportPaymentMethods}</p>
              <p><strong>Due Date:</strong> ${exportDueDate}</p>
              ${footerNote ? `<p style="margin-top:16px;font-size:13px;color:#6b7280;">${footerNote}</p>` : ""}
            </div>
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
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose ? onClose() : onSelect();
                  }}
                  className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500 hover:bg-gray-100"
                >
                  Close
                </button>
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
                <div className="mt-3 space-y-4">
                  {lineItems.length === 0 ? (
                    <p className="text-xs text-gray-500">
                      No line items saved for this document.
                    </p>
                  ) : (
                    lineItems.map((item) => {
                      const itemPhotos = (item.photoIds ?? [])
                        .map((pid) => photos.find((p) => p.id === pid))
                        .filter(Boolean) as JobPhoto[];

                      return (
                        <div key={item.id} className="space-y-2">
                          <div className="flex items-start justify-between gap-3 text-sm">
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
                          {itemPhotos.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {itemPhotos.map((photo) => (
                                <div key={photo.id} className="flex flex-col items-center gap-1">
                                  <img
                                    src={photo.url}
                                    alt={photo.name}
                                    className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                                  />
                                  <span className="text-xs text-gray-400">{photo.category}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
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