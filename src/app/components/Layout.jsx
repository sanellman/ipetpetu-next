import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#fffbe7] text-[#4a3f2f] flex flex-col">
      <header className="bg-yellow-100 shadow p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          {/* Logo */}
          <img
            src="/images/petpet/logo_img.png" // 👈 ใช้ path รูปโลโก้ของคุณจริง ๆ
            alt="iPetpetu Logo"
            className="w-10 h-10 rounded-full shadow"
          />
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-[#4a3f2f]">
            iPetpetu
          </h1>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-yellow-50 border-t border-yellow-200 py-6 text-center text-sm text-gray-600">
        <p>ติดตาม Petpet ได้ที่ 💛</p>
        {/* ลิงก์ Social แบบเดิม */}
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
        <p className="mt-2">© 2025 Petpet Fan Project</p>
      </footer>
    </div>
  );
}