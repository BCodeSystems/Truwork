"use client";

import { Download, Share } from "lucide-react";
import { promptInstall, useInstallState } from "@/lib/pwa";

export default function InstallAppCard() {
  const state = useInstallState();

  if (state === "installed" || state === "unavailable") return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-brand-blue">Install TruWork</p>
      {state === "prompt" ? (
        <>
          <p className="mt-1 text-sm text-gray-600">
            Add TruWork to your home screen for one-tap access and offline job details.
          </p>
          <button
            type="button"
            onClick={() => promptInstall()}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <Download size={16} />
            Install App
          </button>
        </>
      ) : (
        <p className="mt-1 text-sm text-gray-600">
          In Safari, tap <Share size={14} className="inline align-text-bottom" /> Share,
          then <span className="font-medium">Add to Home Screen</span>.
        </p>
      )}
    </div>
  );
}
