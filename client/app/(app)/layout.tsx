"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { House, Briefcase, Calendar, File, Users } from "lucide-react";
import { usePathname } from "next/navigation";

type AppLayoutProps = {
  children: ReactNode;
};

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/invoices", label: "Invoices", icon: File },
  { href: "/team", label: "Team", icon: Users },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Top Bar */}
      <header className="border-b border-gray-200 bg-white md:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-lg font-bold text-[#0B1F3B]">
            TruWork
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition hover:text-[#0B1F3B]"
          >
            Site
          </Link>
        </div>
      </header>

      <div className="md:grid md:min-h-screen md:grid-cols-[240px_1fr]">
        {/* Desktop Sidebar */}
        <aside className="hidden border-r border-gray-200 bg-white md:block">
          <div className="border-b border-gray-100 px-6 py-5">
            <Link href="/dashboard" className="text-xl font-bold text-[#0B1F3B]">
              TruWork
            </Link>
          </div>

          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-[#0B1F3B]"
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
                <h1 className="text-lg font-semibold text-[#0B1F3B]">
                  TruWork App
                </h1>
              </div>

              <Link
                href="/"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Back to Site
              </Link>
            </div>
          </header>

          <main className="px-4 py-6 pb-24 md:p-6">{children}</main>
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
                  : "text-gray-600 hover:text-[#0B1F3B]"
              }`}
            >
              <link.icon
                size={18}
                className="text-[#0B1F3B]"
              />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}