"use client";

import { useEffect, useRef, useState } from "react";
import BackButton from "@/components/ui/BackButton";
import Image from "next/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

export default function AccountSettingsPage() {
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    invoiceFooterNote: "",
  });
  const [logoUrl, setLogoUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.profile) {
          const p = data.profile;
          setForm({
            businessName: p.businessName || "",
            contactName: p.contactName || "",
            phone: p.phone || "",
            email: p.email || "",
            address: p.address || "",
            invoiceFooterNote: p.invoiceFooterNote || "",
          });
          if (p.logoUrl) {
            setLogoUrl(p.logoUrl);
            localStorage.setItem("truworkLogoUrl", p.logoUrl);
          }
          if (p.businessName) {
            localStorage.setItem("truworkBusinessName", p.businessName);
          }
          if (p.invoiceFooterNote) {
            localStorage.setItem("truworkFooterNote", p.invoiceFooterNote);
          }
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    fetchProfile();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveError("");
    setSaveSuccess(false);
    setIsSaving(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSaveError(data.message || "Failed to save. Please try again.");
        return;
      }

      localStorage.setItem("truworkBusinessName", form.businessName);
      localStorage.setItem("truworkFooterNote", form.invoiceFooterNote);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("logo", file);

      const res = await fetch(`${API_BASE_URL}/api/profile/logo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSaveError("Failed to upload logo. Please try again.");
        return;
      }

      setLogoUrl(data.logoUrl);
      localStorage.setItem("truworkLogoUrl", data.logoUrl);
    } catch {
      setSaveError("Failed to upload logo. Please try again.");
    } finally {
      setIsUploadingLogo(false);
    }
  }

  return (
    <section className="space-y-4">
      <BackButton label="Back to Menu" />
      <div>
        <h2 className="text-2xl font-bold text-brand-blue">Account Settings</h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage the business details that appear on invoices and customer-facing documents.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <form onSubmit={handleSave} className="space-y-5">

            {/* Logo */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Business Logo
              </label>
              <div className="mt-2 flex items-center gap-4">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt="Business logo"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">
                    No logo
                  </div>
                )}
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingLogo}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isUploadingLogo ? "Uploading..." : logoUrl ? "Change Logo" : "Upload Logo"}
                  </button>
                  <p className="mt-1 text-xs text-gray-400">JPEG, PNG, or WEBP · Max 5MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="TruWork Plumbing"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            {/* Contact Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">Contact Name</label>
              <input
                type="text"
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                placeholder="Mike Johnson"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(619) 555-1234"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="mike@truwork.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-gray-700">Business Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Main St, San Diego, CA"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            {/* Invoice Footer Note */}
            <div>
              <label className="text-sm font-medium text-gray-700">Invoice Footer Note</label>
              <textarea
                name="invoiceFooterNote"
                value={form.invoiceFooterNote}
                onChange={handleChange}
                rows={4}
                placeholder="Thank you for your business. Payment is due upon receipt."
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            {saveError && <p className="text-sm text-red-600">{saveError}</p>}
            {saveSuccess && <p className="text-sm text-green-600">Changes saved successfully.</p>}

            <div className="flex justify-end border-t border-gray-200 pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center justify-center rounded-lg bg-brand-red px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-brand-blue">Subscription</h3>
          <p className="mt-2 text-sm text-gray-600">
            Subscription management and cancellation controls will be added when billing is connected.
          </p>
        </div>
      </div>
    </section>
  );
}
