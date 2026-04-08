export default function LandingNavbar() {
    return (
        <header className="border-b border-hray-100 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="text-lg font-bold text-[#0B1F3B]">
                    TruWork
                </div>
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