import { useState } from "react";
import { GoSearch } from "react-icons/go";
import CardItem from "../components/CardItem";

const filterBar = [
  { to: "/all", label: "All" },
  { to: "/account", label: "Account" },
  { to: "/streaming", label: "Streaming" },
  { to: "/games", label: "Games" },
  { to: "/vpn", label: "VPN" },
  { to: "/software", label: "Software" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Account Streaming</h1>
      <div className="pt-8">
        <div className="flex justify-between space-x-4">
          {filterBar.map((item) => (
            <button
              key={item.to}
              className="px-4 py-1.5 w-44 text-md text-white border border-white rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-start justify-self-center pt-6 w-full space-y-3">
          <h1 className="text-lg font-semibold">Search Application</h1>
          <form className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <GoSearch size={18} />
              </span>
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="rounded-lg w-full bg-transparent border border-white py-2 pl-10 pr-4 text-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff2]"
              />
            </form>
        </div>

        <div className="pt-8">
          <CardItem />
        </div>
      </div>
    </>
  );
}
