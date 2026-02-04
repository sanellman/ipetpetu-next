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
const VIEW_MODE_KEY = "idolScheduleViewMode";

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

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
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(VIEW_MODE_KEY);
      return saved === "list" ? "list" : "calendar";
    }
    return "calendar";
  });

  const groupOptions = [
    { value: "ANGeVIL✟", label: "ANGeVIL✟" },
    { value: "BNK48", label: "BNK48" },
    { value: "CGM48", label: "CGM48" },
    { value: "Chocolatière", label: "Chocolatière" },
    { value: "Denshi220", label: "Denshi220" },
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
    { value: "Siamdol Cafe", label: "Siamdol Cafe" },
    { value: "Sora! Sora!", label: "Sora! Sora!" },
    { value: "STARRY NITE", label: "STARRY NITE" },
    { value: "Stellagrima 💙", label: "Stellagrima 💙" },
    { value: "SUMOMO", label: "SUMOMO" },
    { value: "The Glass Girls", label: "The Glass Girls" },
    { value: "Vinx", label: "Vinx" },
    { value: "Yami Yami", label: "Yami Yami" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem(STORAGE_KEY);
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        setEvents(Array.isArray(parsedEvents) ? parsedEvents : []);
      } else {
        setEvents([]);
      }
    } catch {
      setEvents([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

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
    const [stageTimeStart, stageTimeEnd] = event.stageTime?.split(" - ") || ["", ""];
    const [chekiTimeStart, chekiTimeEnd] = event.chekiTime?.split(" - ") || ["", ""];
    setModalEvent({
      ...event,
      stageTimeStart,
      stageTimeEnd,
      chekiTimeStart,
      chekiTimeEnd,
    });
    setIsEditing(false);
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

    setEvents((prevEvents) => {
      let newEvents;
      if (!updatedEvent.group) {
        updatedEvent.group = "Other"; // Default to "Other" if no group selected
      }
      if (updatedEvent.id) {
        // Editing existing event
        newEvents = prevEvents.map((e) =>
          e.id === updatedEvent.id ? updatedEvent : e
        );
      } else {
        // Adding new event
        newEvents = [...prevEvents, { ...updatedEvent, id: Date.now() }];
      }

      // Limit to last 50 events (FIFO)
      const limitedEvents = newEvents.slice(-50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedEvents));
      return limitedEvents;
    });

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
            className={`border p-2 h-[100px] sm:h-[120px] text-xs sm:text-sm flex flex-col ${!isSameMonth(day, monthStart) ? "bg-gray-100 text-gray-400" : "bg-white"}`}
          >
            <span className={`font-semibold inline-block px-1 rounded-full ${isSameDay(day, new Date()) ? "bg-yellow-300 text-white" : ""}`}>
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

  // ใส่ไว้เหนือ renderListView() หรือภายในก็ได้
  const timeToMinutes = (t) => {
    if (!t) return Infinity;
    const [h, m] = t.split(":").map(Number);
    return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : Infinity;
  };

  const getHasStage = (e) =>
    !!e.stageTime || (!!e.stageTimeStart && !!e.stageTimeEnd);

  const getHasCheki = (e) =>
    !!e.chekiTime || (!!e.chekiTimeStart && !!e.chekiTimeEnd);

  const getStartTime = (e, kind) => {
    if (kind === "stage") {
      const v = e.stageTimeStart || (e.stageTime?.split(" - ")[0] ?? "");
      return timeToMinutes(v);
    }
    const v = e.chekiTimeStart || (e.chekiTime?.split(" - ")[0] ?? "");
    return timeToMinutes(v);
  };

  const renderListView = () => {
    const today = new Date().toISOString().split("T")[0];

    // เรียง events ตามเวลาที่เร็วที่สุด (Stage หรือ Cheki)
    const sortedEvents = [...events]
      .filter((event) => event.date >= today)
      .sort((a, b) => {
        const parseTime = (t) => {
          if (!t) return Infinity;
          const [h, m] = t.split(":").map(Number);
          return h * 60 + m;
        };

        const aStageStart = a.stageTimeStart || (a.stageTime?.split(" - ")[0] ?? "");
        const aChekiStart = a.chekiTimeStart || (a.chekiTime?.split(" - ")[0] ?? "");
        const bStageStart = b.stageTimeStart || (b.stageTime?.split(" - ")[0] ?? "");
        const bChekiStart = b.chekiTimeStart || (b.chekiTime?.split(" - ")[0] ?? "");

        const aEarliest = Math.min(parseTime(aStageStart), parseTime(aChekiStart));
        const bEarliest = Math.min(parseTime(bStageStart), parseTime(bChekiStart));

        if (a.date !== b.date) return a.date.localeCompare(b.date);
        if (aEarliest !== bEarliest) return aEarliest - bEarliest;

        // ถ้าเวลาเท่ากัน ให้เรียงตามชื่อกลุ่ม
        return (a.group || "").localeCompare(b.group || "");
      });

    if (sortedEvents.length === 0) {
      return <p className="text-sm text-gray-500">No upcoming events.</p>;
    }

    return (
      <div className="divide-y text-sm">
        {sortedEvents.map((event) => (
          <div
            key={event.id}
            className="py-3 px-2 hover:bg-yellow-50 cursor-pointer rounded"
            onClick={() => handleEventClick(event)}
          >
            <div className="font-medium flex justify-between">
              <span>📆 {formatDate(event.date)}</span>
              <span className="text-yellow-700">{event.group}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1 space-y-1">
  {(() => {
    // เก็บ Stage และ Cheki พร้อมเวลาเริ่ม
    const items = [];

    if (event.stageTime) {
      const [start] = event.stageTime.split(" - ");
      items.push({ type: "stage", label: `🎤 Stage: ${event.stageTime}`, time: start });
    }

    if (event.chekiTime) {
      const [start] = event.chekiTime.split(" - ");
      items.push({ type: "cheki", label: `📸 Cheki: ${event.chekiTime}`, time: start });
    }

    // เรียงตามเวลาเริ่ม
    items.sort((a, b) => {
      const parseTime = (t) => {
        if (!t) return Infinity;
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
      };
      return parseTime(a.time) - parseTime(b.time);
    });

    // map ออกมาโชว์
    return (
      <>
        {items.map((item, i) => (
          <div key={i}>{item.label}</div>
        ))}
        {event.note && <div>📝 {event.note}</div>}
      </>
    );
  })()}
</div>

          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-[#fffef3] text-[#4a3f2f] py-1 px-1">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-center">📅 Idol Event Schedule</h2>
          <div className="flex gap-3 items-center">
            <div className="flex bg-gray-200 rounded-full p-1 shadow-inner">
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${viewMode === "calendar"
                  ? "bg-yellow-400 text-white shadow"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                📅 Calendar
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${viewMode === "list"
                  ? "bg-yellow-400 text-white shadow"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                📋 List
              </button>
            </div>
            {/* ปุ่ม Add Event */}
            <button
              onClick={handleAddClick}
              className="px-2.5 py-2 rounded-full text-sm font-medium bg-yellow-400 text-white shadow hover:bg-yellow-500 transition-all duration-200"
            >
              ➕
            </button>
          </div>
        </div>

        <div className="bg-white rounded shadow p-2">
          {viewMode === "calendar" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="px-3 py-1 bg-[#fef3c7] rounded-md hover:bg-[#fde68a] text-sm"
                >
                  &lt;
                </button>
                <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="px-3 py-1 bg-[#fef3c7] rounded-md hover:bg-[#fde68a] text-sm"
                >
                  &gt;
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-sm font-semibold border-b pb-2">
                {daysOfWeek.map((day, i) => (
                  <div key={i}>{day}</div>
                ))}
              </div>
            </>
          )}

          {viewMode === "calendar" ? renderCells() : renderListView()}
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
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                className="w-full border px-3 py-1 rounded"
                value={modalEvent.date}
                onChange={(e) => setModalEvent({ ...modalEvent, date: e.target.value })}
                disabled={!isEditing && modalEvent.id}
              />

              <label className="block text-sm font-medium">Group</label>
              <Select
                options={groupOptions}
                value={groupOptions.find((option) => option.value === modalEvent.group)}
                onChange={(selected) => setModalEvent({ ...modalEvent, group: selected?.value || "" })}
                isClearable
                placeholder="Select Group"
                isDisabled={!isEditing && modalEvent.id}
              />

              {isEditing && (
                <>
                  <label className="block text-sm font-medium">Stage Time Start</label>
                  <input type="time" className="w-full border rounded px-3 py-1 text-sm"
                    value={modalEvent.stageTimeStart || ""}
                    onChange={(e) => setModalEvent({ ...modalEvent, stageTimeStart: e.target.value })}
                  />
                  <label className="block text-sm font-medium">Stage Time End</label>
                  <input type="time" className="w-full border rounded px-3 py-1 text-sm"
                    value={modalEvent.stageTimeEnd || ""}
                    onChange={(e) => setModalEvent({ ...modalEvent, stageTimeEnd: e.target.value })}
                  />
                  <label className="block text-sm font-medium">Cheki Time Start</label>
                  <input type="time" className="w-full border rounded px-3 py-1 text-sm"
                    value={modalEvent.chekiTimeStart || ""}
                    onChange={(e) => setModalEvent({ ...modalEvent, chekiTimeStart: e.target.value })}
                  />
                  <label className="block text-sm font-medium">Cheki Time End</label>
                  <input type="time" className="w-full border rounded px-3 py-1 text-sm"
                    value={modalEvent.chekiTimeEnd || ""}
                    onChange={(e) => setModalEvent({ ...modalEvent, chekiTimeEnd: e.target.value })}
                  />
                </>
              )}

              {!isEditing && modalEvent.id && (
                <div className="text-sm space-y-1 mt-2">
                  <p><strong>Stage Time: </strong>{modalEvent.stageTime || "-"}</p>
                  <p><strong>Cheki Time: </strong>{modalEvent.chekiTime || "-"}</p>
                </div>
              )}

              <textarea
                className="w-full border px-3 py-1 rounded mt-2"
                placeholder="Notes"
                value={modalEvent.note}
                onChange={(e) => setModalEvent({ ...modalEvent, note: e.target.value })}
                disabled={!isEditing && modalEvent.id}
              ></textarea>
            </div>

            <div className="mt-4 flex justify-between items-center">
              {modalEvent.id && !isEditing && (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(true)} className="text-sm text-blue-600 hover:underline">✏️ Edit</button>
                  <button onClick={() => handleDelete(modalEvent.id)} className="text-sm text-red-600 hover:underline">🗑️ Delete</button>
                </div>
              )}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setModalEvent(null); setIsEditing(false); }} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">Close</button>
                {(isEditing || !modalEvent.id) && (
                  <button onClick={handleSave} className="px-3 py-1 bg-yellow-300 hover:bg-yellow-400 rounded font-medium">💾 Save</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}