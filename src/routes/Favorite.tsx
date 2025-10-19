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

export default function Favorite() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#00fff2] to-blue-500 bg-clip-text text-transparent">
                    Favorite Applications
                </h1>

                {/* Filter Bar */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {filterBar.map((item) => (
                            <button
                                key={item.to}
                                className="px-6 py-2.5 min-w-[120px] text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl hover:from-[#00fff2] hover:to-blue-500 hover:border-[#00fff2] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#00fff2]/50"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-200">Search Application</h2>
                    <form className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <GoSearch size={20} />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search your favorite apps..."
                            className="rounded-xl w-full bg-gray-900/50 border border-gray-700 py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00fff2] focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-lg"
                        />
                    </form>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* <CardItem  /> */}
                </div>
            </div>
        </>
    );
}
