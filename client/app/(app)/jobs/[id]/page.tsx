"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import NewJobModal from "@/components/jobs/NewJobModal";
import InvoicePreviewSection from "@/components/jobs/InvoicePreviewSection";
import PhotoSelectorModal from "@/components/jobs/PhotoSelectorModal";
import PhotoPreviewModal from "@/components/jobs/PhotoPreviewModal";
import PhotosSection from "@/components/jobs/PhotosSection";
import JobSummarySection from "@/components/jobs/JobSummarySection";

// Temporary demo data for V1 until jobs come from a database or API.
const jobs = [
  {
    id: 1,
    title: "Kitchen Sink Repair",
    client: "Sarah Johnson",
    address: "123 Main St, San Diego, CA",
    phone: "(619) 555-1234",
    status: "Scheduled",
    date: "Today • 10:00 AM",
  },
  {
    id: 2,
    title: "Weekly Lawn Maintenance",
    client: "Mike Rodriguez",
    address: "456 Oak Ave, Chula Vista, CA",
    phone: "(619) 555-5678",
    status: "In Progress",
    date: "Today • 1:30 PM",
  },
  {
    id: 3,
    title: "Garage Cleanout",
    client: "Tom Chen",
    address: "789 Pine Rd, Oceanside, CA",
    phone: "(619) 555-9999",
    status: "Completed",
    date: "Yesterday • 4:00 PM",
  },
];

// Page-level job shape used for the current mock job lookup.
type Job = {
  id: number;
  title: string;
  client: string;
  address: string;
  phone: string;
  status: string;
  date: string;
};

export default function JobDetailsPage() {
  // Route params and page-level UI state.
  const params = useParams<{ id: string }>();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Photo workflow state.
  const [photos, setPhotos] = useState<
    {
      id: number;
      name: string;
      url: string;
      category: "Before" | "During" | "After";
    }[]
  >([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  // Invoice / estimate builder state.
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [lineItems, setLineItems] = useState<
    {
      description: string;
      quantity: string;
      amount: string;
      photoIds: number[];
    }[]
  >([{ description: "", quantity: "", amount: "", photoIds: [] }]);
  const total = lineItems.reduce((total, item) => {
    const quantity = Number(item.quantity) || 0;
    const amount = Number(item.amount) || 0;
    return total + quantity * amount;
  }, 0);
  const formattedTotal = total.toFixed(2);
  const [selectedLineItemIndex, setSelectedLineItemIndex] = useState<
    number | null
  >(null);

  // Payment instructions state.
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [documentType, setDocumentType] = useState<"INVOICE" | "ESTIMATE">(
    "INVOICE"
  );
  const [isDocumentFinalized, setIsDocumentFinalized] = useState(false);
  const selectedPaymentMethodsText =
    paymentMethods.length > 0 ? paymentMethods.join(", ") : "Not specified";
  const dueDateText = dueDate || "Not specified";

  // Photo management handlers.
  function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newPhotos = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      url: URL.createObjectURL(file),
      category: "Before" as const,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  }

  function handlePhotoCategoryChange(
    photoId: number,
    category: "Before" | "During" | "After"
  ) {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === photoId ? { ...photo, category } : photo
      )
    );
  }

  // Photo preview modal handlers.
  function openPhotoPreview(index: number) {
    setSelectedPhotoIndex(index);
  }
  function closePhotoPreview() {
    setSelectedPhotoIndex(null);
  }
  function changePreviewPhoto(direction: "prev" | "next") {
    setSelectedPhotoIndex((prev) => {
      if (prev === null || photos.length === 0) return prev;
      if (direction === "prev") {
        return prev === 0 ? photos.length - 1 : prev - 1;
      }
      return prev === photos.length - 1 ? 0 : prev + 1;
    });
  }

  // Line item photo-selection handlers.
  function togglePhotoForLineItem(photoId: number) {
    if (selectedLineItemIndex === null) return;

    setLineItems((prev) =>
      prev.map((item, index) => {
        if (index !== selectedLineItemIndex) return item;

        const isSelected = item.photoIds.includes(photoId);

        return {
          ...item,
          photoIds: isSelected
            ? item.photoIds.filter((id) => id !== photoId)
            : [...item.photoIds, photoId],
        };
      })
    );
  }

  function closeLineItemPhotoSelector() {
    setSelectedLineItemIndex(null);
  }

  // Export and share helpers for the invoice / estimate.
  function escapeHtml(value: string) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function handleExportDocument() {
    const lineItemsMarkup = lineItems
      .map((item) => {
        const lineTotal =
          (Number(item.quantity) || 0) * (Number(item.amount) || 0);

        const selectedPhotosMarkup = item.photoIds
          .map((photoId) => photos.find((photo) => photo.id === photoId))
          .filter(Boolean)
          .map(
            (photo) => `
              <div style="display: inline-block; margin-right: 8px; margin-top: 8px; text-align: center;">
                <img
                  src="${photo!.url}"
                  alt="${escapeHtml(photo!.name)}"
                  style="width: 88px; height: 88px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb; display: block;"
                />
                <div style="margin-top: 4px; font-size: 11px; color: #6b7280;">${escapeHtml(
                  photo!.category
                )}</div>
              </div>
            `
          )
          .join("");

        return `
          <div style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 12px; font-size: 14px; color: #111827;">
              <div>${escapeHtml(item.description || "—")}</div>
              <div>${escapeHtml(item.quantity || "0")}</div>
              <div>$${lineTotal.toFixed(2)}</div>
            </div>
            ${
              selectedPhotosMarkup
                ? `<div style="margin-top: 8px;">${selectedPhotosMarkup}</div>`
                : ""
            }
          </div>
        `;
      })
      .join("");

    const exportWindow = window.open("", "_blank", "width=960,height=1200");
    if (!exportWindow) return;

    const exportHtml = `
      <!doctype html>
      <html>
        <head>
          <title>Your Business Name / Logo</title>
          <meta charset="utf-8" />
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 32px;
              color: #111827;
              background: #ffffff;
            }
            .document {
              max-width: 900px;
              margin: 0 auto;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 2px solid #c62828;
              padding-bottom: 24px;
              margin-bottom: 24px;
            }
            .brand {
              font-size: 30px;
              font-weight: 600;
              color: #0b1f3b;
            }
            .doc-type {
              font-size: 36px;
              font-weight: 700;
              color: #0b1f3b;
              text-align: right;
            }
            .meta {
              margin-bottom: 24px;
              line-height: 1.8;
              font-size: 14px;
            }
            .section-title {
              font-size: 20px;
              font-weight: 600;
              color: #0b1f3b;
              margin: 24px 0 12px;
            }
            .line-items-header {
              display: grid;
              grid-template-columns: 2fr 1fr 1fr;
              gap: 12px;
              padding: 12px 0;
              border-bottom: 1px solid #d1d5db;
              font-size: 12px;
              font-weight: 600;
              color: #0b1f3b;
              text-transform: uppercase;
              letter-spacing: 0.04em;
            }
            .total {
              margin-top: 20px;
              padding-top: 16px;
              border-top: 1px solid #d1d5db;
              text-align: right;
              font-size: 22px;
              font-weight: 700;
              color: #0b1f3b;
            }
            .payment {
              margin-top: 28px;
              padding-top: 20px;
              border-top: 1px solid #d1d5db;
            }
            .payment p {
              margin: 8px 0;
              font-size: 14px;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="document">
            <div class="header">
              <div class="brand">Your Business Name / Logo</div>
              <div class="doc-type">${documentType}</div>
            </div>

            <div class="meta">
              <div><strong>Client:</strong> ${escapeHtml(job.client)}</div>
              <div><strong>Job:</strong> ${escapeHtml(job.title)}</div>
              <div><strong>Address:</strong> ${escapeHtml(job.address)}</div>
              <div><strong>Date:</strong> ${escapeHtml(job.date)}</div>
            </div>

            <div class="section-title">Line Items</div>
            <div class="line-items-header">
              <div>Description</div>
              <div>Quantity</div>
              <div>Amount</div>
            </div>
            ${lineItemsMarkup}

            <div class="total">Total: $${formattedTotal}</div>

            <div class="payment">
              <div class="section-title">Payment Instructions</div>
              <p><strong>Accepted Payment Methods:</strong> ${escapeHtml(
                selectedPaymentMethodsText
              )}</p>
              <p><strong>Due Date:</strong> ${escapeHtml(dueDateText)}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    exportWindow.document.open();
    exportWindow.document.write(exportHtml);
    exportWindow.document.close();
    exportWindow.focus();

    const triggerPrint = () => {
      exportWindow.print();
    };

    exportWindow.onload = triggerPrint;
    setTimeout(triggerPrint, 500);
  }

  async function handleShareDocument() {
    const shareText = `Client: ${job.client}\nJob: ${job.title}\nTotal: $${formattedTotal}\nAccepted Payment Methods: ${selectedPaymentMethodsText}\nDue Date: ${dueDateText}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Your Business Name / Logo`,
          text: `${documentType} for ${job.client}\n\n${shareText}`,
        });
        return;
      } catch {
        // Fall through to clipboard fallback.
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      window.alert(`${documentType} details copied to clipboard.`);
    } catch {
      window.alert("Sharing is not available in this browser.");
    }
  }

  // Current job lookup derived from the route.
  const jobId = Number(params.id);
  const initialJob = useMemo(
    () => jobs.find((j) => j.id === jobId) || null,
    [jobId]
  );
  const [job, setJob] = useState<Job | null>(initialJob);

  useEffect(() => {
    setJob(initialJob);
  }, [initialJob]);

  if (!job) {
    return <div className="p-6">Job not found</div>;
  }

  // Edit modal submission handler.
  function handleUpdateJob(updatedJob: {
    id: number;
    title: string;
    client: string;
    address: string;
    date: string;
    status: string;
  }) {
    setJob((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...updatedJob,
        phone: prev.phone,
      };
    });
  }

  return (
    <section className="space-y-6">
      {/* Job summary section: header, status, client info, and job details. */}
      <JobSummarySection
        job={job}
        jobId={jobId}
        onEdit={() => setIsEditOpen(true)}
      />

      {/* Photos section: upload, categorize, and browse job photos. */}
      <PhotosSection
        photos={photos}
        handlePhotoUpload={handlePhotoUpload}
        handlePhotoCategoryChange={handlePhotoCategoryChange}
        openPhotoPreview={openPhotoPreview}
      />

      {/* Photo preview modal: enlarged image view with navigation and category editing. */}
      <PhotoPreviewModal
        selectedPhotoIndex={selectedPhotoIndex}
        photos={photos}
        closePhotoPreview={closePhotoPreview}
        changePreviewPhoto={changePreviewPhoto}
        handlePhotoCategoryChange={handlePhotoCategoryChange}
      />

      {/* Document creation entry point: starts the invoice / estimate workflow. */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-[#0B1F3B]">
          Create Invoice or Estimate
        </h3>
        <p className="mt-1 py-4 text-sm text-gray-600">
          Generate and send a professional invoice for this job.
        </p>
        <button
          type="button"
          onClick={() => {
            setShowInvoicePreview(true);
            setIsDocumentFinalized(false);
          }}
          className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Create Invoice
        </button>
      </div>

      {/* Invoice / estimate preview section: line items, totals, payment instructions, finalize, export, and share. */}
      {showInvoicePreview ? (
        <InvoicePreviewSection
          job={job}
          documentType={documentType}
          setDocumentType={setDocumentType}
          lineItems={lineItems}
          setLineItems={setLineItems}
          formattedTotal={formattedTotal}
          paymentMethods={paymentMethods}
          setPaymentMethods={setPaymentMethods}
          dueDate={dueDate}
          setDueDate={setDueDate}
          isDocumentFinalized={isDocumentFinalized}
          setIsDocumentFinalized={setIsDocumentFinalized}
          setSelectedLineItemIndex={setSelectedLineItemIndex}
          photos={photos}
          handleExportDocument={handleExportDocument}
          handleShareDocument={handleShareDocument}
          openPhotoPreview={openPhotoPreview}
        />
      ) : null}

      {/* Photo selector modal: attaches uploaded photos to a specific line item. */}
      <PhotoSelectorModal
        selectedLineItemIndex={selectedLineItemIndex}
        lineItems={lineItems}
        photos={photos}
        togglePhotoForLineItem={togglePhotoForLineItem}
        closeLineItemPhotoSelector={closeLineItemPhotoSelector}
      />

      {/* Edit job modal: updates the current job details. */}
      <NewJobModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdateJob}
        initialJob={job}
      />
    </section>
  );
}