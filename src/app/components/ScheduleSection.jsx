"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "date-fns";

const STORAGE_KEY = "idolScheduleEvents";
const VIEW_MODE_KEY = "idolScheduleViewMode";

// ─── Color map per group ─────────────────────────────────────────────────────
const GROUP_COLOR_MAP = {
  "ANGeVIL✟":        { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-400" },
  "BNK48":           { bg: "bg-pink-100",   text: "text-pink-800",   dot: "bg-pink-400" },
  "CGM48":           { bg: "bg-sky-100",    text: "text-sky-800",    dot: "bg-sky-400" },
  "Chocolatière":    { bg: "bg-amber-100",  text: "text-amber-800",  dot: "bg-amber-400" },
  "Denshi220":       { bg: "bg-cyan-100",   text: "text-cyan-800",   dot: "bg-cyan-400" },
  "Euphonie":        { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-400" },
  "HatoBito":        { bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-400" },
  "IKINARI TELL ME": { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-400" },
  "Isekai":          { bg: "bg-violet-100", text: "text-violet-800", dot: "bg-violet-400" },
  "KNIGHT✠RES":      { bg: "bg-red-100",    text: "text-red-800",    dot: "bg-red-400" },
  "KYLINZ":          { bg: "bg-lime-100",   text: "text-lime-800",   dot: "bg-lime-400" },
  "Mirai Mirai":     { bg: "bg-teal-100",   text: "text-teal-800",   dot: "bg-teal-400" },
  "Myujikku Majo":   { bg: "bg-fuchsia-100",text: "text-fuchsia-800",dot: "bg-fuchsia-400" },
  "Neko Pon!":       { bg: "bg-orange-50",  text: "text-orange-700", dot: "bg-orange-300" },
  "NIKKO NIKKO":     { bg: "bg-yellow-50",  text: "text-yellow-700", dot: "bg-yellow-300" },
  "Peach You":       { bg: "bg-rose-100",   text: "text-rose-800",   dot: "bg-rose-400" },
  "Seishin Kakumei": { bg: "bg-indigo-100", text: "text-indigo-800", dot: "bg-indigo-400" },
  "Siamdol Cafe":    { bg: "bg-amber-50",   text: "text-amber-700",  dot: "bg-amber-300" },
  "Sora! Sora!":     { bg: "bg-sky-50",     text: "text-sky-700",    dot: "bg-sky-300" },
  "STARRY NITE":     { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-400" },
  "Stellagrima 💙":  { bg: "bg-blue-100",   text: "text-blue-900",   dot: "bg-blue-500" },
  "SUMOMO":          { bg: "bg-pink-50",    text: "text-pink-700",   dot: "bg-pink-300" },
  "The Glass Girls": { bg: "bg-slate-100",  text: "text-slate-800",  dot: "bg-slate-400" },
  "Vinx":            { bg: "bg-violet-50",  text: "text-violet-700", dot: "bg-violet-300" },
  "Yami Yami":       { bg: "bg-gray-100",   text: "text-gray-700",   dot: "bg-gray-400" },
  "Other":           { bg: "bg-gray-100",   text: "text-gray-600",   dot: "bg-gray-300" },
};
const DEFAULT_COLOR = { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-300" };
function getGroupColor(group) {
  return GROUP_COLOR_MAP[group] || DEFAULT_COLOR;
}

// ─── Utilities ───────────────────────────────────────────────────────────────
function timeToMinutes(t) {
  if (!t) return Infinity;
  const [h, m] = t.split(":").map(Number);
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : Infinity;
}

function getEventStartMinute(event) {
  const stageStart = event.stageTimeStart || (event.stageTime?.split(" - ")[0] ?? "");
  const chekiStart = event.chekiTimeStart || (event.chekiTime?.split(" - ")[0] ?? "");
  return Math.min(timeToMinutes(stageStart), timeToMinutes(chekiStart));
}

function parseDateLocal(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDateLabel(dateStr, todayStr) {
  const tomorrowStr = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const base = format(parseDateLocal(dateStr), "EEE, d MMM yyyy").toUpperCase();
  if (dateStr === todayStr) return `วันนี้ • ${base}`;
  if (dateStr === tomorrowStr) return `พรุ่งนี้ • ${base}`;
  return base;
}

function getSortedTimes(event) {
  const items = [];
  if (event.stageTime) items.push({ icon: "🎤", label: event.stageTime, time: event.stageTime.split(" - ")[0] });
  if (event.chekiTime) items.push({ icon: "📸", label: event.chekiTime, time: event.chekiTime.split(" - ")[0] });
  return items.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
}

// ─── Group Options ────────────────────────────────────────────────────────────
const GROUP_OPTIONS = [
  "ANGeVIL✟", "BNK48", "CGM48", "Chocolatière", "Denshi220", "Euphonie",
  "HatoBito", "IKINARI TELL ME", "Isekai", "KNIGHT✠RES", "KYLINZ",
  "Mirai Mirai", "Myujikku Majo", "Neko Pon!", "NIKKO NIKKO", "Peach You",
  "Seishin Kakumei", "Siamdol Cafe", "Sora! Sora!", "STARRY NITE",
  "Stellagrima 💙", "SUMOMO", "The Glass Girls", "Vinx", "Yami Yami", "Other",
].map((v) => ({ value: v, label: v }));

// ─── Calendar Cells ───────────────────────────────────────────────────────────
function CalendarCells({ currentMonth, eventsByDate, selectedDate, todayStr, onSelectDate }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  let day = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const rows = [];

  while (day <= endDate) {
    const cells = [];
    for (let i = 0; i < 7; i++) {
      const dateStr = format(day, "yyyy-MM-dd");
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === selectedDate;
      const dayEvents = eventsByDate[dateStr] || [];
      const dotColors = [...new Set(dayEvents.map((e) => getGroupColor(e.group).dot))].slice(0, 3);

      cells.push(
        <div
          key={dateStr}
          onClick={() => isCurrentMonth && onSelectDate(dateStr)}
          className={`flex flex-col items-center py-1 rounded-xl transition-all ${isCurrentMonth ? "cursor-pointer hover:bg-yellow-50 active:bg-yellow-100" : ""}`}
        >
          <span
            className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-all ${
              isSelected
                ? "bg-yellow-400 text-white shadow-md"
                : isToday
                ? "bg-yellow-100 text-yellow-700 font-bold"
                : isCurrentMonth
                ? "text-gray-700"
                : "text-gray-300"
            }`}
          >
            {format(day, "d")}
          </span>
          {isCurrentMonth && dotColors.length > 0 && (
            <div className="flex gap-0.5 mt-0.5">
              {dotColors.map((dotClass, idx) => (
                <div key={idx} className={`w-1 h-1 rounded-full ${dotClass}`} />
              ))}
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={rows.length} className="grid grid-cols-7">
        {cells}
      </div>
    );
  }
  return <div className="space-y-0.5">{rows}</div>;
}

// ─── Bottom Sheet Modal ───────────────────────────────────────────────────────
function BottomSheet({ modalEvent, isEditing, setModalEvent, setIsEditing, onClose, onSave, onDelete }) {
  const color = getGroupColor(modalEvent.group);
  const isViewMode = !isEditing && !!modalEvent.id;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[90dvh] overflow-y-auto shadow-2xl"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="px-5 pb-10 pt-1">
          {/* Title row */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-800">
              {isViewMode ? "📋 รายละเอียดงาน" : modalEvent.id ? "✏️ แก้ไขงาน" : "➕ เพิ่มงานใหม่"}
            </h3>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 text-xs transition"
            >
              ✕
            </button>
          </div>

          {/* ── VIEW MODE ── */}
          {isViewMode && (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">วันที่</p>
                <p className="font-semibold text-gray-800">
                  {format(parseDateLocal(modalEvent.date), "EEEE, d MMMM yyyy")}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">กลุ่ม</p>
                <span className={`inline-block text-sm font-bold px-3 py-1 rounded-full ${color.bg} ${color.text}`}>
                  {modalEvent.group}
                </span>
              </div>
              {getSortedTimes(modalEvent).map((item, i) => (
                <div key={i}>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {item.icon} {item.icon === "🎤" ? "Stage Time" : "Cheki Time"}
                  </p>
                  <p className="font-semibold text-gray-800">{item.label}</p>
                </div>
              ))}
              {modalEvent.note && (
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">📝 Note</p>
                  <p className="text-sm text-gray-600">{modalEvent.note}</p>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-3 rounded-2xl bg-yellow-400 text-white font-bold text-sm hover:bg-yellow-500 active:scale-95 transition-all"
                >
                  ✏️ แก้ไข
                </button>
                <button
                  onClick={() => onDelete(modalEvent.id)}
                  className="w-14 py-3 rounded-2xl bg-red-50 text-red-500 font-bold text-lg hover:bg-red-100 active:scale-95 transition-all"
                >
                  🗑️
                </button>
              </div>
            </div>
          )}

          {/* ── ADD / EDIT FORM ── */}
          {!isViewMode && (
            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">วันที่</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-gray-50"
                  value={modalEvent.date}
                  onChange={(e) => setModalEvent({ ...modalEvent, date: e.target.value })}
                />
              </div>

              {/* Group */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">กลุ่ม</label>
                <Select
                  options={GROUP_OPTIONS}
                  value={GROUP_OPTIONS.find((o) => o.value === modalEvent.group) || null}
                  onChange={(s) => setModalEvent({ ...modalEvent, group: s?.value || "" })}
                  isClearable
                  placeholder="เลือกกลุ่ม..."
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderRadius: "1rem",
                      borderColor: state.isFocused ? "#fbbf24" : "#e5e7eb",
                      boxShadow: state.isFocused ? "0 0 0 2px #fde68a" : "none",
                      backgroundColor: "#f9fafb",
                      "&:hover": { borderColor: "#fbbf24" },
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? "#fbbf24" : state.isFocused ? "#fef9c3" : "white",
                      color: "#4a3f2f",
                    }),
                  }}
                />
              </div>

              {/* Stage Time */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">🎤 Stage Time</label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    className="flex-1 border border-gray-200 px-3 py-2.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-gray-50"
                    value={modalEvent.stageTimeStart || ""}
                    onChange={(e) => setModalEvent({ ...modalEvent, stageTimeStart: e.target.value })}
                  />
                  <span className="text-gray-400 text-xs font-medium">ถึง</span>
                  <input
                    type="time"
                    className="flex-1 border border-gray-200 px-3 py-2.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-gray-50"
                    value={modalEvent.stageTimeEnd || ""}
                    onChange={(e) => setModalEvent({ ...modalEvent, stageTimeEnd: e.target.value })}
                  />
                </div>
              </div>

              {/* Cheki Time */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">📸 Cheki Time</label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    className="flex-1 border border-gray-200 px-3 py-2.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-gray-50"
                    value={modalEvent.chekiTimeStart || ""}
                    onChange={(e) => setModalEvent({ ...modalEvent, chekiTimeStart: e.target.value })}
                  />
                  <span className="text-gray-400 text-xs font-medium">ถึง</span>
                  <input
                    type="time"
                    className="flex-1 border border-gray-200 px-3 py-2.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-gray-50"
                    value={modalEvent.chekiTimeEnd || ""}
                    onChange={(e) => setModalEvent({ ...modalEvent, chekiTimeEnd: e.target.value })}
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">📝 Note</label>
                <textarea
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-gray-50 resize-none"
                  rows={2}
                  placeholder="หมายเหตุ..."
                  value={modalEvent.note}
                  onChange={(e) => setModalEvent({ ...modalEvent, note: e.target.value })}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 active:scale-95 transition-all"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={onSave}
                  className="flex-1 py-3 rounded-2xl bg-yellow-400 text-white font-bold text-sm hover:bg-yellow-500 active:scale-95 transition-all shadow-md shadow-yellow-200"
                >
                  💾 บันทึก
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ScheduleSection() {
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const [events, setEvents] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const parsed = stored ? JSON.parse(stored) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(VIEW_MODE_KEY);
      return saved === "list" ? "list" : "calendar";
    }
    return "calendar";
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = modalEvent ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalEvent]);

  // Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Persist
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem(VIEW_MODE_KEY, viewMode); }, [viewMode]);

  // Clear date filter when switching to list
  useEffect(() => { if (viewMode === "list") setSelectedDate(null); }, [viewMode]);

  const closeModal = () => { setModalEvent(null); setIsEditing(false); };

  const handleAddClick = () => {
    setIsEditing(true);
    setModalEvent({ group: "", date: todayStr, stageTimeStart: "", stageTimeEnd: "", chekiTimeStart: "", chekiTimeEnd: "", note: "" });
  };

  const handleEventClick = (event) => {
    const [stageTimeStart = "", stageTimeEnd = ""] = event.stageTime?.split(" - ") ?? [];
    const [chekiTimeStart = "", chekiTimeEnd = ""] = event.chekiTime?.split(" - ") ?? [];
    setModalEvent({ ...event, stageTimeStart, stageTimeEnd, chekiTimeStart, chekiTimeEnd });
    setIsEditing(false);
  };

  const handleSave = () => {
    const updated = {
      ...modalEvent,
      stageTime: modalEvent.stageTimeStart && modalEvent.stageTimeEnd
        ? `${modalEvent.stageTimeStart} - ${modalEvent.stageTimeEnd}` : "",
      chekiTime: modalEvent.chekiTimeStart && modalEvent.chekiTimeEnd
        ? `${modalEvent.chekiTimeStart} - ${modalEvent.chekiTimeEnd}` : "",
    };
    setEvents((prev) => {
      if (!updated.group) updated.group = "Other";
      const newEvents = updated.id
        ? prev.map((e) => e.id === updated.id ? updated : e)
        : [...prev, { ...updated, id: Date.now() }];
      const limited = newEvents.slice(-50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
      return limited;
    });
    closeModal();
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    closeModal();
  };

  // Sorted display events
  const displayEvents = [...events]
    .filter((e) => selectedDate ? e.date === selectedDate : e.date >= todayStr)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      const diff = getEventStartMinute(a) - getEventStartMinute(b);
      return diff !== 0 ? diff : (a.group || "").localeCompare(b.group || "");
    });

  // Group by date
  const groupedByDate = displayEvents.reduce((acc, e) => {
    if (!acc[e.date]) acc[e.date] = [];
    acc[e.date].push(e);
    return acc;
  }, {});
  const sortedDates = Object.keys(groupedByDate).sort();

  // Calendar dot data
  const eventsByDate = events.reduce((acc, e) => {
    if (!acc[e.date]) acc[e.date] = [];
    acc[e.date].push(e);
    return acc;
  }, {});

  return (
    <section className="bg-[#fffef3] text-[#4a3f2f] select-none">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h2 className="text-base font-bold tracking-tight">📅 Idol Schedule</h2>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex bg-gray-100 rounded-full p-0.5 text-xs">
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${viewMode === "calendar" ? "bg-yellow-400 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Cal
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${viewMode === "list" ? "bg-yellow-400 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              List
            </button>
          </div>

          {/* Add button */}
          <button
            onClick={handleAddClick}
            className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center shadow-md hover:bg-yellow-500 active:scale-90 transition-all text-xl font-light leading-none"
          >
            +
          </button>
        </div>
      </div>

      {/* ── Calendar View ── */}
      {viewMode === "calendar" && (
        <div className="px-3 mb-3">
          <div className="bg-white rounded-2xl shadow-sm p-3">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-xl transition"
              >
                ‹
              </button>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{format(currentMonth, "MMMM yyyy")}</span>
                <button
                  onClick={() => { setCurrentMonth(new Date()); setSelectedDate(todayStr); }}
                  className="text-[10px] text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full font-semibold hover:bg-yellow-100 transition"
                >
                  Today
                </button>
              </div>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-xl transition"
              >
                ›
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
              ))}
            </div>

            <CalendarCells
              currentMonth={currentMonth}
              eventsByDate={eventsByDate}
              selectedDate={selectedDate}
              todayStr={todayStr}
              onSelectDate={(d) => setSelectedDate(selectedDate === d ? null : d)}
            />
          </div>

          {/* Date filter chip */}
          {selectedDate && (
            <div className="flex items-center gap-2 mt-2 px-1">
              <span className="text-[11px] text-gray-400">แสดง:</span>
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full font-semibold">
                {format(parseDateLocal(selectedDate), "d MMM yyyy")}
                <button
                  onClick={() => setSelectedDate(null)}
                  className="ml-1 text-yellow-500 hover:text-yellow-800 leading-none"
                >
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Event List ── */}
      <div className="px-3 pb-2">
        {sortedDates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <span className="text-5xl mb-3">📭</span>
            <p className="text-sm font-medium">
              {selectedDate ? "ไม่มีงานในวันที่เลือก" : "ยังไม่มีงานที่กำลังจะมาถึง"}
            </p>
            <button
              onClick={handleAddClick}
              className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded-full text-sm font-semibold hover:bg-yellow-500 transition"
            >
              + เพิ่มงาน
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {sortedDates.map((date, dateIdx) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dateIdx * 0.06, duration: 0.3 }}
              >
                {/* Date header */}
                <p className="text-[10px] font-black text-gray-400 tracking-widest px-1 mb-2">
                  {formatDateLabel(date, todayStr)}
                </p>

                {/* Event cards */}
                <div className="space-y-2">
                  {groupedByDate[date].map((event, i) => {
                    const color = getGroupColor(event.group);
                    const times = getSortedTimes(event);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: dateIdx * 0.06 + i * 0.05, duration: 0.25 }}
                        onClick={() => handleEventClick(event)}
                        className="flex bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-transform hover:shadow-md"
                      >
                        {/* Colored left accent */}
                        <div className={`w-1.5 flex-shrink-0 ${color.dot}`} />

                        <div className="flex-1 px-3 py-3">
                          {/* Group badge */}
                          <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2 ${color.bg} ${color.text}`}>
                            {event.group}
                          </span>

                          {/* Times */}
                          {times.length > 0 ? (
                            <div className="space-y-1">
                              {times.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600">
                                  <span className="text-base leading-none">{item.icon}</span>
                                  <span className="font-medium">{item.label}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400">ยังไม่มีเวลา</p>
                          )}

                          {/* Note */}
                          {event.note && (
                            <div className="flex items-start gap-1.5 text-xs text-gray-400 mt-1.5">
                              <span>📝</span>
                              <span className="truncate">{event.note}</span>
                            </div>
                          )}
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center pr-3 text-gray-300 text-lg">›</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom Sheet ── */}
      <AnimatePresence>
        {modalEvent && (
          <BottomSheet
            modalEvent={modalEvent}
            isEditing={isEditing}
            setModalEvent={setModalEvent}
            setIsEditing={setIsEditing}
            onClose={closeModal}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
