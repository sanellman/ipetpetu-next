export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 px-4 text-[#4a3f2f]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">💫 เกี่ยวกับ Petpet</h2>
        <p className="text-lg md:text-xl leading-relaxed mb-8">
          Petpet เป็นศิลปินที่เปล่งประกายทั้งความน่ารัก ความสดใส และความสามารถที่หลากหลาย
          ไม่ว่าจะเป็นการร้อง เต้น หรือการเป็นกำลังใจให้แฟน ๆ ทุกคน
          เว็บนี้ถูกสร้างขึ้นจากความรักของแฟน ๆ เพื่อเป็นพื้นที่ในการเฉลิมฉลองวันเกิดของเธอ
        </p>
        <img
          src="/images/petpet/petpet2.jpg"
          alt="About Petpet"
          className="rounded-xl shadow-lg mx-auto w-full max-w-md border-4 border-yellow-200"
        />
      </div>
    </section>
  );
}