"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { House, Briefcase, Calendar, File, Menu, CirclePlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import FeedbackModal from "@/components/feedback/FeedbackModal";

type AppLayoutProps = {
  children: ReactNode;
};

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/invoices", label: "Invoices", icon: File },
  { href: "/menu", label: "Menu", icon: Menu },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Top Bar */}
      <header className="border-b border-gray-200 bg-white md:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/branding/truwork-monogram.svg"
              alt="TruWork"
              width={36}
              height={36}
              priority
            />
          </Link>

          <Link
            href="/jobs?new=1"
            aria-label="Add Job"
            className="text-[#C62828] transition hover:opacity-80"
          >
            <CirclePlus size={28} strokeWidth={2} />
          </Link>
        </div>
      </header>

      <div className="md:grid md:min-h-screen md:grid-cols-[240px_1fr]">
        {/* Desktop Sidebar */}
        <aside className="hidden border-r border-gray-200 bg-white md:block">
          <div className="border-b border-gray-100 px-6 py-5">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/branding/truwork-wordmark.svg"
                alt="TruWork"
                width={150}
                height={34}
                priority
              />
            </Link>
          </div>

          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-brand-blue"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="min-w-0">
          {/* Desktop Header */}
          <header className="hidden border-b border-gray-200 bg-white md:block">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm text-gray-500">Welcome back</p>
              </div>

              <Link
                href="/jobs?new=1"
                className="inline-flex items-center gap-2 rounded-lg bg-[#C62828] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                <CirclePlus size={18} />
                Add Job
              </Link>
            </div>
          </header>

          <main className="px-4 py-6 pb-24 md:p-6">{children}</main>

          {/* Feedback button */}
          <div className="fixed bottom-24 right-4 z-40 md:bottom-6">
            <button
              type="button"
              onClick={() => setFeedbackOpen(true)}
              className="rounded-full bg-brand-blue px-4 py-2 text-xs font-semibold text-white shadow-lg hover:opacity-90 transition"
            >
              Feedback
            </button>
          </div>

          {feedbackOpen && (
            <FeedbackModal onClose={() => setFeedbackOpen(false)} />
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white md:hidden">
        <div className="grid grid-cols-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium transition ${
                pathname === link.href
                  ? "text-[#C62828]"
                  : "text-gray-600 hover:text-brand-blue"
              }`}
            >
              <link.icon
                size={18}
                className="text-brand-blue"
              />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}