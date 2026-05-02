export default function PrivacyPolicy() {
  const lastUpdated = "May 2, 2026";

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
        {/* Title Block */}
        <div className="mb-12">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              TruWork is a product of BCode Systems, LLC ("we," "us," or "our"), a company
              based in San Diego, California. We operate truworkapp.com and the TruWork
              progressive web application. This Privacy Policy explains how we collect,
              use, disclose, and protect your information when you use our services.
            </p>
            <p className="mt-4">
              By using TruWork, you agree to the practices described in this policy. If
              you do not agree, please discontinue use of our services.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-base font-semibold text-gray-800 mb-2">
              a. Information You Provide
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <strong>Account information:</strong> Name, email address, business name,
                and password when you register.
              </li>
              <li>
                <strong>Business and job data:</strong> Customer names, job descriptions,
                line items, pricing, and invoice details you enter into the app.
              </li>
              <li>
                <strong>Photos:</strong> Images you upload to document completed work on
                job invoices.
              </li>
              <li>
                <strong>Billing information:</strong> Subscription payment details
                processed through our third-party payment processor. We do not store
                full credit card numbers.
              </li>
              <li>
                <strong>Communications:</strong> Messages you send us via email or
                support channels.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-6">
              b. Information Collected Automatically
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <strong>Usage data:</strong> Pages visited, features used, session
                duration, and app interactions.
              </li>
              <li>
                <strong>Device information:</strong> Browser type, operating system,
                device type, and IP address.
              </li>
              <li>
                <strong>Cookies and similar technologies:</strong> We use cookies and
                local storage to maintain sessions and improve your experience. See
                Section 6 for details.
              </li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700">
              <li>Provide, operate, and improve the TruWork service</li>
              <li>Create and manage your account and subscription</li>
              <li>Process payments and send billing-related communications</li>
              <li>Send you invoices, receipts, and transactional emails</li>
              <li>Respond to support requests and customer inquiries</li>
              <li>Send product updates, tips, and service announcements</li>
              <li>Analyze usage patterns to improve features and performance</li>
              <li>Detect, investigate, and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* 3. Sharing Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Sharing Your Information
            </h2>
            <p>
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700">
              <li>
                <strong>Service providers:</strong> Third-party vendors who help us
                operate TruWork (e.g., cloud hosting, payment processing, email
                delivery). These parties are contractually bound to protect your data.
              </li>
              <li>
                <strong>Payment processors:</strong> Subscription billing is handled by
                a PCI-compliant third-party processor. Future payment integrations (e.g.,
                Square) will be governed by their respective privacy policies.
              </li>
              <li>
                <strong>Analytics providers:</strong> We use or plan to use tools
                including Google Analytics, Meta Pixel, and Microsoft Clarity to
                understand how users interact with TruWork. These services may collect
                usage data and set cookies. See Section 6.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose information if
                required by law, court order, or to protect the rights and safety of
                TruWork, its users, or the public.
              </li>
              <li>
                <strong>Business transfers:</strong> If TruWork is acquired or merged,
                your information may be transferred as part of that transaction.
              </li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* 4. Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Data Retention
            </h2>
            <p>
              We retain your account and invoice data for as long as your account is
              active or as needed to provide our services. If you close your account, we
              will delete or anonymize your personal data within 90 days, unless we are
              required to retain it for legal or financial compliance purposes.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 5. Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures including encrypted data
              transmission (HTTPS/TLS), secure cloud infrastructure, and access controls
              to protect your information. However, no method of transmission over the
              internet is 100% secure. We encourage you to use a strong, unique password
              for your TruWork account.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 6. Cookies & Tracking */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Cookies &amp; Tracking Technologies
            </h2>
            <p>
              TruWork uses cookies and similar technologies for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700">
              <li>
                <strong>Essential cookies:</strong> Required for authentication and core
                app functionality.
              </li>
              <li>
                <strong>Analytics:</strong> We use or plan to use Google Analytics, Meta
                Pixel, and Microsoft Clarity to collect anonymized usage data and improve
                the product. These services may set their own cookies.
              </li>
            </ul>
            <p className="mt-4">
              You can control cookies through your browser settings. Disabling certain
              cookies may affect app functionality. To opt out of Google Analytics, visit{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 7. CCPA */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. California Privacy Rights (CCPA)
            </h2>
            <p>
              If you are a California resident, you have the following rights under the
              California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700">
              <li>
                <strong>Right to Know:</strong> You may request details about the
                personal information we collect, use, disclose, and sell (we do not sell
                personal information).
              </li>
              <li>
                <strong>Right to Delete:</strong> You may request that we delete your
                personal information, subject to certain exceptions.
              </li>
              <li>
                <strong>Right to Opt-Out:</strong> You have the right to opt out of the
                sale of personal information. We do not sell personal information.
              </li>
              <li>
                <strong>Right to Non-Discrimination:</strong> We will not discriminate
                against you for exercising your CCPA rights.
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:TruWorkSupport@bcodesystems.com"
                className="text-blue-600 underline"
              >
                TruWorkSupport@bcodesystems.com
              </a>
              .
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 8. Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p>
              TruWork is not directed to individuals under the age of 18. We do not
              knowingly collect personal information from children. If you believe a
              child has provided us with personal information, please contact us and we
              will delete it promptly.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 9. Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will
              update the "Last updated" date at the top of this page. For material
              changes, we will notify you via email or an in-app notice. Your continued
              use of TruWork after changes take effect constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 10. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="mt-4 bg-gray-50 rounded-xl p-6 text-sm space-y-1">
              <p className="font-semibold text-gray-900">TruWork — a product of BCode Systems, LLC</p>
              <p>San Diego, California, United States</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:TruWorkSupport@bcodesystems.com"
                  className="text-blue-600 underline"
                >
                  TruWorkSupport@bcodesystems.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://truworkapp.com"
                  className="text-blue-600 underline"
                >
                  truworkapp.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© 2026 TruWork. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-gray-600 transition-colors font-medium text-gray-600">
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