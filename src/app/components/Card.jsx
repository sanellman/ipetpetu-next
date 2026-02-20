"use client";

import Image from "next/image";

export default function Card({ card, onClick }) {
  return (
    <div
      className="w-full aspect-[3/4] cursor-pointer [perspective:1000px]"
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          card.flipped || card.matched ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Back side */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-yellow-200 rounded-xl shadow-md flex items-center justify-center text-xl font-bold">
          
        </div>

        {/* Front side */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Image
            src={card.src}
            alt="card"
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}