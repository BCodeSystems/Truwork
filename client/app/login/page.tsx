"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");
      setIsLoading(true);

      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!data.success) {
          setErrorMessage(data.message || "Invalid email or password.");
          return;
        }

        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
  
          <div className="text-center">
            <div className="flex justify-center">
              <Image
                src="/branding/truwork-full-logo.svg"
                alt="TruWork"
                width={220}
                height={170}
                priority
              />
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Sign in to access your jobs and invoices.
            </p>
            {errorMessage && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </p>
            )}
            </div>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1f3b]"
                    />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1f3b]"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-brand-red py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>

            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <a href="/signup" className="font-medium text-brand-blue">
                Create one
                </a>
            </p>
        </div>
    </main>
    );
}