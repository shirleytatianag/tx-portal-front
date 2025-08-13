"use client";

export default function Loader({height = 'h-screen'}) {
  return (
    <div className={`flex items-center justify-center ${height} bg-white overflow-hidden`}>
      <div className="w-12 h-12 border-4 border-[#008893]-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}