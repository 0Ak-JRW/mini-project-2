import { useParams } from "react-router-dom";
// import { cardDetails } from "../util/cardDetails";
import { useEffect, useState } from "react";

export default function Details() {
  const { id } = useParams();
  const [filteredItem, setFilteredItem] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const getData = JSON.parse(localStorage.getItem('itemList') || '[]');
      const item = getData.find((item: any, idx: number) => item.id === Number(id));
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const itemId = item.id;
      const favoriteStatus = favorites.some((favItem: any) => favItem.id === itemId);
      setIsFavorite(favoriteStatus);
      setFilteredItem(item);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id, isFavorite]);





  function favoriteHandler(data: any) {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    console.log("favorites", favorites);
    const itemId = data.id;
    const isFavorite = favorites.some((item: any) => item.id === itemId);

    // console.log("isFavorite", isFavorite);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (item: any) => item.id !== itemId
      );
      // console.log("updatedFavorites", updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      // return
    } else {
      favorites.push(data);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      // return
    }
  }

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
                <span className="bg-blue-600 text-xs px-3 py-1 rounded-full">
                  {filteredItem.groups.toUpperCase()}
                </span>
                <span className="bg-purple-600 text-xs px-3 py-1 rounded-full">
                  {filteredItem.msg_groups}
                </span>
              </div>

              <h1
                className="text-4xl font-bold mb-4"
                dangerouslySetInnerHTML={{ __html: filteredItem.name }}
              ></h1>

              <p className="text-gray-300 text-lg mb-6">
                {filteredItem.name_groups}
              </p>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg mb-6">
                <div className="flex items-baseline gap-4">
                  <p className="text-5xl font-bold text-yellow-400">
                    ฿{filteredItem.price}
                  </p>
                  {filteredItem.price_agent && (
                    <p className="text-xl text-gray-400">
                      Agent: ฿{filteredItem.price_agent}
                    </p>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p
                  className={`text-lg font-semibold ${filteredItem.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                >
                  {filteredItem.amount > 0
                    ? `✓ In Stock: ${filteredItem.amount} available`
                    : "✗ Out of Stock"}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  favoriteHandler(filteredItem);
                }}
                className="w-full md:w-auto px-8 py-4 rounded-lg font-bold text-lg cursor-pointer transition-all bg-gradient-to-r from-yellow-300 to-yellow-600 hover:from-yellow-400 hover:to-yellow-700 shadow-lg hover:shadow-xl"
              >
                {/* Add to Favorite */}
                {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-12 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Product Details
            </h2>
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
