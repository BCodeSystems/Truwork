"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import NewJobModal from "@/components/jobs/NewJobModal";
import InvoicePreviewSection from "@/components/jobs/InvoicePreviewSection";
import PhotoSelectorModal from "@/components/jobs/PhotoSelectorModal";
import PhotoPreviewModal from "@/components/jobs/PhotoPreviewModal";
import PhotosSection from "@/components/jobs/PhotosSection";
import JobSummarySection from "@/components/jobs/JobSummarySection";
import { apiFetch } from "@/lib/api";
import { compressImage } from "@/lib/image";
import { openInvoiceWindow } from "@/lib/invoiceExport";

// Page-level job shape used for the backend job detail.

type Job = {
  id: string;
  title: string;
  client: string;
  address: string;
  phone?: string;
  status: string;
  date: string;
};

type RelatedInvoice = {
  id: string;
  documentNumber: string;
  type: string;
  status: string;
  total: number;
  balanceDue: number;
  createdAt: string;
};

type JobPhoto = {
  id: string;
  name: string;
  url: string;
  category: "Before" | "During" | "After";
};


function normalizePhotoCategory(
  category?: string
): "Before" | "During" | "After" {
  if (category === "during") return "During";
  if (category === "after") return "After";
  return "Before";
}

export default function JobDetailsPage() {
  // Route params and page-level UI state.
  const params = useParams<{ id: string }>();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Photo workflow state.
  const [photos, setPhotos] = useState<JobPhoto[]>([]);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
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
      photoIds: string[];
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
  async function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploadingPhoto(true);
      const uploadedPhotos: JobPhoto[] = [];

      for (const original of Array.from(files)) {
        const file = await compressImage(original);
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("category", "before");

        const res = await apiFetch(`/api/jobs/${jobId}/photos`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to upload photo");
        }

        uploadedPhotos.push({
          id: data.id,
          name: data.fileName || file.name,
          url: data.photoUrl,
          category: normalizePhotoCategory(data.category),
        });
      }

      setPhotos((prev) => [...uploadedPhotos, ...prev]);
      e.target.value = "";
    } catch (error) {
      console.error("Upload photo error:", error);
      window.alert("Photo upload failed. Please try again.");
    } finally {
      setIsUploadingPhoto(false);
    }
  }

  async function handlePhotoCategoryChange(
    photoId: string,
    category: "Before" | "During" | "After"
  ) {
    const previousPhotos = photos;

    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === photoId ? { ...photo, category } : photo
      )
    );

    try {
      const res = await apiFetch(`/api/jobs/${jobId}/photos/${photoId}`, {
        method: "PATCH",
        body: JSON.stringify({
          category: category.toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update photo category");
      }
    } catch (error) {
      console.error("Update photo category error:", error);
      setPhotos(previousPhotos);
      window.alert("Photo category update failed. Please try again.");
    }
  }

  async function handlePhotoDelete(photoId: string) {
    const confirmed = window.confirm(
      "Delete this photo? This will remove it from the job and storage."
    );

    if (!confirmed) return;

    try {
      const res = await apiFetch(`/api/jobs/${jobId}/photos/${photoId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete photo");
      }

      setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
      setLineItems((prev) =>
        prev.map((item) => ({
          ...item,
          photoIds: item.photoIds.filter((id) => id !== photoId),
        }))
      );
    } catch (error) {
      console.error("Delete photo error:", error);
      window.alert("Photo delete failed. Please try again.");
    }
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
  function togglePhotoForLineItem(photoId: string) {
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
  function handleExportDocument() {
    if (!job) {
      window.alert("Job details are still loading. Please try again.");
      return;
    }

    const businessName =
      localStorage.getItem("truworkBusinessName") || "Your Business Name";

    openInvoiceWindow(
      {
        title: businessName,
        businessName,
        logoUrl: localStorage.getItem("truworkLogoUrl") || "",
        documentType,
        meta: [
          { label: "Client", value: job.client },
          { label: "Job", value: job.title },
          { label: "Address", value: job.address },
          { label: "Date", value: job.date },
        ],
        lineItems: lineItems.map((item) => ({
          description: item.description,
          quantity: item.quantity || "0",
          lineTotal: (Number(item.quantity) || 0) * (Number(item.amount) || 0),
          photos: item.photoIds
            .map((photoId) => photos.find((photo) => photo.id === photoId))
            .filter((photo): photo is JobPhoto => !!photo),
        })),
        total,
        paymentMethods: selectedPaymentMethodsText,
        dueDate: dueDateText,
        footerNote: localStorage.getItem("truworkFooterNote") || "",
      },
      { autoPrint: true, features: "width=960,height=1200" }
    );
  }

  async function handleShareDocument() {
    if (!job) {
      window.alert("Job details are still loading. Please try again.");
      return;
    }
    const shareText = `Client: ${job.client}\nJob: ${job.title}\nTotal: $${formattedTotal}\nAccepted Payment Methods: ${selectedPaymentMethodsText}\nDue Date: ${dueDateText}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${localStorage.getItem("truworkBusinessName") || "Your Business Name"}`,
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

  // Current job loaded from the backend using the route id.
  const jobId = params.id;
  const [job, setJob] = useState<Job | null>(null);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [jobError, setJobError] = useState("");
  const [relatedInvoices, setRelatedInvoices] = useState<RelatedInvoice[]>([]);
  const invoiceSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoadingJob(true);
        setJobError("");
        const res = await apiFetch(`/api/jobs/${jobId}`);

        const data = await res.json();

        if (!res.ok || !data.success || !data.job) {
          setJob(null);
          setJobError(data.message || "Job not found.");
          return;
        }

        setJob({
          id: data.job.id,
          title: data.job.title,
          client: data.job.customerName,
          address: data.job.serviceAddress,
          phone: data.job.customerPhone ?? "",
          status: data.job.status,
          date: new Date(data.job.scheduledAt).toLocaleString(),
        });
      } catch (error) {
        console.error("Fetch job detail error:", error);
        setJob(null);
        setJobError("Unable to load this job. Please try again.");
      } finally {
        setIsLoadingJob(false);
      }
    };

    fetchJob();
  }, [jobId]);

  useEffect(() => {
    const fetchJobPhotos = async () => {
      try {
        const res = await apiFetch(`/api/jobs/${jobId}/photos`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch photos");
        }

        setPhotos(
          data.map((photo: any) => ({
            id: photo.id,
            name: photo.fileName || "Job photo",
            url: photo.photoUrl,
            category: normalizePhotoCategory(photo.category),
          }))
        );
      } catch (error) {
        console.error("Fetch job photos error:", error);
      }
    };

    fetchJobPhotos();
  }, [jobId]);

  useEffect(() => {
    const fetchRelatedInvoices = async () => {
      try {
        const res = await apiFetch("/api/invoices");

        const data = await res.json();

        if (data.success) {
          const invoicesForJob = data.invoices
            .filter((invoice: any) => invoice.jobId === jobId)
            .map((invoice: any) => ({
              id: invoice.id,
              documentNumber: invoice.documentNumber,
              type: invoice.type,
              status: invoice.status,
              total: Number(invoice.total),
              balanceDue: Number(invoice.balanceDue),
              createdAt: invoice.createdAt,
            }));

          setRelatedInvoices(invoicesForJob);
        }
      } catch (error) {
        console.error("Fetch related invoices error:", error);
      }
    };

    fetchRelatedInvoices();
  }, [jobId]);

  if (isLoadingJob) {
    return <div className="p-6 text-sm text-gray-600">Loading job...</div>;
  }

  if (!job) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-brand-blue">Job not found</h2>
        <p className="mt-2 text-sm text-gray-600">
          {jobError || "This job could not be found."}
        </p>
      </div>
    );
  }

  // Edit modal submission handler.
  function handleUpdateJob(updatedJob: {
    id: string;
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
        job={{ ...job, phone: job.phone ?? "" }}
        jobId={jobId}
        onEdit={() => setIsEditOpen(true)}
      />

      {/* Photos section: upload, categorize, and browse job photos. */}
      <PhotosSection
        photos={photos}
        handlePhotoUpload={handlePhotoUpload}
        handlePhotoCategoryChange={handlePhotoCategoryChange}
        handlePhotoDelete={handlePhotoDelete}
        openPhotoPreview={openPhotoPreview}
        isUploadingPhoto={isUploadingPhoto}
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
        <h3 className="text-lg font-semibold text-brand-blue">
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

            setTimeout(() => {
              invoiceSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100);
          }}
          className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Create Invoice
        </button>
      </div>

      {/* Invoice / estimate preview section: line items, totals, payment instructions, finalize, export, and share. */}
      {showInvoicePreview ? (
        <div ref={invoiceSectionRef} className="scroll-mt-24">
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
        </div>
      ) : null}

      {/* Related invoices section: quick view of invoices already created for this job. */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-brand-blue">
              Related Invoices
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Invoices and estimates already created for this job.
            </p>
          </div>
        </div>

        {relatedInvoices.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
            No invoices created for this job yet.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {relatedInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-brand-blue">
                    {invoice.documentNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    {invoice.type} • {invoice.status} • {new Date(invoice.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="font-semibold text-brand-blue">
                    ${invoice.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Balance: ${invoice.balanceDue.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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