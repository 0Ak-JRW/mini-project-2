import { useParams } from "react-router-dom";
// import { cardDetails } from "../util/cardDetails";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Details() {
  const { id } = useParams();
  // const card = cardDetails.find(c => c.id === Number(id));
  if (!id) {
    return <div>Product not found</div>;
  }

  const [filteredItem, setFilteredItem] = useState<any>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE}`, {
          params: {
            action: "getpack" ,
          },
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });
        // setItemList(response.data);
        // console.log(response);

        console.log(response.data);
        const filteredData = response.data.filter((item: any, idx: number) => idx === Number(id));
        setFilteredItem(filteredData[0] || null);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);


  return (
    <div className="text-white">
      {filteredItem ? (
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Image Section */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <img 
                  src={filteredItem.img_cover} 
                  alt={filteredItem.name} 
                  className="w-full rounded-lg shadow-2xl border-4 border-gray-700" 
                />
                <img 
                  src={filteredItem.img_icon} 
                  alt="icon"
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border-4 border-gray-800 shadow-xl" 
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-600 text-xs px-3 py-1 rounded-full">{filteredItem.groups.toUpperCase()}</span>
                <span className="bg-purple-600 text-xs px-3 py-1 rounded-full">{filteredItem.msg_groups}</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: filteredItem.name }}></h1>
              
              <p className="text-gray-300 text-lg mb-6">{filteredItem.name_groups}</p>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg mb-6">
                <div className="flex items-baseline gap-4">
                  <p className="text-5xl font-bold text-yellow-400">฿{filteredItem.price}</p>
                  {filteredItem.price_agent && (
                    <p className="text-xl text-gray-400">Agent: ฿{filteredItem.price_agent}</p>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p className={`text-lg font-semibold ${filteredItem.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {filteredItem.amount > 0 ? `✓ In Stock: ${filteredItem.amount} available` : '✗ Out of Stock'}
                </p>
              </div>

              {/* Action Button */}
              <button 
                disabled={filteredItem.amount === 0}
                className={`w-full md:w-auto px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                  filteredItem.amount > 0 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                {filteredItem.amount > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-12 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Product Details</h2>
            <div 
              className="text-gray-300 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: filteredItem.msg }}
            ></div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400">Expiry:</p>
              <p className="text-xl font-semibold">{filteredItem.exp} day(s)</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400">Type Code:</p>
              <p className="text-xl font-semibold">{filteredItem.type_code}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-2xl text-gray-400">Loading...</p>
        </div>
      )}
    </div>
  );
}
