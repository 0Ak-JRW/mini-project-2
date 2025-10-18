import { useState } from "react";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-center text-3xl font-bold">About Company</h1>
      <div className="mt-6 flex flex-col items-center">
        <img src="/images/unnamed.webp" alt="Company Logo" className="company-logo rounded-3xl shadow-[0_4px_30px_#00FFE9]" />
      </div>
      <div className="mt-6 text-start">
        <p className="text-lg">Pixelnetwork Co., Ltd.</p>
      </div>
    </div>
  );
}
