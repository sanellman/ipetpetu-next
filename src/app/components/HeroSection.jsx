export default function HeroSection() {
  return (
    <section className="bg-[#fff8dc] py-12 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          💛 ยินดีต้อนรับสู่โลกของ Petpet
        </h1>
        <p className="text-lg md:text-xl text-[#4a3f2f] mb-6">
          พื้นที่แห่งรอยยิ้ม ความน่ารัก และพลังใจจาก Petpet สู่แฟน ๆ ทุกคน 🐥
        </p>
        <img
          src="/images/petpet/petpet.jpg"
          alt="Petpet"
          className="mx-auto rounded-2xl shadow-xl w-64 md:w-80 border-4 border-[#f4e9c4]"
        />
        {/* Optional CTA */}
        <div className="mt-6">
          <a
            href="#about"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            รู้จัก Petpet มากขึ้น 💫
          </a>
        </div>
      </div>
    </section>
  );
}