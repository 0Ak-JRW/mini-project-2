import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
// import { cardDetails } from "../util/cardDetails";

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
// ];


export default function CardItem(data: any) {
  const [cardDetails, setCardDetails] = useState([] as any[]);
  
  // useEffect(() => {
  //   setCardDetails(data.data);
  // }, [data.data]);

  useEffect(() => {
    setCardDetails(data.data);
  }, [data]);

  // console.log(cardDetails);




  return (
    <div className="grid grid-cols-4 gap-6 pb-6">
      {cardDetails.map((card: any, idx) => (
        <Link
          key={idx}
          to={`/product/${idx}`}
          className="block border border-gray-300 rounded-lg p-4 shadow-[0px_0px_6px_1px_#00fff2] hover:border-[#00ffbf] hover:shadow-[0px_0px_12px_2px_#00fff2] transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">{card.name}</h2>
          <img
            src={card.img}
            alt={card.name}
            className="w-full h-40 object-cover mb-4 rounded-xl"
          />
          <p className="text-white mb-4">{card.msg}</p>
          <div className="mb-4 flex flex-col items-center">
            <p className="text-lg font-bold text-white">{card.price}</p>
            <p className="text-md text-white line-through">
              {card.price_agent}
            </p>
            <p className="text-md text-yellow-500">Save {card.price_agent < card.price ? card.price - card.price_agent : 0}</p>
          </div>
          <hr className="border-t border-amber-200 mb-6" />
          <div className="flex justify-end mb-2">
            <button
              type="button"
              aria-pressed="false"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const btn = e.currentTarget;
                const pressed = btn.getAttribute("aria-pressed") === "true";
                btn.setAttribute("aria-pressed", String(!pressed));
              }}
              className="group p-2 rounded-full focus:outline-none"
              aria-label="Favorite"
              title="Favorite"
            >
              <FaStar
                className="
                w-5 h-5 transition-colors
                stroke-yellow-300 stroke-20
                group-aria-[pressed=false]:text-transparent
                group-aria-[pressed=true]:text-yellow-300
              "
              />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
