"use client";

import { useState } from "react";
import Link from "next/link";
import BackgroundLayout from "@/components/BackgroundLayout";
import CardContainer from "@/components/CardContainer";
import OTPInput from "@/components/OTPInput";

type Step = 0 | 1;

const STEP_LABELS = ["លេខទូរស័ព្ទ", "កូដOTP", "ពាក្យសម្ងាត់"];

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>(0);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(true); // default show error for demo
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP error for demo
    setOtpError(true);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (!newPassword || newPassword.length < 6) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }
    if (newPassword !== confirmPassword) {
      setConfirmError(true);
      hasError = true;
    } else {
      setConfirmError(false);
    }
    if (!hasError) {
      // Success - redirect to login
    }
  };

  const activeTabIndex = step === 0 ? 0 : 2;

  return (
    <BackgroundLayout>
      <CardContainer>
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">ភ្លេចពាក្យសម្ងាត់</h1>
          <p className="text-gray-500 text-sm mt-1">Forgot Password</p>
        </div>

        {/* Step Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {STEP_LABELS.map((label, i) => (
            <div
              key={i}
              className={`flex-1 text-center py-2 text-sm font-medium border-b-2 transition-colors
                ${i === (step === 0 ? 0 : 2)
                  ? "border-blue-500 text-blue-600"
                  : i < (step === 0 ? 0 : 2)
                  ? "border-blue-300 text-blue-400"
                  : "border-transparent text-gray-400"
                }`}
            >
              {label}
            </div>
          ))}
        </div>

        {step === 0 && (
          <form onSubmit={handleSendOTP} className="space-y-5">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                លេខទូរស័ព្ទ <span className="text-gray-400 font-normal">(Phone Number)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0xx xxx xxx"
                className="w-full px-4 py-2.5 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm"
              />
            </div>

            {/* OTP Boxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                កូដ OTP
              </label>
              <OTPInput
                value={otp}
                onChange={(v) => { setOtp(v); setOtpError(false); }}
                error={otpError}
              />
              {otpError && (
                <p className="text-red-500 text-xs mt-2 text-center">កូដ OTP មិនត្រឹមត្រូវ</p>
              )}
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-2.5 font-semibold transition-colors"
            >
              ផ្ញើ
            </button>

            {/* Demo: go to step 2 */}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full border-2 border-blue-400 text-blue-500 hover:bg-blue-50 rounded-lg px-6 py-2.5 text-sm transition-colors"
            >
              បន្ទាប់ (Next Demo) →
            </button>

            <div className="text-center">
              <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
                ← ត្រឡប់ក្រោយ
              </Link>
            </div>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={handleSavePassword} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ពាក្យសម្ងាត់ថ្មី <span className="text-gray-400 font-normal">(New Password)</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setPasswordError(false); }}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 border-2 rounded-lg outline-none text-sm
                  ${passwordError ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-blue-500"}`}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៦ តួអក្សរ</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                បញ្ជាក់ពាក្យសម្ងាត់ <span className="text-gray-400 font-normal">(Confirm Password)</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setConfirmError(false); }}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 border-2 rounded-lg outline-none text-sm
                  ${confirmError ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-blue-500"}`}
              />
              {confirmError && (
                <p className="text-red-500 text-xs mt-1">ពាក្យសម្ងាត់មិនត្រូវគ្នា</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-2.5 font-medium transition-colors"
              >
                ← ត្រឡប់
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 font-semibold transition-colors"
              >
                រក្សាទុក
              </button>
            </div>
          </form>
        )}
      </CardContainer>
    </BackgroundLayout>
  );
}
