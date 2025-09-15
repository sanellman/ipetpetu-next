export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative py-16 px-4 text-[#4a3f2f] bg-gradient-to-b from-yellow-50 via-white to-yellow-100"
    >
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">💫 เกี่ยวกับ Petpet</h2>
        
        <ul className="text-lg md:text-xl leading-relaxed mb-8 space-y-4 text-left list-disc list-inside">
          <li>ศิลปินที่เต็มไปด้วย <span className="text-yellow-600 font-semibold">ความน่ารักและความสดใส</span></li>
          <li>เปล่งประกายด้วยความสามารถทั้งการร้องและการเต้น 🎶</li>
          <li>เป็นพลังใจสำคัญให้แฟน ๆ ทุกคน 💛</li>
          <li>แฟน ๆ สร้างเว็บนี้ขึ้นเพื่อ <span className="italic">ฉลองวันเกิด</span> ของเธอ 🎂</li>
        </ul>

        <img
          src="/images/petpet/petpet2.jpg"
          alt="About Petpet"
          className="rounded-xl shadow-lg mx-auto w-full max-w-md border-4 border-yellow-200"
        />
      </div>
    </section>
  );
}