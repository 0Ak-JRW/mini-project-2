import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import CardItem from "../components/CardItem";
import axios from "axios";

// const filterBar = [
//     { to: "/all", label: "All" },
//     { to: "/account", label: "Account" },
//     { to: "/streaming", label: "Streaming" },
//     { to: "/games", label: "Games" },
//     { to: "/vpn", label: "VPN" },
//     { to: "/software", label: "Software" },
// ];

export default function Favorite() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#00fff2] to-blue-500 bg-clip-text text-transparent">
                    Favorite Applications
                </h1>


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
                <div className="pt-8">
                    <CardItem selectedFilter="favorite" searchQuery={searchQuery} />
                </div>
            </div>
        </>
    );
}
