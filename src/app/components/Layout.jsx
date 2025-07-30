export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#fffbe7] text-[#4a3f2f] flex flex-col">
      <header className="bg-yellow-100 shadow p-4">
        <h1 className="text-2xl font-bold text-center">💛 Petpet Official</h1>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-yellow-50 border-t border-yellow-200 py-6 text-center text-sm text-gray-600">
        <p>ติดตาม Petpet ได้ที่ 💛</p>
        {/* ลิงก์ Social แบบเดิม */}
        <p className="mt-2">© 2025 Petpet Fan Project</p>
      </footer>
    </div>
  );
}