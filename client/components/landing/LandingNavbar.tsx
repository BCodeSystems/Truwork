import Image from "next/image";
export default function LandingNavbar() {
    return (
        <header className="border-b border-gray-100 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <Image
                        src="/branding/truwork-wordmark.svg"
                        alt="TruWork"
                        width={114}
                        height={25}
                        priority
                    />
                </a>
                {/* CTA */}
                <a
                href="/login"
                className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                    Get Started
                </a>
            </div>
        </header>
    );
}