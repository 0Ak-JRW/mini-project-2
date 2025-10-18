import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const cardDetails = [
  {
    title: "Card Title",
    image: "https://via.placeholder.com/150",
    description: "Card description goes here.",
    price: "10.00 Bath",
    normalprice: "15.00 Bath",
    saveprice: "5.00 Bath",
    remaining: "5",
  },
  {
    title: "Card Title",
    image: "https://via.placeholder.com/150",
    description: "Card description goes here.",
    price: "10.00 Bath",
    normalprice: "15.00 Bath",
    saveprice: "5.00 Bath",
    remaining: "5",
  },
  {
    title: "Card Title",
    image: "https://via.placeholder.com/150",
    description: "Card description goes here.",
    price: "10.00 Bath",
    normalprice: "15.00 Bath",
    saveprice: "5.00 Bath",
    remaining: "5",
  },
  {
    title: "Card Title",
    image: "https://via.placeholder.com/150",
    description: "Card description goes here.",
    price: "10.00 Bath",
    normalprice: "15.00 Bath",
    saveprice: "5.00 Bath",
    remaining: "5",
  },
  {
    title: "Card Title",
    image: "https://via.placeholder.com/150",
    description: "Card description goes here.",
    price: "10.00 Bath",
    normalprice: "15.00 Bath",
    saveprice: "5.00 Bath",
    remaining: "5",
  },
  {
    title: "Card Title",
    image: "https://via.placeholder.com/150",
    description: "Card description goes here.",
    price: "10.00 Bath",
    normalprice: "15.00 Bath",
    saveprice: "5.00 Bath",
    remaining: "5",
  },
];

export default function CardItem() {
  return (
    <div className="grid grid-cols-4 gap-6 pb-6">
      {cardDetails.map((card, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 shadow-[0px_0px_6px_1px_#00fff2] hover:border-[#00ffbf] hover:shadow-[0px_0px_12px_2px_#00fff2] transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
          <img src={card.image} alt={card.title} className="w-full h-40 object-cover mb-4" />
          <p className="text-white mb-4">{card.description}</p>
          <div className="mb-4 flex flex-col items-center">
            <p className="text-lg font-bold text-white">
              {card.price}
            </p>
            <p className="text-md text-white line-through">
              {card.normalprice}
            </p>
            <p className="text-md text-yellow-500">
              Save {card.saveprice}
            </p>
          </div>
          <hr className="border-t border-amber-200 mb-6" />
          <div className="text-sm text-white mb-2 text-end">
            Remaining: {card.remaining}
          </div>
        </div>
      ))}
    </div>
  );
}
