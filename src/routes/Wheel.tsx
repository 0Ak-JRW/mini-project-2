import { useEffect, useState } from "react";
import { cardDetails } from "../util/cardDetails";
import axios from "axios";
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

type CardType = (typeof cardDetails)[0];
const ITEM_WIDTH_PX = 150;
const ITEM_MARGIN_PX = 8;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH_PX + ITEM_MARGIN_PX;
const REEL_LENGTH = 60;
const WINNER_INDEX = 39;

export default function CaseSpinner() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Item | null>(null);

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
        setItemList(response.data);
        console.log(response);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const [reelItems, setReelItems] = useState<Item[]>([]);

  const [spinStyle, setSpinStyle] = useState<React.CSSProperties>({
    transform: 'translateX(0px)',
    transition: 'none',
  });

  const pickWinner = (): Item => {
    const randomIndex = Math.floor(Math.random() * itemList.length);

    return itemList[randomIndex];
  };

  const generateReel = (winner: Item): Item[] => {
    const reel: Item[] = [];
    for (let i = 0; i < REEL_LENGTH; i++) {
      if (i === WINNER_INDEX) {
        reel.push(winner);
      } else {
        reel.push(pickWinner());
      }
    }
    return reel;
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner(null);

    setSpinStyle({
      transition: 'none',
      transform: 'translateX(0px)'
    });

    const newWinner = pickWinner();

    const newReel = generateReel(newWinner);
    setReelItems(newReel);

    const containerCenter = 768 / 2;

    const winnerLeftEdge = WINNER_INDEX * TOTAL_ITEM_WIDTH;
    const winnerCenter = winnerLeftEdge + TOTAL_ITEM_WIDTH / 2;

    const jitter = (Math.random() - 0.5) * (TOTAL_ITEM_WIDTH * 0.4);

    const stopPosition = -(winnerCenter - containerCenter + jitter);

    setTimeout(() => {
      setSpinStyle({
        transform: `translateX(${stopPosition}px)`,
        transition: 'transform 5000ms ease-out'
      });
    }, 50);

    setTimeout(() => {
      setIsSpinning(false);
      setWinner(newWinner);
      setSpinStyle({
        transform: `translateX(${stopPosition}px)`,
        transition: 'none'
      });

    }, 5050);
  };

  return (
    <div className="min-h-screen w-full from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center py-10 px-4 ">
      <div className="mb-8 text-center">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mb-2">
        Mystery Box Spinner
      </h1>
      <p className="text-gray-400 text-lg">Try your luck and win amazing prizes!</p>
      </div>
      <div className="relative w-full max-w-4xl">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 blur-3xl -z-10"></div>

      <div className="relative w-full h-56 mx-auto bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-900 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-900 to-transparent z-20 pointer-events-none"></div>

        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-yellow-400 via-pink-500 to-purple-500 z-10 shadow-lg shadow-yellow-400/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-yellow-400"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-purple-500"></div>
        </div>

        <div
        className="flex h-full items-center"
        style={spinStyle}
        >
        {reelItems.map((item, index) => (
          <div
          key={index}
          className="flex-shrink-0 w-[150px] h-44 mx-1 p-3 
           border-2 border-gray-600/50 bg-gradient-to-br from-gray-700/80 to-gray-800/80 
           backdrop-blur-sm rounded-xl
           flex flex-col items-center justify-center
           shadow-lg hover:border-yellow-400/50 transition-all duration-300
           hover:scale-105 hover:shadow-yellow-400/20"
          >
          <div className="w-28 h-28 rounded-lg overflow-hidden mb-2 border border-gray-600/30 shadow-inner">
            <img src={item.img} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="text-white text-sm font-medium text-center truncate w-full px-1"
           dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
            item.name
              ?.replace(/\r?\n/g, '')
              .replace(/<br\s*>/gi, '<br/>')
            )
          }}>
          </span>
          </div>
        ))}
        </div>
      </div>
      </div>
      <button
      onClick={handleSpin}
      disabled={isSpinning}
      className="mt-10 relative group"
      >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 
          text-gray-900 font-bold py-4 px-12 text-2xl rounded-xl 
          transition-all duration-300 transform hover:scale-105 active:scale-95
          disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed 
          disabled:text-gray-400 shadow-2xl">
        {isSpinning ? (
        <span className="flex items-center gap-3">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          กำลังสุ่ม...
        </span>
        ) : (
        <span className="flex items-center gap-2">
          ✨ เปิดกล่อง! ✨
        </span>
        )}
      </div>
      </button>
      {winner && !isSpinning && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
        <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-yellow-400/50 rounded-3xl p-10 shadow-2xl max-w-md w-full mx-4 animate-[bounce-in_0.6s_ease-out]">
        <button
          onClick={() => setWinner(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-500/20 blur-2xl -z-10 rounded-3xl"></div>

        <div className="text-center">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mb-4 animate-pulse">
          ยินดีด้วย!
          </h2>
          <p className="text-2xl text-white font-semibold mb-3">คุณได้รับ:</p>
          <p className="text-4xl font-bold text-yellow-400 mb-6" 
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
            winner.name
              ?.replace(/\r?\n/g, '')
              .replace(/<br\s*>/gi, '<br/>')
            )
          }}
          ></p>
          <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-yellow-400/70 shadow-2xl shadow-yellow-400/50 mb-6">
          <img src={winner.img} alt={winner.name} className="w-full h-full object-cover" />
          </div>
          <button
          onClick={() => setWinner(null)}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 
               text-gray-900 font-bold py-3 px-8 text-xl rounded-xl 
               transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
          >
          ปิด
          </button>
        </div>
        </div>
      </div>
      )}

      <style>{`
      @keyframes bounce-in {
        0% {
        transform: scale(0) translateY(100px);
        opacity: 0;
        }
        50% {
        transform: scale(1.1) translateY(-20px);
        }
        100% {
        transform: scale(1) translateY(0);
        opacity: 1;
        }
      }
      @keyframes fade-in {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
      }
      .animate-fade-in {
        animation: fade-in 0.3s ease-out;
      }
      `}</style>
    </div>
  );
}