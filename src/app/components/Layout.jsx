import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SparkleOverlay from "./SparkleOverlay";

function GrainOverlay() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9998, opacity: 0.07, mixBlendMode: "overlay" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.68"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen text-[#44382b] flex flex-col">
      {/* Background layers */}
      <GrainOverlay />
      <SparkleOverlay />

      {/* Navbar — full width frosted glass */}
      <header className="sticky top-0 z-30 bg-white/55 backdrop-blur-md border-b border-amber-100/50 shadow-sm py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <img
            src="/images/petpet/logo_img.png"
            alt="iPetpetu Logo"
            className="w-8 h-8 rounded-full shadow-sm ring-2 ring-amber-200/60"
          />
          <h1 className="text-lg md:text-xl font-bold text-[#44382b] tracking-wide">
            iPetpetu
          </h1>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white/50 backdrop-blur-sm border-t border-amber-100/60 py-6 text-center text-sm text-stone-400">
        <p className="mb-2 text-stone-500">ติดตาม Petpet ได้ที่ 💛</p>
        <div className="flex justify-center gap-6 text-2xl text-[#44382b] mt-1">
          <a href="https://www.facebook.com/petpet.euphonie" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-500 transition" />
          </a>
          <a href="https://instagram.com/petpet.euphonie" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 transition" />
          </a>
          <a href="https://x.com/petpet_euphonie" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="hover:text-stone-800 transition" />
          </a>
          <a href="https://www.tiktok.com/@petpet.euphonie" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="hover:text-stone-800 transition" />
          </a>
        </div>
        <p className="mt-3 text-xs text-stone-300">© 2025 Petpet Fan Project</p>
      </footer>
    </div>
  );
}
