export function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Only allow http(s) URLs into src attributes, so a stored value like
// "javascript:..." can't end up executable in an exported document.
export function safeUrl(value: string | null | undefined) {
  if (!value) return "";
  try {
    const url = new URL(value, window.location.origin);
    return url.protocol === "http:" || url.protocol === "https:"
      ? escapeHtml(url.href)
      : "";
  } catch {
    return "";
  }
}
