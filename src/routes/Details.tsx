import { useParams } from "react-router-dom";
import { cardDetails } from "../components/CardItem";

export default function Details() {
  const { id } = useParams();
  const card = cardDetails.find(c => c.id === Number(id));
  if (!card) {
    return <div>Product not found</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-4">{card.title}</h1>
      <img 
        src={card.image} 
        alt={card.title} 
        className="w-1/2 rounded-lg shadow-lg" 
      />
      <p className="text-xl mt-4">{card.description}</p>
      
      <div className="mt-6">
        <p className="text-3xl font-bold">{card.price}</p>
        <p className="text-lg line-through">{card.normalprice}</p>
        <p className="text-lg text-yellow-500">You save {card.saveprice}</p>
      </div>
      
      <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
        Add to Cart
      </button>
    </div>
  );
}
