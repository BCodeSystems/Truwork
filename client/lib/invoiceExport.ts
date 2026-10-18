import { escapeHtml, safeUrl } from "@/lib/html";

type ExportPhoto = {
  url: string;
  name: string;
  category: string;
};

export type InvoiceExportData = {
  title: string;
  businessName: string;
  logoUrl?: string;
  documentType: string;
  meta: { label: string; value: string }[];
  lineItems: {
    description: string;
    quantity: string | number;
    lineTotal: number;
    photos: ExportPhoto[];
  }[];
  breakdown?: { label: string; amount: number }[];
  total: number;
  paymentMethods: string;
  dueDate: string;
  footerNote?: string;
};

// Every value interpolated below comes from user input or the API, so it
// must go through escapeHtml / safeUrl. The document is written into a
// same-origin window that can read localStorage.
export function buildInvoiceHtml(data: InvoiceExportData) {
  const lineItemsMarkup = data.lineItems
    .map((item) => {
      const photosMarkup = item.photos
        .map(
          (photo) => `
              <div style="display:inline-block;margin-right:8px;margin-top:8px;text-align:center;">
                <img src="${safeUrl(photo.url)}" alt="${escapeHtml(photo.name)}" style="width:88px;height:88px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb;display:block;" />
                <div style="margin-top:4px;font-size:11px;color:#6b7280;">${escapeHtml(photo.category)}</div>
              </div>`
        )
        .join("");

      return `
          <div style="padding:16px 0;border-bottom:1px solid #e5e7eb;">
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px;font-size:14px;color:#111827;">
              <div>${escapeHtml(item.description || "—")}</div>
              <div>${escapeHtml(item.quantity)}</div>
              <div>$${item.lineTotal.toFixed(2)}</div>
            </div>
            ${photosMarkup ? `<div style="margin-top:8px;">${photosMarkup}</div>` : ""}
          </div>`;
    })
    .join("");

  const logoSrc = safeUrl(data.logoUrl);

  return `<!doctype html>
      <html>
        <head>
          <title>${escapeHtml(data.title)}</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            .toolbar button { padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; }
            @media print { body { padding: 0; } .toolbar { display: none; } }
          </style>
        </head>
        <body>
          <div class="document">
            <div class="toolbar" style="margin-bottom:16px;">
              <button onclick="window.print()" style="background:#0b1f3b;color:white;">Print / Save PDF</button>
              <button onclick="window.close()" style="background:#e5e7eb;color:#111827;margin-left:8px;">Close</button>
            </div>
            <div class="header">
              <div style="display:flex;align-items:center;gap:12px;">
                ${logoSrc ? `<img src="${logoSrc}" alt="" style="height:60px;width:auto;border-radius:8px;object-fit:contain;max-width:120px;" />` : ""}
                <div class="brand">${escapeHtml(data.businessName)}</div>
              </div>
              <div class="doc-type">${escapeHtml(data.documentType)}</div>
            </div>

            <div class="meta">
              ${data.meta
                .map(
                  (row) =>
                    `<div><strong>${escapeHtml(row.label)}:</strong> ${escapeHtml(row.value)}</div>`
                )
                .join("")}
            </div>

            <div class="section-title">Line Items</div>
            <div class="line-items-header">
              <div>Description</div>
              <div>Quantity</div>
              <div>Amount</div>
            </div>
            ${lineItemsMarkup || "<p style='font-size:14px;color:#6b7280;padding:16px 0;'>No line items saved.</p>"}

            ${
              data.breakdown
                ? `<div class="totals-breakdown">${data.breakdown
                    .map((row) => `<div>${escapeHtml(row.label)}: $${row.amount.toFixed(2)}</div>`)
                    .join("")}</div>`
                : ""
            }
            <div class="total">Total: $${data.total.toFixed(2)}</div>

            <div class="payment">
              <div class="section-title">Payment Instructions</div>
              <p><strong>Accepted Payment Methods:</strong> ${escapeHtml(data.paymentMethods)}</p>
              <p><strong>Due Date:</strong> ${escapeHtml(data.dueDate)}</p>
              ${data.footerNote ? `<p style="margin-top:16px;font-size:13px;color:#6b7280;">${escapeHtml(data.footerNote)}</p>` : ""}
            </div>
          </div>
        </body>
      </html>`;
}

export function openInvoiceWindow(
  data: InvoiceExportData,
  options: { autoPrint?: boolean; features?: string } = {}
) {
  const exportWindow = window.open("", "_blank", options.features);
  if (!exportWindow) return false;

  exportWindow.document.open();
  exportWindow.document.write(buildInvoiceHtml(data));
  exportWindow.document.close();
  exportWindow.focus();

  if (options.autoPrint) {
    exportWindow.onload = () => exportWindow.print();
  }

  return true;
}
