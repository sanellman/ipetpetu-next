"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";

const STORAGE_KEY = "idolScheduleEvents";

export default function ScheduleSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [modalEvent, setModalEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const groupOptions = [
  { value: "ANGeVIL✟", label: "ANGeVIL✟" },
  { value: "Euphonie", label: "Euphonie" },
  { value: "HatoBito", label: "HatoBito" },
  { value: "IKINARI TELL ME", label: "IKINARI TELL ME" },
  { value: "Isekai", label: "Isekai" },
  { value: "KNIGHT✠RES", label: "KNIGHT✠RES" },
  { value: "KYLINZ", label: "KYLINZ" },
  { value: "Mirai Mirai", label: "Mirai Mirai" },
  { value: "Myujikku Majo", label: "Myujikku Majo" },
  { value: "Neko Pon!", label: "Neko Pon!" },
  { value: "NIKKO NIKKO", label: "NIKKO NIKKO" },
  { value: "Peach You", label: "Peach You" },
  { value: "Seishin Kakumei", label: "Seishin Kakumei" },
  { value: "Sora! Sora!", label: "Sora! Sora!" },
  { value: "STARRY NITE", label: "STARRY NITE" },
  { value: "Stellagrima", label: "Stellagrima" },
  { value: "SUMOMO", label: "SUMOMO" },
  { value: "The Glass Girls", label: "The Glass Girls" },
  { value: "Vinx", label: "Vinx" },
  { value: "Yami Yami", label: "Yami Yami" },
];

  // โหลด events จาก localStorage ตอน mount
  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem(STORAGE_KEY);
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        if (Array.isArray(parsedEvents)) {
          setEvents(parsedEvents);
        } else {
          setEvents([]);
        }
      } else {
        // ถ้าไม่มีใน localStorage ให้ใส่ event เริ่มต้น
        setEvents([]);
      }
    } catch {
      setEvents([]);
    }
  }, []);

  // บันทึก events ลง localStorage ทุกครั้งที่ events เปลี่ยน
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleAddClick = () => {
    setIsEditing(true);
    setModalEvent({
      group: "",
      date: format(new Date(), "yyyy-MM-dd"),
      stageTimeStart: "",
      stageTimeEnd: "",
      chekiTimeStart: "",
      chekiTimeEnd: "",
      note: "",
    });
  };

  const handleEventClick = (event) => {
    setIsEditing(false);
    const [stageTimeStart, stageTimeEnd] = event.stageTime
      ? event.stageTime.split(" - ")
      : ["", ""];
    const [chekiTimeStart, chekiTimeEnd] = event.chekiTime
      ? event.chekiTime.split(" - ")
      : ["", ""];
    setModalEvent({
      ...event,
      stageTimeStart,
      stageTimeEnd,
      chekiTimeStart,
      chekiTimeEnd,
    });
  };

  const handleSave = () => {
    const updatedEvent = {
      ...modalEvent,
      stageTime:
        modalEvent.stageTimeStart && modalEvent.stageTimeEnd
          ? `${modalEvent.stageTimeStart} - ${modalEvent.stageTimeEnd}`
          : "",
      chekiTime:
        modalEvent.chekiTimeStart && modalEvent.chekiTimeEnd
          ? `${modalEvent.chekiTimeStart} - ${modalEvent.chekiTimeEnd}`
          : "",
    };

    if (updatedEvent.id) {
      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
    } else {
      setEvents((prev) => [...prev, { ...updatedEvent, id: Date.now() }]);
    }
    setModalEvent(null);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    setModalEvent(null);
    setIsEditing(false);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    let day = startDate;
    const rows = [];

    while (day <= endDate) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const dailyEvents = events.filter((e) => e.date === formattedDate);

        days.push(
          <div
            key={day}
            className={`border p-2 h-[100px] sm:h-[120px] text-xs sm:text-sm flex flex-col ${!isSameMonth(day, monthStart)
              ? "bg-gray-100 text-gray-400"
              : "bg-white"
              }`}
          >
            <span
              className={`font-semibold inline-block px-1 rounded-full ${isSameDay(day, new Date()) ? "bg-yellow-300 text-white" : ""
                }`}
            >
              {format(day, "d")}
            </span>
            <div className="mt-1 overflow-y-auto">
              {dailyEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 rounded px-1 text-[10px] sm:text-xs mt-1 truncate cursor-pointer"
                  onClick={() => handleEventClick(event)}
                  title={`${event.stageTime} | ${event.chekiTime}`}
                >
                  {event.group}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
    }

    return <div>{rows}</div>;
  };

  return (
    <section className="bg-[#fffef3] text-[#4a3f2f] py-10 px-1">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📅 Idol Event Schedule</h2>
          <button
            onClick={handleAddClick}
            className="bg-yellow-300 hover:bg-yellow-400 text-sm px-4 py-2 rounded shadow font-medium"
          >
            ➕ Add Event
          </button>
        </div>

        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="px-3 py-1 bg-[#fef3c7] rounded-md hover:bg-[#fde68a] text-sm"
            >
              ← Prev
            </button>
            <h2 className="text-xl font-bold">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="px-3 py-1 bg-[#fef3c7] rounded-md hover:bg-[#fde68a] text-sm"
            >
              Next →
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-sm font-semibold border-b pb-2">
            {daysOfWeek.map((day, i) => (
              <div key={i}>{day}</div>
            ))}
          </div>

          {renderCells()}
        </div>
      </div>

      {/* Modal */}
      {modalEvent && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded p-6 w-full max-w-md relative shadow-lg max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-bold mb-4">
              {modalEvent.id
                ? isEditing
                  ? "📝 Edit Event"
                  : "📋 Event Details"
                : "➕ Add New Event"}
            </h3>

            <div className="space-y-3">
              <label className="block text-sm font-medium mt-2 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full border px-3 py-1 rounded"
                value={modalEvent.date}
                onChange={(e) =>
                  setModalEvent({ ...modalEvent, date: e.target.value })
                }
                disabled={!isEditing && modalEvent.id}
              />

              <label className="block text-sm font-medium mt-2 mb-1">
                Group
              </label>
              <Select
                options={groupOptions}
                value={groupOptions.find(
                  (option) => option.value === modalEvent.group
                )}
                onChange={(selected) =>
                  setModalEvent({ ...modalEvent, group: selected?.value || "" })
                }
                isClearable
                placeholder="Select Group"
                isDisabled={!isEditing && modalEvent.id}
              />

              {isEditing && (
                <>
                  <label className="block text-sm font-medium mt-2 mb-1">
                    Stage Time Start
                  </label>
                  <input
                    type="time"
                    value={modalEvent.stageTimeStart || ""}
                    onChange={(e) =>
                      setModalEvent({
                        ...modalEvent,
                        stageTimeStart: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-1 text-sm"
                  />
                  <label className="block text-sm font-medium mt-2 mb-1">
                    Stage Time End
                  </label>
                  <input
                    type="time"
                    value={modalEvent.stageTimeEnd || ""}
                    onChange={(e) =>
                      setModalEvent({
                        ...modalEvent,
                        stageTimeEnd: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-1 text-sm"
                  />

                  <label className="block text-sm font-medium mt-2 mb-1">
                    Cheki Time Start
                  </label>
                  <input
                    type="time"
                    value={modalEvent.chekiTimeStart || ""}
                    onChange={(e) =>
                      setModalEvent({
                        ...modalEvent,
                        chekiTimeStart: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-1 text-sm"
                  />
                  <label className="block text-sm font-medium mt-2 mb-1">
                    Cheki Time End
                  </label>
                  <input
                    type="time"
                    value={modalEvent.chekiTimeEnd || ""}
                    onChange={(e) =>
                      setModalEvent({
                        ...modalEvent,
                        chekiTimeEnd: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-1 text-sm"
                  />
                </>
              )}

              {!isEditing && modalEvent.id && (
                <div className="text-sm space-y-1 mt-2">
                  <p>
                    <strong>Stage Time: </strong>
                    {modalEvent.stageTime || "-"}
                  </p>
                  <p>
                    <strong>Cheki Time: </strong>
                    {modalEvent.chekiTime || "-"}
                  </p>
                </div>
              )}

              <textarea
                className="w-full border px-3 py-1 rounded mt-2"
                placeholder="Notes"
                value={modalEvent.note}
                onChange={(e) =>
                  setModalEvent({ ...modalEvent, note: e.target.value })
                }
                disabled={!isEditing && modalEvent.id}
              ></textarea>
            </div>

            <div className="mt-4 flex justify-between items-center">
              {modalEvent.id && !isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(modalEvent.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}

              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => {
                    setModalEvent(null);
                    setIsEditing(false);
                  }}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Close
                </button>
                {(isEditing || !modalEvent.id) && (
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-yellow-300 hover:bg-yellow-400 rounded font-medium"
                  >
                    💾 Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}