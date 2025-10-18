import { useState } from "react";
import { cardDetails } from "../util/cardDetails";

// (เราใช้ typeof cardDetails[0] เพื่อบอก TypeScript ว่า
// state นี้จะมีหน้าตาเหมือน object 1 ชิ้นใน array)
type CardType = (typeof cardDetails)[0];

// --- 1. ค่าคงที่สำหรับตั้งค่า Spinner ---

// ความกว้างของ Card แต่ละใบ (px)
const ITEM_WIDTH_PX = 150;
// Margin ซ้ายขวา (mx-1 = 4px * 2 = 8px)
const ITEM_MARGIN_PX = 8;
// ความกว้างรวมของ 1 ไอเทม
const TOTAL_ITEM_WIDTH = ITEM_WIDTH_PX + ITEM_MARGIN_PX;
// ความยาวของแถบหมุน (จำนวนไอเทม)
const REEL_LENGTH = 60; // (ใช้ค่า 60 ของคุณ)
// "ตำแหน่ง" ที่เราจะวางผู้ชนะ (index ที่ 27 = ไอเทมชิ้นที่ 28)
const WINNER_INDEX = 39;

export default function CaseSpinner() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<CardType | null>(null);

  // State สำหรับเก็บ "แถบหมุน" ที่เราสร้างขึ้น
  const [reelItems, setReelItems] = useState<CardType[]>([]);
  
  // --- [แก้ไขข้อ 1] ---
  // เปลี่ยนจาก useState(0) เป็น state object ที่เก็บ style
  const [spinStyle, setSpinStyle] = useState<React.CSSProperties>({
    transform: 'translateX(0px)',
    transition: 'none',
  });

  // --- 2. ฟังก์ชัน Helper --- (เหมือนเดิม)

  // 2.1 สุ่มไอเทม 1 ชิ้นจาก Pool (6 ชิ้น)
  const pickWinner = (): CardType => {
    const randomIndex = Math.floor(Math.random() * cardDetails.length);
    return cardDetails[randomIndex];
  };

  // 2.2 สร้างแถบหมุน "ปลอม"
  const generateReel = (winner: CardType): CardType[] => {
    const reel: CardType[] = [];
    for (let i = 0; i < REEL_LENGTH; i++) {
      if (i === WINNER_INDEX) {
        // "วางยา" ผู้ชนะไว้ที่ตำแหน่ง WINNER_INDEX
        reel.push(winner);
      } else {
        // ตำแหน่งอื่น สุ่มใส่
        reel.push(pickWinner());
      }
    }
    return reel;
  };

  // --- 3. ฟังก์ชันหลัก: เมื่อกดปุ่ม "สุ่ม" ---
  // --- [แก้ไขข้อ 2] --- (อัปเดต Logic ทั้งหมด)
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner(null); // เคลียร์ผู้ชนะเก่า (ถ้ามี)

    // 3.1 (Reset) 
    // สั่ง "วาร์ป" กลับไปที่ 0 ทันที (เพราะ transition: 'none')
    setSpinStyle({ 
      transition: 'none', 
      transform: 'translateX(0px)' 
    });

    // 3.2 สุ่มผู้ชนะ "ตัวจริง"
    const newWinner = pickWinner();

    // 3.3 สร้างแถบหมุนใหม่ โดย "วางยา" ผู้ชนะ
    const newReel = generateReel(newWinner);
    setReelItems(newReel);

    // 3.4 คำนวณตำแหน่งที่จะหยุด
    // (ความกว้าง Container / 2) - (ตำแหน่งกลางของ Winner Item)
    
    // (max-w-3xl คือ 768px)
    const containerCenter = 768 / 2; // (อัปเดตจาก 640 เป็น 768)
    
    // ตำแหน่งขอบซ้ายของ Winner
    const winnerLeftEdge = WINNER_INDEX * TOTAL_ITEM_WIDTH;
    // ตำแหน่งกึ่งกลางของ Winner
    const winnerCenter = winnerLeftEdge + TOTAL_ITEM_WIDTH / 2;

    // (Optional) สุ่ม "Jitter" เล็กน้อย (ซ้าย/ขวา 20%) ให้ดูไม่เป๊ะเกินไป
    const jitter = (Math.random() - 0.5) * (TOTAL_ITEM_WIDTH * 0.4);

    // เราต้องเลื่อนไปทางซ้าย (ค่าลบ)
    const stopPosition = -(winnerCenter - containerCenter + jitter);

    // 3.5 สั่งให้ "เริ่มหมุน" (สำคัญ: ใช้ setTimeout 50ms)
    // "รอ" ให้ React ทำ Step 3.1 (Reset) ให้เสร็จก่อน
    setTimeout(() => {
      // ค่อยสั่งให้ "หมุน" (เพิ่ม transition + ตำแหน่งหยุด)
      setSpinStyle({
        transform: `translateX(${stopPosition}px)`,
        transition: 'transform 5000ms ease-out' // 5000ms จากโค้ดเดิมของคุณ
      });
    }, 50); // หน่วงเวลาเล็กน้อย (50ms)

    // 3.6 ตั้งเวลา "หลังหมุนจบ"
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(newWinner); // แสดงผลผู้ชนะ
      
      // "ล็อค" ตำแหน่งที่หยุดไว้ (และเอา transition ออก)
      setSpinStyle({
        transform: `translateX(${stopPosition}px)`,
        transition: 'none'
      });

    }, 5050); // 5000ms (duration) + 50ms (delay)
  };

  return (
    <div className="w-full text-center py-10">
      {/* 4. กรอบแสดงผล (Viewport) */}
      <div className="relative w-full max-w-3xl h-48 mx-auto bg-gray-900/50 rounded-lg overflow-hidden ring-2 ring-gray-700">
        {/* "ลูกศร" ชี้ตำแหน่งกลาง */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-yellow-400 z-10 shadow-lg shadow-yellow-400/50"></div>

        {/* 5. แถบหมุน (The Reel) */}
        {/* --- [แก้ไขข้อ 3] --- */}
        <div
          // ลบ className ที่ควบคุม transition
          className="flex h-full items-center"
          // เพิ่ม style={spinStyle}
          style={spinStyle}
        >
          {reelItems.map((item, index) => (
            <div
              key={index}
              // ใช้ w-[150px] และ mx-1 ตามค่าคงที่
              className="flex-shrink-0 w-[150px] h-40 mx-1 p-2 
                         border-2 border-gray-600 bg-gray-800 rounded-md
                         flex flex-col items-center justify-center"
            >
              <img src={item.image} alt="" className="w-24 h-24 object-cover" />
              <span className="text-white text-xs mt-2 truncate w-full">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. ปุ่มควบคุม */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-10 text-2xl rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {isSpinning ? "กำลังสุ่ม..." : "เปิดกล่อง!"}
      </button>

      {/* 7. แสดงผลผู้ชนะ (เมื่อหมุนจบ) */}
      {winner && !isSpinning && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-yellow-400">
            คุณได้: {winner.title}!
          </h2>
        </div>
      )}
    </div>
  );
}