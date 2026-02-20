"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-amber-50/60 to-[#fefdf8] py-10 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">

        {/* Image */}
        <motion.div
          className="relative shrink-0 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-amber-200/60 rounded-3xl blur-2xl scale-105" />
          <motion.img
            src="/images/petpet/petpethero.jpg"
            alt="Petpet"
            className="relative w-52 md:w-64 rounded-3xl shadow-md border-[3px] border-amber-200/70 object-cover"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="text-center md:text-left flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.span
            className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Euphonie☆
          </motion.span>

          <motion.h1
            className="text-2xl md:text-3xl font-bold mb-3 text-[#44382b] leading-snug"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ꒰ ᴘᴇᴛᴘᴇᴛ ᴇᴜᴘʜᴏɴɪᴇ☆🐰 ꒱﹆
            <br />
            <span className="text-amber-600 text-xl md:text-2xl">クリーム色担当 🤍</span>
          </motion.h1>

          <motion.p
            className="text-base text-stone-400 italic mb-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            ‧₊ ᴍʏ ᴡʜᴏʟᴇ ᴡᴏʀʟᴅ ɪɴꜰᴊ ˚ ༘
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-amber-700 font-medium"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            ꒰ ✊🏻📦🌻 ꒱ อยู่ด้วยกันไปจนสุดทางนะ 💛
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
