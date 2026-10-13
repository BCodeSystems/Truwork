"use client";

import { useEffect } from "react";
import { listenForInstallPrompt } from "@/lib/pwa";

export default function ServiceWorkerRegister() {
  useEffect(() => listenForInstallPrompt(), []);

  useEffect(() => {
    // Skipped in dev so cached assets never mask code changes.
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch((error) => console.error("Service worker registration failed:", error));
  }, []);

  return null;
}
