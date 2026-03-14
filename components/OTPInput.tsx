"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";

interface OTPInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
  lightBg?: boolean;
}

export default function OTPInput({ value, onChange, error = false, lightBg = false }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const newValue = [...value];
    newValue[index] = digit;
    onChange(newValue);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newValue = [...value];
    for (let i = 0; i < 6; i++) {
      newValue[i] = pasted[i] || "";
    }
    onChange(newValue);
    const nextEmpty = newValue.findIndex((v) => !v);
    if (nextEmpty !== -1) {
      inputRefs.current[nextEmpty]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-10 h-10 text-center border-2 rounded-lg text-lg font-bold outline-none transition-colors
            ${error
              ? "border-red-400 bg-red-50 text-red-600"
              : lightBg
              ? "border-blue-300 bg-blue-50 text-blue-700 focus:border-blue-500"
              : "border-gray-300 bg-white text-gray-800 focus:border-blue-500"
            }`}
        />
      ))}
    </div>
  );
}
