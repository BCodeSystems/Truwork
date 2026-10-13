"use client";

import { useSyncExternalStore } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

// Chrome fires beforeinstallprompt once, early in the page load, so it is
// captured globally by ServiceWorkerRegister and held here until a button
// asks for it.
let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function listenForInstallPrompt() {
  const onPrompt = (event: Event) => {
    event.preventDefault();
    deferredPrompt = event as BeforeInstallPromptEvent;
    notify();
  };
  const onInstalled = () => {
    deferredPrompt = null;
    notify();
  };

  window.addEventListener("beforeinstallprompt", onPrompt);
  window.addEventListener("appinstalled", onInstalled);
  return () => {
    window.removeEventListener("beforeinstallprompt", onPrompt);
    window.removeEventListener("appinstalled", onInstalled);
  };
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function isIos() {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    // iPadOS reports itself as Mac
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export type InstallState = "unavailable" | "installed" | "prompt" | "ios";

function getInstallState(): InstallState {
  if (isStandalone()) return "installed";
  if (deferredPrompt) return "prompt";
  if (isIos()) return "ios";
  return "unavailable";
}

export function useInstallState() {
  return useSyncExternalStore(subscribe, getInstallState, () => "unavailable");
}

export async function promptInstall() {
  if (!deferredPrompt) return false;
  const promptEvent = deferredPrompt;
  deferredPrompt = null;
  await promptEvent.prompt();
  const { outcome } = await promptEvent.userChoice;
  notify();
  return outcome === "accepted";
}
