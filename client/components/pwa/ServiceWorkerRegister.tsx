"use client";

import { useEffect } from "react";
import { listenForInstallPrompt } from "@/lib/pwa";

export default function ServiceWorkerRegister() {
  useEffect(() => listenForInstallPrompt(), []);

  useEffect(() => {
    // Skipped in dev so cached assets never mask code changes.
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    // When a new worker takes over, reload so the page runs the new code.
    // Skipped on the very first install, when there was no previous worker.
    const hadController = !!navigator.serviceWorker.controller;
    let reloading = false;
    const onControllerChange = () => {
      if (!hadController || reloading) return;
      reloading = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    let registration: ServiceWorkerRegistration | undefined;
    // Home-screen apps on iOS resume from memory instead of reloading, so
    // check for a new deploy whenever the app comes back to the foreground.
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        registration?.update().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((reg) => {
        registration = reg;
      })
      .catch((error) => console.error("Service worker registration failed:", error));

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return null;
}
