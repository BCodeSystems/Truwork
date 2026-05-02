import Image from "next/image";
export default function LandingFooter() {
    return (
      <footer className="bg-brand-blue py-12 text-white">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-3">
  
          <div>
          <Image
              src="/branding/truwork-monogram-alt.svg"
              alt="TruWork"
              width={64}
              height={64}
              priority
            />
  
            <p className="mt-3 text-sm text-slate-300 leading-6">
              Professional invoicing for service businesses. Simple, fast, and
              built for the field.
            </p>
          </div>
  
          <div>
            <h4 className="font-semibold">Product</h4>

            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>

            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>About</li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
  
        </div>
  
        <div className="mx-auto mt-10 max-w-6xl border-t border-slate-800 px-6 pt-6 text-center text-xs text-slate-400">
          © 2026 TruWork. All rights reserved.
        </div>
      </footer>
    );
  }