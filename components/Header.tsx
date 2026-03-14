"use client";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
          AO
        </div>
        <span className="text-blue-700 font-bold text-lg">AppOWS</span>
      </div>
      <button className="bg-red-400 hover:bg-red-500 text-white rounded-full px-3 py-1 text-sm transition-colors">
        ភាសា
      </button>
    </header>
  );
}
