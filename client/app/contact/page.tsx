export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-gray-900 font-semibold text-lg tracking-tight">
            TruWork
          </a>
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Contact Us
          </h1>
          <p className="text-gray-500 text-sm">
            Have a question or need help? We&apos;re here for you.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
            Support
          </p>
          <p className="text-gray-700 mb-6">
            Reach out to us anytime and we&apos;ll get back to you as soon as possible.
          </p>
          <a
            href="mailto:TruWorkSupport@bcodesystems.com"
            className="inline-block rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
          >
            TruWorkSupport@bcodesystems.com
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© 2026 TruWork. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
