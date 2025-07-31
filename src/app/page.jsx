"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import ScheduleSection from "./components/ScheduleSection";
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
    <div
  className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center px-4 py-10 text-[#4a3f2f]"
  style={{ backgroundImage: "url('/images/blackgrounds/flower2.jpg')" }}
>
      
      {/* Countdown Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-yellow-200 shadow-lg rounded-2xl p-6 mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
          🎂 Countdown to <br />
          <span className="text-yellow-600">Petpet's Day 🎉</span>
        </h1>
        <div className="flex justify-center gap-4 text-xl sm:text-2xl font-mono">
          <div className="bg-yellow-100 px-4 py-2 rounded-xl shadow-sm">{timeLeft.days}d</div>
          <div className="bg-yellow-100 px-4 py-2 rounded-xl shadow-sm">{timeLeft.hours}h</div>
          <div className="bg-yellow-100 px-4 py-2 rounded-xl shadow-sm">{timeLeft.minutes}m</div>
          <div className="bg-yellow-100 px-4 py-2 rounded-xl shadow-sm">{timeLeft.seconds}s</div>
        </div>
      </div>

      {/* Flip Card Game */}
      <section className="w-full max-w-4xl bg-white/90 border border-yellow-200 shadow-lg rounded-2xl p-2 mb-10">
        <ScheduleSection />
      </section>

      {/* Flip Card Game */}
      <section className="w-full max-w-4xl bg-white/90 border border-yellow-200 shadow-lg rounded-2xl p-6 mb-10">
        <FlipCardGame />
      </section>

      {/* Footer */}
      <footer className="text-center border-t border-yellow-200 pt-6 w-full max-w-3xl">
        <p className="text-sm mb-2">ติดตาม Petpet ได้ที่ 💛</p>
        <div className="flex justify-center gap-6 text-2xl text-[#4a3f2f]">
          <a href="https://www.facebook.com/petpet.euphonie" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-500 transition" />
          </a>
          <a href="https://instagram.com/petpet.euphonie" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 transition" />
          </a>
          <a href="https://x.com/petpet_euphonie" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="hover:text-black transition" />
          </a>
          <a href="https://www.tiktok.com/@petpet.euphonie" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="hover:text-black transition" />
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-400">© 2025 Petpet Fan Project</p>
      </footer>
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
    <Layout>
      <HeroSection />
      <AboutSection />
      <GallerySection />
    </Layout>
  );
}
