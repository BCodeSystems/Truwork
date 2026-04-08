import React from "react";
type InvoicePreviewSectionProps = {
    job: {
      client: string;
      title: string;
      address: string;
      date: string;
    };
    documentType: "INVOICE" | "ESTIMATE";
    setDocumentType: React.Dispatch<React.SetStateAction<"INVOICE" | "ESTIMATE">>;
    lineItems: {
      description: string;
      quantity: string;
      amount: string;
      photoIds: number[];
    }[];
    setLineItems: React.Dispatch<
      React.SetStateAction<
        {
          description: string;
          quantity: string;
          amount: string;
          photoIds: number[];
        }[]
      >
    >;
    formattedTotal: string;
    paymentMethods: string[];
    setPaymentMethods: React.Dispatch<React.SetStateAction<string[]>>;
    dueDate: string;
    setDueDate: React.Dispatch<React.SetStateAction<string>>;
    isDocumentFinalized: boolean;
    setIsDocumentFinalized: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedLineItemIndex: React.Dispatch<React.SetStateAction<number | null>>;
    photos: {
      id: number;
      name: string;
      url: string;
      category: "Before" | "During" | "After";
    }[];
    handleExportDocument: () => void;
    handleShareDocument: () => void;
    openPhotoPreview: (index: number) => void;
  };
export default function InvoicePreviewSection({
  job,
  documentType,
  setDocumentType,
  lineItems,
  setLineItems,
  formattedTotal,
  paymentMethods,
  setPaymentMethods,
  dueDate,
  setDueDate,
  isDocumentFinalized,
  setIsDocumentFinalized,
  setSelectedLineItemIndex,
  photos,
  handleExportDocument,
  handleShareDocument,
  openPhotoPreview,
}: InvoicePreviewSectionProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b-2 border-brand-red pb-6 mb-6">
        {/* left */}
        <p className="font-semibold text-2xl text-brand-blue">
          Your Business Name / Logo
        </p>
        {/* right */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDocumentType("INVOICE")}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              documentType === "INVOICE"
                ? "border-brand-red bg-brand-red text-white"
                : "border-gray-300 text-gray-700 hover:border-brand-red hover:text-brand-red"
            }`}
          >
            Invoice
          </button>
          <button
            type="button"
            onClick={() => setDocumentType("ESTIMATE")}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              documentType === "ESTIMATE"
                ? "border-brand-red bg-brand-red text-white"
                : "border-gray-300 text-gray-700 hover:border-brand-red hover:text-brand-red"
            }`}
          >
            Estimate
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <p className="font-bold text-3xl text-brand-blue">{documentType}</p>
      </div>
      <p>
        <span className="font-medium text-brand-blue">Client:</span>{" "}
        {job.client}
      </p>
      <p>
        <span className="font-medium text-brand-blue">Job:</span>{" "}
        {job.title}
      </p>
      <p>
        <span className="font-medium text-brand-blue">Address:</span>{" "}
        {job.address}
      </p>
      <p>
        <span className="font-medium text-brand-blue">Date:</span>{" "}
        {job.date}
      </p>
      <section className="py-6">
        <h3 className="text-lg font-semibold text-brand-blue">
          Line Items
        </h3>
        <div className="grid grid-cols-3 border-b border-gray-300 py-4 text-sm font-medium text-brand-blue">
          <p>Description</p>
          <p>Quantity</p>
          <p>Amount</p>
        </div>
        {lineItems.map((item, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Line Item {index + 1}
              </span>

              {lineItems.length > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setLineItems((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <input
                value={item.description}
                placeholder="Description"
                onChange={(e) => {
                  const updated = [...lineItems];
                  updated[index] = {
                    ...item,
                    description: e.target.value,
                  };
                  setLineItems(updated);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                value={item.quantity}
                placeholder="Quantity"
                onChange={(e) => {
                  const updated = [...lineItems];
                  updated[index] = {
                    ...item,
                    quantity: e.target.value,
                  };
                  setLineItems(updated);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                value={item.amount}
                placeholder="Amount"
                onChange={(e) => {
                  const updated = [...lineItems];
                  updated[index] = {
                    ...item,
                    amount: e.target.value,
                  };
                  setLineItems(updated);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => setSelectedLineItemIndex(index)}
              className="mt-3 inline-flex items-center justify-center rounded-lg border border-brand-red px-3 py-2 text-sm font-medium text-brand-red transition hover:bg-brand-red hover:text-white"
            >
              Select Photos
            </button>

            {item.photoIds.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.photoIds.map((photoId) => {
                  const selectedPhoto = photos.find((photo) => photo.id === photoId);
                  if (!selectedPhoto) return null;

                  return (
                    <button
                      key={photoId}
                      type="button"
                      onClick={() =>
                        openPhotoPreview(
                          photos.findIndex((photo) => photo.id === photoId)
                        )
                      }
                      className="overflow-hidden rounded-lg border border-gray-200"
                    >
                      <img
                        src={selectedPhoto.url}
                        alt={selectedPhoto.name}
                        className="h-16 w-16 object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setLineItems([
              ...lineItems,
              { description: "", quantity: "", amount: "", photoIds: [] },
            ])
          }
          className="mt-4 rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Add Line Item
        </button>

        <div className="mt-6 flex justify-end border-t border-gray-300 pt-4">
          <p className="text-lg font-semibold text-brand-blue">
            Total: ${formattedTotal}
          </p>
        </div>
      </section>

      <section className="pt-6">
        <h3 className="text-lg font-semibold text-brand-blue">
          Payment Instructions
        </h3>

        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Accepted Payment Methods
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Venmo",
                "Cash App",
                "Stripe",
                "Cash",
                "Check",
                "Zelle",
              ].map((method) => {
                const isSelected = paymentMethods.includes(method);

                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      setPaymentMethods((prev) =>
                        prev.includes(method)
                          ? prev.filter((item) => item !== method)
                          : [...prev, method]
                      );
                    }}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      isSelected
                        ? "border-brand-red bg-brand-red text-white"
                        : "border-gray-300 text-gray-700 hover:border-brand-red hover:text-brand-red"
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Due Upon Receipt",
                "Due on Completion",
                "Net 7",
                "Net 14",
              ].map((option) => {
                const isSelected = dueDate === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDueDate(option)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      isSelected
                        ? "border-brand-red bg-brand-red text-white"
                        : "border-gray-300 text-gray-700 hover:border-brand-red hover:text-brand-red"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="pt-6">
        <div className="flex flex-col gap-3 border-t border-gray-300 pt-6 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => setIsDocumentFinalized(true)}
            disabled={isDocumentFinalized}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              isDocumentFinalized
                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                : "bg-brand-red text-white hover:opacity-90"
            }`}
          >
            {isDocumentFinalized
              ? `${documentType} Finalized`
              : `Finalize ${documentType}`}
          </button>

          <button
            type="button"
            onClick={handleExportDocument}
            disabled={!isDocumentFinalized}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              isDocumentFinalized
                ? "border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
                : "cursor-not-allowed border-gray-200 text-gray-400"
            }`}
          >
            Export PDF
          </button>

          <button
            type="button"
            onClick={handleShareDocument}
            disabled={!isDocumentFinalized}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              isDocumentFinalized
                ? "border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
                : "cursor-not-allowed border-gray-200 text-gray-400"
            }`}
          >
            Send / Share
          </button>
        </div>
      </section>
    </div>
  );
}