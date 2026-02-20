import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#fffef3] text-[#4a3f2f] flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-yellow-100 shadow-sm py-3 px-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <img
            src="/images/petpet/logo_img.png"
            alt="iPetpetu Logo"
            className="w-9 h-9 rounded-full shadow-sm"
          />
          <h1 className="text-xl md:text-2xl font-bold text-[#4a3f2f] tracking-wide">
            iPetpetu
          </h1>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white border-t border-yellow-100 py-6 text-center text-sm text-gray-500">
        <p className="mb-2">ติดตาม Petpet ได้ที่ 💛</p>
        <div className="flex justify-center gap-6 text-2xl text-[#4a3f2f] mt-1">
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
        <p className="mt-3 text-xs text-gray-400">© 2025 Petpet Fan Project</p>
      </footer>
    </div>
  );
}
