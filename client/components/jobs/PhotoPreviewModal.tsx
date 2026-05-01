import React from "react";

type PhotoPreviewModalProps = {
  selectedPhotoIndex: number | null;
  photos: {
    id: string;
    name: string;
    url: string;
    category: "Before" | "During" | "After";
  }[];
  closePhotoPreview: () => void;
  changePreviewPhoto: (direction: "prev" | "next") => void;
  handlePhotoCategoryChange: (
    photoId: string,
    category: "Before" | "During" | "After"
  ) => void;
};

export default function PhotoPreviewModal({
  selectedPhotoIndex,
  photos,
  closePhotoPreview,
  changePreviewPhoto,
  handlePhotoCategoryChange,
}: PhotoPreviewModalProps) {
  if (selectedPhotoIndex === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="relative w-full max-w-5xl">
        <button
          type="button"
          onClick={closePhotoPreview}
          className="absolute right-0 top-0 z-10 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-gray-700 shadow hover:bg-white"
        >
          Close
        </button>

        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          <img
            src={photos[selectedPhotoIndex].url}
            alt={photos[selectedPhotoIndex].name}
            className="max-h-[75vh] w-full object-contain bg-black"
          />

          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-brand-blue">
                {photos[selectedPhotoIndex].name}
              </p>

              <select
                value={photos[selectedPhotoIndex].category}
                onChange={(e) =>
                  handlePhotoCategoryChange(
                    photos[selectedPhotoIndex].id,
                    e.target.value as "Before" | "During" | "After"
                  )
                }
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 focus:border-[#0B1F3B] focus:outline-none"
              >
                <option value="Before">Before</option>
                <option value="During">During</option>
                <option value="After">After</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changePreviewPhoto("prev")}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={() => changePreviewPhoto("next")}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}