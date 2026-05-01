import React from "react";
type PhotoSelectorModalProps = {
  selectedLineItemIndex: number | null;
  lineItems: {
    description: string;
    quantity: string;
    amount: string;
    photoIds: string[];
  }[];
  photos: {
    id: string;
    name: string;
    url: string;
    category: "Before" | "During" | "After";
  }[];
  togglePhotoForLineItem: (photoId: string) => void;
  closeLineItemPhotoSelector: () => void;
};

export default function PhotoSelectorModal({
    selectedLineItemIndex,
    lineItems,
    photos,
    togglePhotoForLineItem,
    closeLineItemPhotoSelector,
  }: PhotoSelectorModalProps) {
    if (selectedLineItemIndex === null) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
        <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <p className="text-lg font-semibold text-brand-blue">
              Select Photos for This Line Item
            </p>
  
            <button
              type="button"
              onClick={closeLineItemPhotoSelector}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Done
            </button>
          </div>
  
          {photos.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-500">
              No uploaded photos available.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => {
                const isSelected =
                  selectedLineItemIndex !== null &&
                  lineItems[selectedLineItemIndex]?.photoIds.includes(photo.id);
  
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => togglePhotoForLineItem(photo.id)}
                    className={`overflow-hidden rounded-xl border text-left transition ${
                      isSelected
                        ? "border-brand-red ring-2 ring-brand-red"
                        : "border-gray-200 hover:border-brand-red"
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="h-40 w-full object-cover"
                    />
  
                    <div className="space-y-2 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {photo.category}
                        </span>
  
                        {isSelected ? (
                          <span className="text-xs font-semibold text-brand-red">
                            Selected
                          </span>
                        ) : null}
                      </div>
  
                      <p className="truncate text-sm text-gray-600">
                        {photo.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }