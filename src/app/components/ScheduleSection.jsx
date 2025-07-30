"use client";
import { useState } from "react";

const scheduleData = {
  "2025-07-30": [
    {
      group: "Euphonie",
      stageTime: "13:00",
      chekiTime: "14:00",
      note: "เวทีหลักงาน IdolFest",
    },
    {
      group: "MIRAISM",
      stageTime: "15:30",
      chekiTime: "16:15",
      note: "บูธ A2 โซนด้านนอก",
    },
  ],
  "2025-07-31": [
    {
      group: "SIAM☆DREAM",
      stageTime: "12:00",
      chekiTime: "13:00",
      note: "ขึ้นเวทีรอง แต่มีไลฟ์พิเศษ",
    },
  ],
};

export default function ScheduleSection() {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);
  const events = scheduleData[selectedDate] || [];

  return (
    <section id="schedule" className="bg-[#fffef3] py-16 px-4 text-[#4a3f2f]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">📅 ตารางงานไอดอล</h2>

        <input
          type="date"
          className="border rounded px-4 py-2 mb-6 text-sm shadow"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {events.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีตารางงานในวันนี้</p>
        ) : (
          <div className="space-y-4 text-left">
            {events.map((event, index) => (
              <div key={index} className="bg-yellow-100 p-4 rounded-lg shadow">
                <p className="text-lg font-semibold">{event.group}</p>
                <p className="text-sm mt-1">
                  🎤 <strong>Stage:</strong> {event.stageTime} &nbsp;&nbsp;&nbsp;
                  📸 <strong>Cheki:</strong> {event.chekiTime}
                </p>
                <p className="text-sm text-gray-700 mt-1">📝 {event.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}