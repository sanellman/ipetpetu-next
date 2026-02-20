"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-yellow-50 to-[#fffef3] py-12 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image — left on desktop, top on mobile */}
        <motion.div
          className="md:flex-1 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.img
            src="/images/petpet/petpethero.jpg"
            alt="Petpet"
            className="rounded-2xl shadow-xl w-full max-w-[360px] md:max-w-[460px] border-4 border-yellow-200"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Text — right on desktop, bottom on mobile */}
        <motion.div
          className="text-center md:text-left md:flex-1"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4 text-[#4a3f2f] leading-snug"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ꒰ ᴘᴇᴛᴘᴇᴛ ᴇᴜᴘʜᴏɴɪᴇ☆🐰 ꒱﹆
            <br />
            <span className="text-yellow-600 text-2xl md:text-3xl">クリーム色担当 🤍</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 italic mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            ‧₊ ᴍʏ ᴡʜᴏʟᴇ ᴡᴏʀʟᴅ ɪɴꜰᴊ ˚ ༘
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-yellow-700 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            ꒰ ✊🏻📦🌻 ꒱ อยู่ด้วยกันไปจนสุดทางนะ 💛
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
