"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const res = await fetch("http://localhost:5050/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!data.success) {
          console.error(data.message);
          return;
        }

        localStorage.setItem("token", data.token);
        router.push("/jobs");
      } catch (error) {
        console.error("Login error:", error);
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