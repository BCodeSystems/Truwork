export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

// localStorage keys owned by the signed-in user. Cleared on logout.
const USER_STORAGE_KEYS = [
  "token",
  "truworkBusinessName",
  "truworkLogoUrl",
  "truworkFooterNote",
];

// Must match the API cache name in public/sw.js.
const API_CACHE_NAME = "truwork-api-v1";

export function getToken() {
  return localStorage.getItem("token");
}

// Reads the exp claim without verifying the signature; the server still
// verifies every request. This only avoids rendering the app with a token
// we already know is dead.
export function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return typeof payload.exp === "number" && payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export function hasValidToken() {
  const token = getToken();
  return !!token && !isTokenExpired(token);
}

export async function logout(reason?: "expired") {
  USER_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));

  // Drop cached API responses so the next person on this device can't see them offline.
  if ("caches" in window) {
    await caches.delete(API_CACHE_NAME).catch(() => {});
  }

  window.location.replace(reason ? `/login?reason=${reason}` : "/login");
}

// fetch() against the TruWork API with the auth header attached.
// A 401 on an authenticated request means the session is gone, so log out.
export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(init.headers);

  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (typeof init.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });

  if (res.status === 401 && token) {
    await logout("expired");
  }

  return res;
}
