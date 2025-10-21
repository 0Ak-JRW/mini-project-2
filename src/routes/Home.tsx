import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import CardItem from "../components/CardItem";
import axios from "axios";


const filterBar = [
  // { to: "/all", label: "All" },
  // { to: "/account", label: "Account" },
  // { to: "/streaming", label: "Streaming" },
  // { to: "/games", label: "Games" },
  // { to: "/vpn", label: "VPN" },
  // { to: "/software", label: "Software" },
  { label: "All", endpoint: "getpack" },
  { label: "Pack", endpoint: "getpack" },
  // { label: "Social", endpoint: "getsocial" },
  // { label: "Games", endpoint: "getgames" },

];

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


// console.log(import.meta.env.VITE_API_TOKEN);

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>("getpack");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemList, setItemList] = useState<Item[]>([]);


  
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE}`, {
          params: {
            action: 'getpack',
          },
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });

        if (selectedFilter === "favorite") {
          const favoriteIds = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : [];
          const filteredData = response.data.filter((item: any, idx: number) => favoriteIds.includes(idx));

          setItemList(filteredData);
        } else {
          setItemList(response.data);
        }
        // console.log(response);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <>
      {/* <h1 className="text-3xl font-semibold text-center">Account Streaming</h1> */}
      <div className="pt-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {filterBar.map((item, idx) => (
            <button
              key={idx}
              className={`px-6 py-2.5 min-w-[120px] text-sm font-medium rounded-full transition-all duration-300 ${
          selectedFilter === item.endpoint
            ? "bg-[#00fff2] text-gray-900 shadow-lg shadow-[#00fff2]/50"
            : "bg-transparent text-white border border-white/30 hover:border-[#00fff2] hover:shadow-md hover:shadow-[#00fff2]/30"
              }`}
              onClick={() => setSelectedFilter(item.endpoint)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center pt-8 w-full max-w-2xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold text-white">Search Application</h1>
          <form className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <GoSearch size={20} />
              </span>
              
              <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for applications..."
          className="rounded-xl w-full bg-gray-900/50 backdrop-blur-sm border border-white/20 py-3.5 pl-12 pr-4 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00fff2] focus:border-transparent transition-all duration-300 hover:border-[#00fff2]/50"
              />
            </form>
        </div>

        <div className="pt-8">
          <CardItem itemData={itemList} searchQuery={searchQuery} />
          {/* <CardItem selectedFilter={selectedFilter || ""} searchQuery={searchQuery} /> */}
        </div>
      </div>
    </>
  );
}
