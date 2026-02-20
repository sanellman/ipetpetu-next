"use client";

import { motion } from "framer-motion";

const INFO_CARDS = [
  { icon: "🐰", label: "ชื่อเล่น / Nickname", value: "เพดเพด【PetPet ツーペット】" },
  { icon: "🌼", label: "สีประจำตัว / Color", value: "สีครีม" },
  { icon: "🎂", label: "วันเกิด / Birthday", value: "16 SEP" },
  { icon: "📚", label: "งานอดิเรก / Hobbies", value: "อ่านหนังสือ, เล่นเกม, ฟังเพลง" },
  { icon: "✨", label: "สิ่งที่ชอบ / Favorites", value: "สุนัข, มินเนี่ยน, โปเชโกะ, แคร์แบร์, ไวท์มอลต์" },
  { icon: "💬", label: "MBTI", value: "INFJ" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-6 bg-white text-[#4a3f2f]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          💫 เกี่ยวกับ Petpet
        </motion.h2>

        {/* Info cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {INFO_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              className="bg-[#fffef3] border border-yellow-100 rounded-2xl p-4 shadow-sm flex gap-3 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="text-2xl mt-0.5">{card.icon}</span>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                  {card.label}
                </p>
                <p className="font-semibold text-[#4a3f2f]">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Japanese intro */}
        <motion.div
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-center text-sm md:text-base leading-relaxed text-gray-700 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-yellow-700 font-semibold mb-2 not-italic">✦ Japanese Introduction ✦</p>
          Euphonie☆新メンバー<br />
          クリーム色担当「ツーペット🐰」と申します。<br />
          また、皆さんと会えて嬉しいです！これから頑張っていくので、応援よろしくおねがいします！
        </motion.div>

        {/* Thai intro quote */}
        <motion.blockquote
          className="mt-6 border-l-4 border-yellow-400 pl-4 text-gray-500 italic text-sm md:text-base"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          " สวัสดีค่ะ เพดเพด🐰ค่ะ ดีใจที่ได้เจอทุกคนอีกครั้งนะคะ หลังจากนี้ก็ขอฝากเนื้อฝากตัวด้วยน้า-) มาพยายามไปด้วยกันจนสุดทางเลยนะคะ! "
        </motion.blockquote>
      </div>
    </section>
  );
}
