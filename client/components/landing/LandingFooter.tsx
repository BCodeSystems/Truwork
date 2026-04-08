export default function LandingFooter() {
    return (
      <footer className="bg-brand-blue py-12 text-white">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-3">
  
          <div>
            <h3 className="text-lg font-bold">TruWork</h3>
  
            <p className="mt-3 text-sm text-slate-300 leading-6">
              Professional invoicing for service businesses. Simple, fast, and
              built for the field.
            </p>
          </div>
  
          <div>
            <h4 className="font-semibold">Product</h4>
  
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Features</li>
              <li>Pricing</li>
              <li>FAQ</li>
            </ul>
          </div>
  
          <div>
            <h4 className="font-semibold">Company</h4>
  
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy</li>
            </ul>
          </div>
  
        </div>
  
        <div className="mx-auto mt-10 max-w-6xl border-t border-slate-800 px-6 pt-6 text-center text-xs text-slate-400">
          © 2026 TruWork. All rights reserved.
        </div>
      </footer>
    );
  }