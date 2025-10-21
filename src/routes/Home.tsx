import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import CardItem from "../components/CardItem";
import axios from "axios";

const filterBar = [
  { to: "/all", label: "All" },
  { to: "/account", label: "Account" },
  { to: "/streaming", label: "Streaming" },
  { to: "/games", label: "Games" },
  { to: "/vpn", label: "VPN" },
  { to: "/software", label: "Software" },
];

interface itemList {
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



export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemList, setItemList] = useState([] as itemList[]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`/api/v1`, {
          params: {
            action: 'getpack',
          },
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });

        // if (selectedFilter === "favorite") {
        //   const favoriteIds = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : [];
        //   const filteredData = response.data.filter((item: any, idx: number) => favoriteIds.includes(idx));
        //   // console.log(filteredData);
        //   // setFavoriteList(filteredData[0] || null);
        //   setItemList(filteredData);
        // } else {
        //   setItemList(response.data);
        // }
        setItemList(response.data);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);


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
          <CardItem data={itemList} />
        </div>
      </div>
    </>
  );
}
