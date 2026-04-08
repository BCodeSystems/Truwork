export default function LoginPage() {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
  
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0B1F3B]">
              TruWork Login
            </h1>

            <p className="mt-2 text-sm text-gray-600">
                Sign in to access your jobs and invoices.
            </p>
            </div>

            <form className="mt-6 space-y-4">

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input 
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1f3b]"
                />
                </div>
                
                <button
                type="submit"
                className="w-full rounded-lg bg-brand-red py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                    Sign In 
                </button>

            </form>

            <p className="mt-6 text-center test-sm text-gray-500">
                Don't have an account?{" "}
                <a href="/" className="font-medium text-[#0b1f3b]">
                Learn more
                </a>
            </p>
        </div>
    </main>
    );
}