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
import ExpensesTab from "./components/ExpensesTab"; // ปรับ path ให้ถูกตามโครงสร้างโปรเจค

const TARGET_DATE = new Date("2025-09-16T00:00:00+07:00");

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("schedule");

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
      {/* Tabs */}
      <div className="w-full max-w-4xl bg-white/90 border border-yellow-200 shadow-lg rounded-2xl mb-10">
        <div className="flex justify-around border-b border-yellow-200">
          <button
            className={`flex-1 py-3 font-semibold ${activeTab === "schedule" ? "bg-yellow-100" : ""}`}
            onClick={() => setActiveTab("schedule")}
          >
            📅 Schedule
          </button>
          <button
            className={`flex-1 py-3 font-semibold ${activeTab === "expenses" ? "bg-yellow-100" : ""}`}
            onClick={() => setActiveTab("expenses")}
          >
            💸 Expenses
          </button>
          <button
            className={`flex-1 py-3 font-semibold ${activeTab === "flipcard" ? "bg-yellow-100" : ""}`}
            onClick={() => setActiveTab("flipcard")}
          >
            🃏 Flip Card Game
          </button>
        </div>
        <div className="p-3">
          {activeTab === "schedule" && <ScheduleSection />}
          {activeTab === "flipcard" && <FlipCardGame />}
          {activeTab === "expenses" && <ExpensesTab />}
        </div>
      </div>

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

// ----------------- Video Modal -----------------
function VideoModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
      onClick={onClose} // กดพื้นที่นอก ปิด modal
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 sm:w-4/5 md:w-2/3 lg:max-w-[50%] relative"
        onClick={(e) => e.stopPropagation()} // กันไม่ให้ปิดเวลาคลิกใน modal
      >
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        {/* วิดีโอ */}
        <div className="p-4">
          <video
            src="/videos/2025/petpetbd2025r.mp4"
            controls
            autoPlay
            muted
            playsInline
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const now = new Date();
    if (now >= TARGET_DATE) {
      setShowMain(true);
      setShowVideo(true); // 🎥 เปิด modal อัตโนมัติ
    }
  }, []);

  if (!isClient) return null;
  if (showMain) return <Countdown />;

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <GallerySection />
      {/* Modal Video */}
      <VideoModal show={showVideo} onClose={() => setShowVideo(false)} />
    </Layout>
  );
}