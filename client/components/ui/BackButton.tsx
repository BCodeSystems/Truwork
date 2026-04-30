"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export default function BackButton({
  href = "/menu",
  label = "Back",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-brand-blue shadow-sm transition hover:border-brand-blue hover:bg-gray-50"
    >
      <ChevronLeft size={16} />
      <span>{label}</span>
    </Link>
  );
}