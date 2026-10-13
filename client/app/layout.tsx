import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://truworkapp.com"),
  title: {
    default: "TruWork",
    template: "%s | TruWork",
  },
  description: "Track jobs. Send invoices. Get paid faster.",

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    title: "TruWork",
    statusBarStyle: "default",
  },

  openGraph: {
    title: "TruWork",
    description: "Track jobs. Send invoices. Get paid faster.",
    url: "https://truworkapp.com",
    siteName: "TruWork",
    images: [
      {
        url: "/branding/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TruWork",
    description: "Track jobs. Send invoices. Get paid faster.",
    images: ["/branding/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
