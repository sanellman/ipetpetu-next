"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function GallerySection() {
  const images = [
    "/images/cards/card1.jpg",
    "/images/cards/card2.jpg",
    "/images/cards/card3.jpg",
    "/images/cards/card4.jpg",
    "/images/cards/card5.jpg",
    "/images/cards/card6.jpg",
    "/images/cards/card7.jpg",
    "/images/cards/card8.jpg",
    "/images/cards/card9.jpg",
    "/images/cards/card10.jpg",
    "/images/cards/card11.jpg",
    "/images/cards/card12.jpg",
    "/images/cards/card13.jpg",
    "/images/cards/card14.jpg",
    "/images/cards/card15.jpg",
    "/images/cards/card16.jpg",
    "/images/cards/card17.jpg",
    "/images/cards/card18.jpg",
    "/images/cards/card19.jpg",
    "/images/cards/card20.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRef = useRef(null);

  // Auto scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const speed = 0.5; // ปรับความเร็วได้ (px per frame)

    const scroll = () => {
      if (!scrollContainer) return;

      scrollAmount += speed;
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0; // รีเซ็ตกลับไปเริ่มใหม่
      }

      scrollContainer.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });

      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <section id="gallery" className="bg-[#fffbe7] py-16 px-4 text-[#4a3f2f]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">📸 แกลเลอรี่ Petpet</h2>

        <div className="overflow-x-auto" ref={scrollRef}>
          <div className="flex gap-4 px-2 pb-4">
            {images.map((src, index) => (
              <div
                key={index}
                className="min-w-[240px] sm:min-w-[280px] rounded-xl overflow-hidden shadow-md cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`Petpet ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Selected"
              width={1000}
              height={1000}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black/60 hover:bg-black rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}