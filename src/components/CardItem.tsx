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
}

// export const cardDetails = [
//   {
//     id: 1,
//     title: "Card Title 1",
//     image: "/images/Mockup.jpg",
//     description: "Card description goes here.",
//     price: "10.00 Bath",
//     normalprice: "15.00 Bath",
//     saveprice: "5.00 Bath",
//     remaining: "5",
//   },
//   {
//     id: 2,
//     title: "Card Title 2",
//     image: "/images/Mockup.jpg",
//     description: "Card description goes here.",
//     price: "10.00 Bath",
//     normalprice: "15.00 Bath",
//     saveprice: "5.00 Bath",
//     remaining: "5",
//   },
//   {
//     id: 3,
//     title: "Card Title 3",
//     image: "/images/Mockup.jpg",
//     description: "Card description goes here.",
//     price: "10.00 Bath",
//     normalprice: "15.00 Bath",
//     saveprice: "5.00 Bath",
//     remaining: "5",
//   },
//   {
//     id: 4,
//     title: "Card Title 4",
//     image: "/images/Mockup.jpg",
//     description: "Card description goes here.",
//     price: "10.00 Bath",
//     normalprice: "15.00 Bath",
//     saveprice: "5.00 Bath",
//     remaining: "5",
//   },
//   {
//     id: 5,
//     title: "Card Title 5",
//     image: "/images/Mockup.jpg",
//     description: "Card description goes here.",
//     price: "10.00 Bath",
//     normalprice: "15.00 Bath",
//     saveprice: "5.00 Bath",
//     remaining: "5",
//   },
//   {
//     id: 6,
//     title: "Card Title 6",
//     image: "/images/Mockup.jpg",
//     description: "Card description goes here.",
//     price: "10.00 Bath",
//     normalprice: "15.00 Bath",
//     saveprice: "5.00 Bath",
//     remaining: "5",
//   },
//   {
//     id: 7,
//     title: "Card Title 7",
//     image: "/images/Mockup.jpg",
//     description: "Card description goes here.",
//     price: "10.00 Bath",
//     normalprice: "15.00 Bath",
//     saveprice: "5.00 Bath",
//     remaining: "5",
//   },
//   {
//     id: 8,
//     title: "Card Title 8",
//     image: "/images/Mockup.jpg",
// export default function CardItem({ selectedFilter, searchQuery }: { selectedFilter: string, searchQuery: string }) {

//     saveprice: "5.00 Bath",
//     remaining: "5",
//   },
// ];



export default function CardItem({ selectedFilter, searchQuery }: { selectedFilter: string, searchQuery: string }) {

  const [itemList, setItemList] = useState<Item[]>([]);

  function favoriteHandler(idx?: number) {
    // console.log("Favorite clicked");
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const itemId = idx;
    const isFavorite = favorites.includes(itemId);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((id: number) => id !== itemId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(itemId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }


  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE}`, {
          params: {
            action: selectedFilter ,
          },
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });
        setItemList(response.data);
        // console.log(response);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedFilter]);


  const filteredCards = itemList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    // || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    // const matchesFilter = selectedFilter === "all" || item.name.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch
  });

  return (
    // <div className="grid grid-cols-4 gap-6 pb-6">
    //   {itemList.map((item, idx) => (
    //     <Link
    //       key={idx}
    //       to={`/product/${idx}`}
    //       className="block border border-gray-300 rounded-lg p-4 shadow-[0px_0px_6px_1px_#00fff2] hover:border-[#00ffbf] hover:shadow-[0px_0px_12px_2px_#00fff2] transition-all duration-300"
    //     >
    //       {/* <h2 className="text-xl font-semibold mb-2">{item?.name}</h2> */}
    //       <h2 className="text-xl font-semibold mb-2" 
    //        dangerouslySetInnerHTML={{
    //           __html: DOMPurify.sanitize(
    //             item.name
    //               ?.replace(/\r?\n/g, '')
    //               .replace(/<br\s*>/gi, '<br/>')
    //           )
    //         }}
    //       ></h2>
    //       <img
    //         src={item?.img}
    //         alt={item?.name}
    //         className="w-full h-40 object-cover mb-4 rounded-xl"
    //       />
    //       {/* <p className="text-white mb-4">
    //         {item.msg
    //           ? item.msg.split(/<br\s*>/i).map((line, i) => (
    //             <React.Fragment key={i}>
    //               {line}
    //               <br />
    //             </React.Fragment>
    //           ))
    //           : null}
    //       </p> */}


    //       <p
    //         className="text-white mb-4"
    //         dangerouslySetInnerHTML={{
    //           __html: DOMPurify.sanitize(
    //             item.msg
    //               ?.replace(/\r?\n/g, '')
    //               .replace(/<br\s*>/gi, '<br/>')
    //           )
    //         }}
    //       />

    //       {/* {item.msg} */}
    //       <div className="mb-4 flex flex-col items-center">
    //         <p className="text-lg font-bold text-white">{item?.price}</p>
    //         <p className="text-md text-white line-through">
    //           {item?.price_agent}
    //         </p>
    //         <p className="text-md text-yellow-500">Save {item?.exp}</p>
    //       </div>
    //       <hr className="border-t border-amber-200 mb-6" />
    //       <div className="flex justify-end mb-2">
    //         <button
    //           type="button"
    //           aria-pressed="false"
    //           onClick={(e) => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             const btn = e.currentTarget;
    //             const pressed = btn.getAttribute("aria-pressed") === "true";
    //             btn.setAttribute("aria-pressed", String(!pressed));
    //           }}
    //           className="group p-2 rounded-full focus:outline-none"
    //           aria-label="Favorite"
    //           title="Favorite"
    //         >
    //           <FaStar
    //             className="
    //             w-5 h-5 transition-colors
    //             stroke-yellow-300 stroke-20
    //             group-aria-[pressed=false]:text-transparent
    //             group-aria-[pressed=true]:text-yellow-300
    //           "
    //           />
    //         </button>
    //       </div>
    //     </Link>
    //   ))}
    // </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6 px-4">
      {filteredCards.map((item, idx) => (
        <Link
          key={idx}
          to={`/product/${idx}`}
          className="group relative block bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105"
        >
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img 
              hidden = {(!item.img) ? true : false}
              src={item?.img}
              alt={item?.name}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

            {/* Favorite Button */}
            <button
              type="button"
              aria-pressed={
              JSON.parse(localStorage.getItem('favorites')).includes(idx) 
                ? "true" 
                : "false"
              }
              onClick={(e) => {
              favoriteHandler(idx);
              e.preventDefault();
              e.stopPropagation();
              const btn = e.currentTarget;
              const pressed = btn.getAttribute("aria-pressed") === "true";
              btn.setAttribute("aria-pressed", String(!pressed));
              }}
              className="absolute top-3 right-3 p-2 bg-gray-900/70 backdrop-blur-sm rounded-full hover:bg-gray-800/90 hover:scale-110 transition-all duration-300 "
              aria-label="Favorite"
              title="Favorite"
            >
              
              <FaStar
              className="w-5 h-5 transition-all duration-300 stroke-yellow-400 stroke-[20px] group-aria-[pressed=false]:text-transparent group-aria-[pressed=true]:text-yellow-400 group-aria-[pressed=true]:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
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
                  ฿{item?.price}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ฿{item?.price_agent}
                </p>
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
      ))}
    </div>
  );
}
