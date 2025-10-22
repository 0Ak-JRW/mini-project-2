import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import CardItem from "../components/CardItem";
import axios from "axios";

interface Item {
    type_code: number;
    app: string;
    msg_groups: string;
    name_groups: string;
    groups: string;
    name: string;
    img: string;
    img_cover: string;
    img_icon: string;
    msg: string;
    price: number;
    price_agent: number;
    exp: number;
    amount: number;
}


export default function Favorite() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<string | null>("getpack");
    const [itemList, setItemList] = useState<Item[]>([]);

    useEffect(() => {
        try {
            const getData = JSON.parse(localStorage.getItem('favorites') || '[]');
            console.log('getData', getData);
            if (getData) {
                setItemList(getData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    console.log('itemList in favorite', itemList);

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
                    {/* <CardItem selectedFilter="favorite" searchQuery={searchQuery} /> */}
                    <CardItem itemData={itemList} searchQuery={searchQuery} />
                </div>
            </div>
        </>
    );
}
