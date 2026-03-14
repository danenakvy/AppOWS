"use client";

interface Step {
  label: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors
                ${index < currentStep
                  ? "bg-blue-500 border-blue-500 text-white"
                  : index === currentStep
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-white border-gray-300 text-gray-400"
                }`}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : step.icon ? (
                step.icon
              ) : (
                index + 1
              )}
            </div>
            <span className={`text-xs mt-1 text-center ${index <= currentStep ? "text-blue-600 font-medium" : "text-gray-400"}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`h-0.5 flex-1 mx-1 mb-4 ${index < currentStep ? "bg-blue-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
