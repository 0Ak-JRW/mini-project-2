// import { useState } from "react";

export default function About() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="text-center text-3xl font-bold">About Company</h1>
        <div className="mt-6 flex flex-col items-center">
          <img src="/images/unnamed.webp" alt="Company Logo" className="company-logo rounded-3xl shadow-[0_4px_30px_#00FFE9]" />
        </div>
      </div>
      <div className="mt-6 text-start py-7">
        <p className="font-bold text-2xl">Pixelnetwork Co., Ltd.</p>
        <p className="mt-6 text-md">Address : 9/1 หมู่ 5 ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120</p>
      </div>
      <div className="mb-10 text-start py-2">
        <p className="font-bold text-2xl">Contact Information</p>
        <div className="mt-6">
          <p>Name : Sitthisak Putthimit</p>
          <p>Phone Number : 0918429331</p>
          <p>Email : sitthisak.putt@bumail.net</p>
        </div>
        <div className="mt-6">
          <p>Name : Korawat Soodnalao</p>
          <p>Phone Number : 0972207605</p>
          <p>Email : korawat.sood@bumail.net</p>
        </div>
        <div className="mt-6">
          <p>Name : Jeerawat Rueanduangchan</p>
          <p>Phone Number : 0800651937</p>
          <p>Email : jeerawat.ruen@bumail.net</p>
        </div>
      </div>
    </div>
  );
}
