export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of TruWork,
              a product of BCode Systems, LLC (&ldquo;BCode Systems,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
              including the website at truworkapp.com and the TruWork progressive web
              application (collectively, the &ldquo;Service&rdquo;).
            </p>
            <p className="mt-4">
              By creating an account or using the Service, you agree to be bound by
              these Terms. If you do not agree, do not use the Service.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 1. Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Eligibility
            </h2>
            <p>
              You must be at least 18 years old and legally capable of entering into a
              binding contract to use TruWork. By using the Service, you represent and
              warrant that you meet these requirements. TruWork is intended for use by
              service businesses and contractors operating lawfully in the United States.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 2. Account Registration */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Account Registration
            </h2>
            <p>
              To access TruWork, you must create an account by providing accurate and
              complete information. You are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700">
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activity that occurs under your account</li>
              <li>
                Notifying us immediately of any unauthorized use at{" "}
                <a href="mailto:TruWorkSupport@bcodesystems.com" className="text-blue-600 underline">
                  TruWorkSupport@bcodesystems.com
                </a>
              </li>
            </ul>
            <p className="mt-4">
              We reserve the right to suspend or terminate accounts that provide false
              information or violate these Terms.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 3. Free Trial */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Free Trial
            </h2>
            <p>
              TruWork offers a 14-day free trial for new accounts. No credit card is
              required to start your trial. At the end of the trial period, continued
              access to the Service requires a paid subscription. We reserve the right
              to modify or discontinue free trial offerings at any time.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 4. Subscription & Billing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Subscription &amp; Billing
            </h2>

            <h3 className="text-base font-semibold text-gray-800 mb-2">a. Subscription Plans</h3>
            <p>
              TruWork is offered at <strong>$29 per month</strong> per account, with the
              option to add additional users at <strong>$12 per month</strong> per user.
              Subscriptions are billed monthly and automatically renew on the same date
              each month until cancelled.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-6">b. Payment Processing</h3>
            <p>
              TruWork subscription payments are processed by{" "}
              <strong>Stripe</strong>, a third-party payment processor. By providing your
              payment information, you authorize Stripe to charge your payment method on
              a recurring monthly basis. Your payment information is handled directly by
              Stripe and is subject to their{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Privacy Policy
              </a>
              . BCode Systems does not store your full credit card details.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-6">c. Square Payments (Coming Soon)</h3>
            <p>
              TruWork will offer Square payment integration to allow contractors to
              collect payments from their customers directly within the app. When
              available, use of Square&apos;s payment features will be subject to Square&apos;s
              own{" "}
              <a
                href="https://squareup.com/us/en/legal/general/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Terms of Service
              </a>{" "}
              and Privacy Policy. BCode Systems is not responsible for payment
              transactions processed through Square between contractors and their
              end customers.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-6">d. Cancellation</h3>
            <p>
              You may cancel your subscription at any time from your account settings.
              Cancellation takes effect at the end of your current billing period. You
              will retain access to the Service through the end of the paid period. We
              do not provide refunds for partial months.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-6">e. Price Changes</h3>
            <p>
              We reserve the right to change subscription pricing with at least 30 days&apos;
              notice via email. Continued use of the Service after a price change takes
              effect constitutes acceptance of the new pricing.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 5. Acceptable Use */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Acceptable Use
            </h2>
            <p>You agree not to use TruWork to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700">
              <li>Violate any applicable laws or regulations</li>
              <li>Submit false, misleading, or fraudulent invoices or business information</li>
              <li>Upload content that is harmful, offensive, or infringes on third-party rights</li>
              <li>Attempt to gain unauthorized access to TruWork systems or other accounts</li>
              <li>Reverse engineer, copy, or resell any part of the Service</li>
              <li>Use automated scripts or bots to access or scrape the Service</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
            </ul>
            <p className="mt-4">
              We reserve the right to suspend or terminate your account for violations
              of this section without prior notice.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 6. Your Content */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Your Content
            </h2>
            <p>
              TruWork allows you to upload and store content including invoice data,
              customer information, and job site photos (&ldquo;Your Content&rdquo;). You retain
              ownership of Your Content. By uploading content to TruWork, you grant
              BCode Systems a limited, non-exclusive license to store, display, and
              process Your Content solely to provide the Service.
            </p>
            <p className="mt-4">
              You are solely responsible for Your Content and represent that you have
              all rights necessary to upload it. You must not upload photos or
              information that violate third-party privacy rights or applicable laws.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 7. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Intellectual Property
            </h2>
            <p>
              All rights, title, and interest in and to TruWork — including its design,
              code, branding, logos, and features — are owned by BCode Systems, LLC.
              Nothing in these Terms grants you any right to use our trademarks, trade
              names, or other intellectual property without our prior written consent.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 8. Disclaimers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Disclaimers
            </h2>
            <p>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF
              ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="mt-4">
              We do not warrant that the Service will be uninterrupted, error-free, or
              free of viruses or other harmful components. We are not responsible for
              any invoices sent, payments collected, or business decisions made using
              TruWork.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 9. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BCODE SYSTEMS, LLC SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES ARISING FROM YOUR USE OF THE SERVICE, INCLUDING LOSS OF PROFITS,
              DATA, OR BUSINESS OPPORTUNITIES.
            </p>
            <p className="mt-4">
              Our total liability to you for any claim arising from use of the Service
              shall not exceed the amount you paid to TruWork in the three (3) months
              preceding the claim.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 10. Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless BCode Systems, LLC and its
              officers, directors, employees, and agents from any claims, damages,
              losses, or expenses (including reasonable attorney&apos;s fees) arising from
              your use of the Service, Your Content, or your violation of these Terms.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 11. Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              11. Termination
            </h2>
            <p>
              You may cancel your account at any time. We may suspend or terminate your
              access to TruWork at our discretion, with or without notice, if we
              reasonably believe you have violated these Terms. Upon termination, your
              right to use the Service ceases immediately. Sections 6, 7, 8, 9, and 10
              survive termination.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 12. Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              12. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of California, without
              regard to its conflict of law provisions. Any disputes arising from these
              Terms or your use of the Service shall be resolved in the state or federal
              courts located in San Diego County, California, and you consent to
              personal jurisdiction in those courts.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 13. Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              13. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. When we do, we will update
              the &ldquo;Last updated&rdquo; date at the top of this page. For material changes, we
              will notify you via email at least 14 days before the changes take effect.
              Your continued use of the Service after changes take effect constitutes
              your acceptance of the updated Terms.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 14. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              14. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
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
            <a href="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-600 transition-colors font-medium text-gray-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
