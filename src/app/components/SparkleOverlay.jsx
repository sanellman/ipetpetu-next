"use client";

import { motion } from "framer-motion";

const SPARKLES = [
  /* large anchors */
  { x: "8%",  y: "12%", s: 9,  d: 0,    dur: 3.2 },
  { x: "92%", y: "9%",  s: 10, d: 0.4,  dur: 2.8 },
  { x: "78%", y: "45%", s: 11, d: 0.2,  dur: 3.6 },
  { x: "50%", y: "6%",  s: 8,  d: 1.0,  dur: 2.5 },
  { x: "28%", y: "38%", s: 9,  d: 0.1,  dur: 4.1 },
  /* medium */
  { x: "18%", y: "55%", s: 7,  d: 0.8,  dur: 4.0 },
  { x: "35%", y: "85%", s: 6,  d: 0.6,  dur: 3.9 },
  { x: "65%", y: "78%", s: 8,  d: 1.4,  dur: 3.1 },
  { x: "88%", y: "65%", s: 7,  d: 0.3,  dur: 4.2 },
  { x: "5%",  y: "80%", s: 7,  d: 1.1,  dur: 2.9 },
  { x: "95%", y: "32%", s: 6,  d: 0.7,  dur: 3.5 },
  { x: "42%", y: "22%", s: 7,  d: 1.6,  dur: 2.7 },
  { x: "72%", y: "18%", s: 6,  d: 0.9,  dur: 3.8 },
  { x: "58%", y: "92%", s: 7,  d: 1.3,  dur: 3.3 },
  { x: "15%", y: "28%", s: 7,  d: 0.5,  dur: 2.6 },
  /* extra fill */
  { x: "30%", y: "62%", s: 6,  d: 1.8,  dur: 3.4 },
  { x: "82%", y: "72%", s: 7,  d: 0.15, dur: 2.95 },
  { x: "47%", y: "48%", s: 5,  d: 2.1,  dur: 4.3 },
  { x: "60%", y: "15%", s: 8,  d: 0.55, dur: 3.0 },
  { x: "22%", y: "90%", s: 6,  d: 1.25, dur: 3.7 },
  { x: "96%", y: "52%", s: 7,  d: 0.85, dur: 2.6 },
  { x: "38%", y: "5%",  s: 6,  d: 1.95, dur: 3.15 },
  { x: "74%", y: "88%", s: 5,  d: 0.45, dur: 4.5 },
  { x: "12%", y: "42%", s: 8,  d: 1.05, dur: 2.85 },
  { x: "55%", y: "68%", s: 6,  d: 0.65, dur: 3.55 },
  /* tiny twinkles — fast */
  { x: "25%", y: "18%", s: 4,  d: 0.35, dur: 2.0 },
  { x: "68%", y: "30%", s: 4,  d: 1.55, dur: 1.9 },
  { x: "84%", y: "82%", s: 4,  d: 0.75, dur: 2.2 },
  { x: "44%", y: "95%", s: 4,  d: 2.35, dur: 1.8 },
  { x: "3%",  y: "50%", s: 4,  d: 1.45, dur: 2.1 },
];

export default function SparkleOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9997 }}
    >
      {SPARKLES.map((sp, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: sp.x, top: sp.y }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.3],
            rotate: [0, 60, 120],
          }}
          transition={{
            repeat: Infinity,
            duration: sp.dur,
            delay: sp.d,
            ease: "easeInOut",
          }}
        >
          <svg
            width={sp.s * 2}
            height={sp.s * 2}
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 0 L5.6 4.4 L10 5 L5.6 5.6 L5 10 L4.4 5.6 L0 5 L4.4 4.4 Z"
              fill="#d97706"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
