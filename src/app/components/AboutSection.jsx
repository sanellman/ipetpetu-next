"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative py-20 px-6 text-[#4a3f2f] bg-gradient-to-b from-yellow-50 via-white to-yellow-100 overflow-hidden"
    >
      {/* Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-28 h-28 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-36 h-36 bg-pink-300 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          💫 เกี่ยวกับ Petpet
        </motion.h2>
        
        <motion.ul
          className="text-lg md:text-xl leading-relaxed mb-12 space-y-4 text-left list-disc list-inside max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <li><strong>ชื่อเล่น/Nickname:</strong> เพดเพด【PetPet ツーペット】</li>
          <li><strong>สีประจำตัว/Color:</strong> สีครีม 🌼</li>
          <li><strong>วันเกิด/Birthday:</strong> 16 SEP 🎂</li>
          <li><strong>งานอดิเรก/Hobbies:</strong> อ่านหนังสือ 📚, เล่นเกม 🎮, ฟังเพลง 🎶</li>
          <li><strong>สิ่งที่ชอบ/Favorite:</strong> สุนัข🐶, มินเนี่ยน, โปเชโกะ, แคร์แบร์, ไวท์มอลต์, สารพัดของกุ๊กกิ๊ก ✨</li>
          <li><strong>แนะนำตัว/Introduction:</strong> 
            <span className="italic text-yellow-700"> สวัสดีค่ะ เพดเพด🐰ค่ะ ดีใจที่ได้เจอทุกคนอีกครั้งนะคะ หลังจากนี้ก็ขอฝากเนื้อฝากตัวด้วยน้า-) มาพยายามไปด้วยกันจนสุดทางเลยนะคะ! </span>
          </li>
        </motion.ul>

        {/* Japanese intro แยกออกมาให้สวย ๆ */}
        <motion.div
          className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm md:text-base italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Euphonie☆新メンバー <br />
          クリーム色担当「ツーペット🐰」と申します。<br />
          また、皆さんと会えて嬉しいです！これから頑張っていくので、応援よろしくおねがいします！
        </motion.div>
      </div>
    </section>
  );
}