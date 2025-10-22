import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarOfLife } from "react-icons/fa";
import { cardDetails } from "../util/cardDetails";
import axios from "axios";
import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';

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
  id: number;
}


// export default function CardItem(itemData: any) {
// export default function CardItem(itemData: any) {
export default function CardItem({ itemData, searchQuery }: { itemData: any; searchQuery: string }) {

  const [itemList, setItemList] = useState<Item[]>([]);
  const [filteredCards, setFilteredCards] = useState<Item[]>([]);

  useEffect(() => {
    if (!itemData) return;
    setItemList(itemData);
  }, [itemData]);

  useEffect(() => {
    const filtered = itemList.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
    setFilteredCards(filtered);
  }, [itemList, searchQuery]);

  // function favoriteHandler(idx?: number) {
  //   // console.log("Favorite clicked");
  //   const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  //   const itemId = idx;
  //   const isFavorite = favorites.includes(itemId);

  //   if (isFavorite) {
  //     const updatedFavorites = favorites.filter((id: number) => id !== itemId);
  //     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  //   } else {
  //     favorites.push(itemId);
  //     localStorage.setItem('favorites', JSON.stringify(favorites));
  //   }
  // }


  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       const response = await axios.get(`${import.meta.env.VITE_API_BASE}`, {
  //         params: {
  //           action: 'getpack',
  //         },
  //         headers: {
  //           "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
  //         },
  //       });

  //       if (selectedFilter === "favorite") {
  //         const favoriteIds = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : [];
  //         const filteredData = response.data.filter((item: any, idx: number) => favoriteIds.includes(idx));
  //         // console.log(filteredData);
  //         // setFavoriteList(filteredData[0] || null);
  //         setItemList(filteredData);
  //       } else {
  //         setItemList(response.data);
  //       }
  //       // console.log(response);
  //     };
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }, []);

  // console.log((localStorage.getItem('favorites') || '[]').includes('8'));


  // const filteredCards = itemList.filter((item) => {
  //   const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   // || item.description.toLowerCase().includes(searchQuery.toLowerCase());
  //   // const matchesFilter = selectedFilter === "all" || item.name.toLowerCase().includes(selectedFilter.toLowerCase());
  //   return matchesSearch
  // });

  useEffect(() => {
    
  }, [filteredCards]);

  function favoriteHandler(data: Item) {
    // console.log("Favorite clicked");
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const itemId = data.id;
    const isFavorite = favorites.some((item: Item) => item.id === itemId);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((item: Item) => item.id !== itemId);
      console.log('updatedFavorites', updatedFavorites);  
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(data);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  return (


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6 px-4">
      {filteredCards.map((item, idx) => {
      // console.log('itemdata', item.id);
      return (
        <Link
        key={item.id}
        to={`/product/${item.id}`}
        className="group relative block bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105"
        >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
          hidden={(!item.img) ? true : false}
          src={item?.img}
          alt={item?.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

          {/* Favorite Button */}
          <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            favoriteHandler(item);
            const btn = e.currentTarget;
            const pressed = btn.getAttribute("aria-pressed") === "true";
            btn.setAttribute("aria-pressed", String(!pressed));
            setItemList([...itemList]);
          }}
          // aria-pressed={JSON.parse(localStorage.getItem('favorites') || '[]').includes(idx)}
          className="absolute top-3 right-3 p-2 bg-gray-900/70 backdrop-blur-sm rounded-full hover:bg-gray-800/90 hover:scale-110 transition-all duration-300 "
          aria-label="Favorite"
          title="Favorite"
          >

          <FaStar
            className={`
            w-5 h-5 transition-all duration-300 
            stroke-yellow-400 stroke-[20px] 
            ${JSON.parse(localStorage.getItem('favorites') || '[]').some((items: Item) => items.id === item.id) ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : 'text-transparent'}
          `}
          />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-5">
          {/* Title */}
          <h2
          className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 line-clamp-2 min-h-[3.5rem]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
            item.name
              ?.replace(/\r?\n/g, '')
              .replace(/<br\s*>/gi, '<br/>')
            )
          }}
          ></h2>

          {/* Description */}
          <p
          className="text-gray-300 text-sm mb-4 line-clamp-3 min-h-[4rem]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
            item.msg
              ?.replace(/\r?\n/g, '')
              .replace(/<br\s*>/gi, '<br/>')
            )
          }}
          />

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-4"></div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-2xl font-extrabold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            {/* ฿{(item?.price_agent  + (20 /100 * item?.price)).toFixed(2)} */}
            ฿{item?.price}
            </p>
            {/* <p className="text-sm text-gray-500 line-through">
            ฿{item?.price_agent}
            </p> */}
          </div>

          {/* Save Badge */}
          <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
            <p className="text-xs font-bold text-gray-900">
            -฿{item?.exp}
            </p>
          </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-500 transition-all duration-500 pointer-events-none"></div>
        </Link>
      );
      })}
    </div>
  );
}
