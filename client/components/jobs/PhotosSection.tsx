import React from "react";

type PhotosSectionProps = {
  photos: {
    id: number;
    name: string;
    url: string;
    category: "Before" | "During" | "After";
  }[];
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhotoCategoryChange: (
    photoId: number,
    category: "Before" | "During" | "After"
  ) => void;
  openPhotoPreview: (index: number) => void;
};

export default function PhotosSection({
  photos,
  handlePhotoUpload,
  handlePhotoCategoryChange,
  openPhotoPreview,
}: PhotosSectionProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-brand-blue">Photos</h3>
          <p className="mt-1 text-sm text-gray-600">
            Upload before, during, and after photos for this job.
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          + Add Photo
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </div>

      {photos.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
          No photos added yet.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <button
                type="button"
                onClick={() => openPhotoPreview(index)}
                className="block w-full"
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="h-48 w-full object-cover"
                />
              </button>
              <div className="space-y-2 p-3">
                <select
                  value={photo.category}
                  onChange={(e) =>
                    handlePhotoCategoryChange(
                      photo.id,
                      e.target.value as "Before" | "During" | "After"
                    )
                  }
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 focus:border-[#0B1F3B] focus:outline-none"
                >
                  <option value="Before">Before</option>
                  <option value="During">During</option>
                  <option value="After">After</option>
                </select>
                <p className="truncate text-sm text-gray-600">{photo.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}