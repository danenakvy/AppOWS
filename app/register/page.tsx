"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackgroundLayout from "@/components/BackgroundLayout";
import CardContainer from "@/components/CardContainer";
import OTPInput from "@/components/OTPInput";
import Stepper from "@/components/Stepper";

const STEPS = [
  { label: "OTP", icon: "📱" },
  { label: "ព័ត៌មាន", icon: "👤" },
  { label: "អត្ត​សញ្ញាណ", icon: "🪪" },
  { label: "ពាក្យសម្ងាត់", icon: "🔒" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // OTP step
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(false);

  // Personal Info step
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  // National ID step
  const [idNumber, setIdNumber] = useState("");
  const [idFirstName, setIdFirstName] = useState("");
  const [idLastName, setIdLastName] = useState("");
  const [idDob, setIdDob] = useState("");
  const [idAddress, setIdAddress] = useState("");

  // Password step
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const filled = otp.every((d) => d !== "");
    if (!filled) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    setCurrentStep(1);
  };

  const handlePersonalNext = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleNationalIDNext = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePasswordNext = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (!password || password.length < 6) {
      setPasswordError("ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៦ តួអក្សរ");
      hasError = true;
    } else {
      setPasswordError("");
    }
    if (password !== confirmPassword) {
      setConfirmError("ពាក្យសម្ងាត់មិនត្រូវគ្នា");
      hasError = true;
    } else {
      setConfirmError("");
    }
    if (!hasError) {
      setCurrentStep(4);
    }
  };

  const stepperSteps = STEPS.map((s, i) => ({
    label: s.label,
    icon: <span className="text-xs">{s.icon}</span>,
  }));

  return (
    <BackgroundLayout>
      <CardContainer className={currentStep === 4 ? "max-w-sm" : "max-w-lg"}>
        {/* Step 0: OTP */}
        {currentStep === 0 && (
          <div>
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-blue-700">ចុះឈ្មោះគណនី</h1>
              <p className="text-gray-500 text-sm mt-1">Register Account</p>
            </div>
            <Stepper steps={stepperSteps} currentStep={0} />
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  បញ្ចូលលេខកូដ OTP ដែលបានផ្ញើទៅកាន់ទូរស័ព្ទ
                </label>
                <OTPInput
                  value={otp}
                  onChange={(v) => { setOtp(v); setOtpError(false); }}
                  error={otpError}
                  lightBg={true}
                />
                {otpError && (
                  <p className="text-red-500 text-xs mt-2 text-center">កូដ OTP មិនត្រឹមត្រូវ</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-2.5 font-semibold transition-colors"
              >
                ផ្ទៀងផ្ទាត់
              </button>

              <button
                type="button"
                className="w-full border-2 border-blue-400 text-blue-500 hover:bg-blue-50 rounded-lg px-6 py-2.5 text-sm transition-colors"
              >
                ផ្ញើកូដម្ដងទៀត
              </button>

              <div className="text-center">
                <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
                  ← ត្រឡប់ក្រោយ
                </Link>
              </div>
            </form>
          </div>
        )}

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div>
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold text-blue-700">ព័ត៌មានផ្ទាល់ខ្លួន</h1>
              <p className="text-gray-500 text-sm">Personal Information</p>
            </div>
            <Stepper steps={stepperSteps} currentStep={1} />
            <form onSubmit={handlePersonalNext} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">នាមត្រកូល</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="នាមត្រកូល"
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">នាម</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="នាម"
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">ថ្ងៃ ខែ ឆ្នាំ កំណើត (Date of Birth)</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">ភេទ (Gender)</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm bg-white"
                >
                  <option value="">-- ជ្រើសរើស --</option>
                  <option value="male">ប្រុស (Male)</option>
                  <option value="female">ស្រី (Female)</option>
                  <option value="other">ផ្សេងទៀត (Other)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">អាសយដ្ឋាន (Address)</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="អាសយដ្ឋានរស់នៅ"
                  rows={2}
                  className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm resize-none"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-2.5 font-medium transition-colors text-sm"
                >
                  ← ត្រឡប់
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 font-semibold transition-colors text-sm"
                >
                  បន្ទាប់ →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: National ID */}
        {currentStep === 2 && (
          <div>
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold text-blue-700">ព័ត៌មានអត្តសញ្ញាណប័ណ្ណ</h1>
              <p className="text-gray-500 text-sm">National ID Information</p>
            </div>
            <Stepper steps={stepperSteps} currentStep={2} />
            <form onSubmit={handleNationalIDNext} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">លេខអត្តសញ្ញាណប័ណ្ណ (ID Number)</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="xxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">នាមត្រកូល</label>
                  <input
                    type="text"
                    value={idFirstName}
                    onChange={(e) => setIdFirstName(e.target.value)}
                    placeholder="នាមត្រកូល"
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">នាម</label>
                  <input
                    type="text"
                    value={idLastName}
                    onChange={(e) => setIdLastName(e.target.value)}
                    placeholder="នាម"
                    className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">ថ្ងៃ ខែ ឆ្នាំ កំណើត (DOB)</label>
                <input
                  type="date"
                  value={idDob}
                  onChange={(e) => setIdDob(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">អាសយដ្ឋាន (Address)</label>
                <textarea
                  value={idAddress}
                  onChange={(e) => setIdAddress(e.target.value)}
                  placeholder="អាសយដ្ឋានតាមអត្តសញ្ញាណប័ណ្ណ"
                  rows={2}
                  className="w-full px-3 py-2 border-2 border-gray-300 focus:border-blue-500 rounded-lg outline-none text-sm resize-none"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-2.5 font-medium transition-colors text-sm"
                >
                  ← ត្រឡប់
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 font-semibold transition-colors text-sm"
                >
                  បន្ទាប់ →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Password */}
        {currentStep === 3 && (
          <div>
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold text-blue-700">កំណត់ពាក្យសម្ងាត់</h1>
              <p className="text-gray-500 text-sm">Set Password</p>
            </div>
            <Stepper steps={stepperSteps} currentStep={3} />
            <form onSubmit={handlePasswordNext} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">ពាក្យសម្ងាត់ (Password)</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                    placeholder="••••••••"
                    className={`w-full px-3 py-2.5 pr-10 border-2 rounded-lg outline-none text-sm
                      ${passwordError ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-blue-500"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">បញ្ជាក់ពាក្យសម្ងាត់ (Confirm Password)</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setConfirmError(""); }}
                    placeholder="••••••••"
                    className={`w-full px-3 py-2.5 pr-10 border-2 rounded-lg outline-none text-sm
                      ${confirmError ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-blue-500"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {confirmError && <p className="text-red-500 text-xs mt-1">{confirmError}</p>}
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-2.5 font-medium transition-colors text-sm"
                >
                  ← ត្រឡប់
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 font-semibold transition-colors text-sm"
                >
                  បន្ទាប់ →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Success */}
        {currentStep === 4 && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mb-5 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-blue-700 mb-2">ចុះឈ្មោះបានជោគជ័យ!</h1>
            <p className="text-gray-600 text-sm mb-2">Registration Successful</p>
            <p className="text-gray-500 text-sm mb-6">
              គណនីរបស់អ្នកត្រូវបានបង្កើតដោយជោគជ័យ។<br />
              Your account has been created successfully.
            </p>
            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-8 py-2.5 font-semibold transition-colors"
            >
              ចូលគណនី →
            </Link>
          </div>
        )}
      </CardContainer>
    </BackgroundLayout>
  );
}
