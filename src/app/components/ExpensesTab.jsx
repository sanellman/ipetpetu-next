"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "petpet_expenses";
const PAGE_SIZE = 5;
const EXPENSE_TYPES = ["Goods", "เดินทาง", "อาหาร", "ของขวัญ", "อื่น ๆ"];

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function BottomSheet({ open, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-xl max-h-[85vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>
            <div className="px-5 pb-8 pt-2">
              <h2 className="text-lg font-bold text-[#4a3f2f] mb-4">{title}</h2>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ExpensesTab() {
  const [expenses, setExpenses] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ date: "", type: "", note: "", amount: "" });
  const [page, setPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const openAdd = () => {
    const today = new Date().toISOString().split("T")[0];
    setForm({ date: today, type: "", note: "", amount: "" });
    setEditIndex(null);
    setSheetOpen(true);
  };

  const openEdit = (globalIndex) => {
    const e = expenses[globalIndex];
    setForm({ ...e, amount: e.amount.toString() });
    setEditIndex(globalIndex);
    setSheetOpen(true);
  };

  const saveExpense = () => {
    if (!form.date || !form.type || !form.amount) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    const entry = {
      ...form,
      amount: parseFloat(form.amount),
      id: editIndex !== null ? expenses[editIndex].id : Date.now(),
    };
    setExpenses((prev) => {
      if (editIndex !== null) {
        const updated = [...prev];
        updated[editIndex] = entry;
        return updated;
      }
      const updated = [...prev, entry];
      if (updated.length > 1000) updated.shift();
      return updated;
    });
    setSheetOpen(false);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    setDeleteConfirmId(null);
  };

  const totalAll = expenses.reduce((sum, e) => sum + e.amount, 0);

  const groupedByDate = expenses.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));
  const pagedDates = sortedDates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(sortedDates.length / PAGE_SIZE);

  return (
    <div className="space-y-5 p-4 max-w-3xl mx-auto">
      {/* Summary bar */}
      <div className="bg-yellow-400 text-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-xs font-medium opacity-80">ยอดรวมทั้งหมด</p>
          <p className="text-2xl font-bold">
            {totalAll.toLocaleString("th-TH", { minimumFractionDigits: 2 })} ฿
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-white text-yellow-600 font-bold py-2 px-4 rounded-xl shadow-sm hover:bg-yellow-50 transition"
        >
          + เพิ่ม
        </button>
      </div>

      {/* Expense list */}
      <div className="space-y-4">
        {pagedDates.map((date) => {
          const entries = groupedByDate[date];
          const dayTotal = entries.reduce((sum, e) => sum + e.amount, 0);
          return (
            <div
              key={date}
              className="bg-white rounded-2xl shadow-sm border border-yellow-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-yellow-50 border-b border-yellow-100">
                <span className="font-semibold text-sm">{formatDate(date)}</span>
                <span className="text-sm text-yellow-700 font-medium">
                  {dayTotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })} ฿
                </span>
              </div>
              <ul className="divide-y divide-gray-50">
                {entries.map((e) => {
                  const globalIndex = expenses.findIndex((ex) => ex.id === e.id);
                  return (
                    <li
                      key={e.id}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-yellow-50/60 transition"
                    >
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => openEdit(globalIndex)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-sm">{e.type}</span>
                            {e.note && (
                              <span className="text-gray-400 text-sm"> · {e.note}</span>
                            )}
                          </div>
                          <span className="text-sm font-semibold">
                            {e.amount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} ฿
                          </span>
                        </div>
                      </div>
                      {deleteConfirmId === e.id ? (
                        <div className="flex gap-1 shrink-0">
                          <button
                            onClick={() => deleteExpense(e.id)}
                            className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg"
                          >
                            ลบ
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(e.id)}
                          className="text-gray-300 hover:text-red-400 transition shrink-0"
                        >
                          🗑️
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        {expenses.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-2">💸</p>
            <p>ยังไม่มีรายการ</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200 disabled:opacity-40 transition flex items-center justify-center text-lg"
          >
            ‹
          </button>
          <span className="text-sm text-gray-500">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200 disabled:opacity-40 transition flex items-center justify-center text-lg"
          >
            ›
          </button>
        </div>
      )}

      {/* Bottom sheet form */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={editIndex !== null ? "✏️ แก้ไขรายการ" : "➕ เพิ่มรายการ"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#4a3f2f]">วันที่</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#4a3f2f]">ประเภท</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="">-- เลือกประเภท --</option>
              {EXPENSE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#4a3f2f]">โน้ต</label>
            <input
              type="text"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="รายละเอียดเพิ่มเติม..."
              className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-[#4a3f2f]">จำนวนเงิน (บาท)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
              className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={saveExpense}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl transition"
            >
              บันทึก
            </button>
            <button
              onClick={() => setSheetOpen(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-xl transition"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
