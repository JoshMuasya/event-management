"use client";

import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white border border-[#FFD700]/50 rounded-lg shadow-md">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-4 border-[#FFD700]/50 border-t-[#6A0DAD] rounded-full animate-spin mx-auto mb-4"></div>
        {/* Loading Text */}
        <p className="text-[#2A2A2A] text-lg font-lora">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;