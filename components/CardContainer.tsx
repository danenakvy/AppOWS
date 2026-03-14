"use client";

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardContainer({ children, className = "" }: CardContainerProps) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-md ${className}`}>
      {children}
    </div>
  );
}
