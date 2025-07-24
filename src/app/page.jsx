"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FlipCardGame from "./components/FlipCardGame";

const TARGET_DATE = new Date("2025-09-16T00:00:00+07:00");

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;
  if (timeLeft.total <= 0) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#fffbe7] text-[#4a3f2f] px-4 py-10 space-y-10">
      
      {/* Countdown */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          🎂 Countdown to Petpet's day 🎉
        </h1>
        <div className="text-2xl sm:text-3xl font-mono flex gap-4 justify-center">
          <span>{timeLeft.days}D</span>
          <span>{timeLeft.hours}H</span>
          <span>{timeLeft.minutes}m</span>
          <span>{timeLeft.seconds}s</span>
        </div>
      </div>

      {/* Flip Card Game */}
      <section className="w-full max-w-3xl">
        <FlipCardGame />
      </section>
    </div>
  );
}

function getTimeLeft() {
  const now = new Date();
  const total = TARGET_DATE - now;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const now = new Date();
    setShowMain(now >= TARGET_DATE);
  }, []);

  useEffect(() => {
  let timer;
  if (isRunning) {
    timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }
  return () => clearInterval(timer);
}, [isRunning]);

  if (!isClient) return null;
  if (!showMain) return <Countdown />;

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#fffbe7] text-[#4a3f2f] px-6 py-12">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold mb-4">🎉 สุขสันต์วันเกิด Petpet 🎂</h1>
        <p className="text-xl max-w-2xl mb-8 leading-relaxed">
          ขอให้ปีนี้เป็นปีที่สดใสเหมือนแสงแดดในวันที่ฝนตก 💛<br />
          ขอให้ความน่ารักของ Petpet ส่งพลังให้แฟนๆ ทุกคน
        </p>
        <img
          src="/images/petpet/petpet.jpg"
          alt="Petpet"
          className="rounded-2xl shadow-xl w-full max-w-sm border-4 border-[#f4e9c4]"
        />
        <p className="mt-8 text-sm text-gray-600">With love from your fans 🐥</p>
      </div>

      {/* Flip card game */}
      <section className="mt-12">
        <FlipCardGame />
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center border-t border-yellow-200 pt-6">
        <p className="text-sm mb-2">ติดตาม Petpet ได้ที่ 💛</p>
        <div className="flex justify-center gap-6 text-2xl text-[#4a3f2f]">
          <a href="https://www.facebook.com/petpet.euphonie" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-500 transition" />
          </a>
          <a href="https://instagram.com/petpet.euphonie" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 transition" />
          </a>
          <a href="https://www.x.com/petpet_euphonie" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="hover:text-red-500 transition" />
          </a>
          <a href="https://www.tiktok.com/@petpet.euphonie" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="hover:text-red-500 transition" />
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-400">© 2025 Petpet Fan Project</p>
      </footer>
    </main>
  );
}
