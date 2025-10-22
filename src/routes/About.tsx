// import { useState } from "react";

export default function About() {
  return (
    <div className="min-h-screen from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        About Company
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Company Logo Section */}
      <div className="flex justify-center mb-16">
        <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
        <img 
          src="/images/unnamed.webp" 
          alt="Company Logo" 
          className="relative w-64 h-64 object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition duration-300" 
        />
        </div>
      </div>

      {/* Company Info Card */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700/50 hover:border-cyan-400/50 transition duration-300">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
        <span className="text-4xl">🏢</span>
        Pixelnetwork Co., Ltd.
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed">
        <span className="font-semibold text-cyan-400">Address:</span> 9/1 หมู่ 5 ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120
        </p>
      </div>

      {/* Contact Information Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700/50">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3">
        <span className="text-4xl">📞</span>
        Contact Information
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contact Card 1 */}
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition duration-300">
          <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <h3 className="font-bold text-xl text-white">Sittisak Putthimit</h3>
          </div>
          <div className="space-y-2 text-slate-300">
          <p className="flex items-center gap-2">
            <span className="text-cyan-400">📱</span> 0918429331
          </p>
          <p className="flex items-center gap-2 break-all">
            <span className="text-cyan-400">✉️</span> sittisak.putt@bumail.net
          </p>
          </div>
        </div>

        {/* Contact Card 2 */}
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition duration-300">
          <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <h3 className="font-bold text-xl text-white">Korawat Soodnalao</h3>
          </div>
          <div className="space-y-2 text-slate-300">
          <p className="flex items-center gap-2">
            <span className="text-cyan-400">📱</span> 0972207605
          </p>
          <p className="flex items-center gap-2 break-all">
            <span className="text-cyan-400">✉️</span> korawat.sood@bumail.net
          </p>
          </div>
        </div>

        {/* Contact Card 3 */}
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition duration-300">
          <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <h3 className="font-bold text-xl text-white">Jeerawat Rueanduangchan</h3>
          </div>
          <div className="space-y-2 text-slate-300">
          <p className="flex items-center gap-2">
            <span className="text-cyan-400">📱</span> 0800651937
          </p>
          <p className="flex items-center gap-2 break-all">
            <span className="text-cyan-400">✉️</span> jeerawat.ruen@bumail.net
          </p>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
