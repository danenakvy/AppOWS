"use client";

import { useState } from "react";
import Link from "next/link";
import BackgroundLayout from "@/components/BackgroundLayout";
import CardContainer from "@/components/CardContainer";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(true); // default show failed state for demo

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(true);
  };

  return (
    <BackgroundLayout>
      <CardContainer>
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mb-3">
            AO
          </div>
          <h1 className="text-2xl font-bold text-blue-700">ចូលគណនី</h1>
          <p className="text-gray-500 text-sm mt-1">Sign In</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-600 text-sm">គណនី ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ!</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              គណនី <span className="text-gray-400 font-normal">(Username / Phone)</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(false); }}
              placeholder="username ឬ លេខទូរស័ព្ទ"
              className={`w-full px-4 py-2.5 border-2 rounded-lg outline-none transition-colors text-sm
                ${error ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-blue-500 bg-white"}`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ពាក្យសម្ងាត់ <span className="text-gray-400 font-normal">(Password)</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 border-2 rounded-lg outline-none transition-colors text-sm
                ${error ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-blue-500 bg-white"}`}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">ពាក្យសម្ងាត់មិនត្រឹមត្រូវ</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-blue-500 hover:text-blue-700 text-sm underline">
              ភ្លេចពាក្យសម្ងាត់?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-2.5 font-semibold text-base transition-colors"
          >
            ចូល
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center text-sm text-gray-600">
          មិនទាន់មានគណនី?{" "}
          <Link href="/register" className="text-blue-500 hover:text-blue-700 font-medium underline">
            ចុះឈ្មោះ
          </Link>
        </div>
      </CardContainer>
    </BackgroundLayout>
  );
}
