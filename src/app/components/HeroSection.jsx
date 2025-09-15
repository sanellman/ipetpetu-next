"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-yellow-100 via-white to-yellow-50 py-16 px-6 overflow-hidden">
      {/* Decoration circles */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 blur-3xl"></div>

      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 relative z-10">
        
        {/* Text Content */}
        <motion.div
          className="text-center md:text-left md:flex-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#4a3f2f] leading-snug">
            💛 ยินดีต้อนรับสู่โลกของ{" "}
            <motion.span
              className="text-yellow-600 drop-shadow-sm"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Petpet
            </motion.span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 italic">
            "เพราะทุกวันคือรอยยิ้มของ Petpet 🐥✨"
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative md:flex-1 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="/images/petpet/petpet.jpg"
            alt="Petpet"
            className="mx-auto rounded-2xl shadow-2xl w-full max-w-[420px] md:max-w-[500px] border-4 border-yellow-200"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </motion.div>
      </div>
    </section>
  );
}