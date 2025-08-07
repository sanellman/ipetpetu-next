import { useState, useEffect } from "react";

const STORAGE_KEY = "petpet_expenses";
const PAGE_SIZE = 3;

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export default function ExpensesTab() {
    const [expenses, setExpenses] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [form, setForm] = useState({ date: "", type: "", note: "", amount: "" });
    const [page, setPage] = useState(1);

    useEffect(() => {
        try {
            const storedEvents = localStorage.getItem(STORAGE_KEY);
            if (storedEvents) {
                const parsedEvents = JSON.parse(storedEvents);
                setExpenses(Array.isArray(parsedEvents) ? parsedEvents : []);
            } else {
                setExpenses([]);
            }
        } catch {
            setExpenses([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }, [expenses]);

    const openAddModal = () => {
        const today = new Date().toISOString().split("T")[0];
        setForm({ date: today, type: "", note: "", amount: "" });
        setEditIndex(null);
        setModalOpen(true);
    };

    const openEditModal = (index) => {
        const e = expenses[index];
        setForm({ ...e, amount: e.amount.toString() });
        setEditIndex(index);
        setModalOpen(true);
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

        let updated;
        if (editIndex !== null) {
            updated = [...expenses];
            updated[editIndex] = entry;
        } else {
            updated = [...expenses, entry];
            if (updated.length > 1000) updated.shift();
        }

        setExpenses(updated);
        setModalOpen(false);
    };

    const groupedByDate = expenses.reduce((acc, entry) => {
        if (!acc[entry.date]) acc[entry.date] = [];
        acc[entry.date].push(entry);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));
    const pagedDates = sortedDates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const totalPages = Math.ceil(sortedDates.length / PAGE_SIZE);

    return (
        <div className="relative space-y-6 p-4 max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-extrabold text-yellow-600 mb-2">Expense 💸</h1>
                <p className="text-gray-600">บันทึกรายจ่ายของคุณ</p>
            </header>
            {/* Add button */}
            <div className="flex justify-end">
            <button
                onClick={openAddModal}
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-full"
            >
                ＋ เพิ่มรายการ
            </button>
            </div>

            <div className="space-y-6">
                {pagedDates.map((date) => {
                    const entries = groupedByDate[date];
                    const total = entries.reduce((sum, e) => sum + e.amount, 0);
                    return (
                        <div key={date} className="bg-white rounded-xl shadow p-4">
                            <h3 className="font-bold text-lg mb-2">
                                {formatDate(date)} 🧾 รวม {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                            </h3>
                            <ul className="space-y-1 text-sm">
                                {entries.map((e, idx) => {
                                    const globalIndex = expenses.findIndex((ex) => ex.id === e.id);
                                    return (
                                        <li
                                            key={e.id}
                                            className="border-b pb-1 flex items-center justify-between hover:bg-yellow-50 rounded px-1 transition"
                                        >
                                            <div
                                                onClick={() => openEditModal(globalIndex)}
                                                className="flex-1 cursor-pointer"
                                                title="คลิกเพื่อแก้ไข"
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        <span>{e.type}</span>
                                                        {e.note && <span className="text-gray-500"> - {e.note}</span>}
                                                    </div>
                                                    <span>{e.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const confirmDelete = confirm("คุณต้องการลบรายการนี้หรือไม่?");
                                                    if (confirmDelete) {
                                                        const updated = [...expenses];
                                                        updated.splice(globalIndex, 1);
                                                        setExpenses(updated);
                                                    }
                                                }}
                                                className="ml-2 text-red-500 hover:text-red-700 text-sm"
                                                title="ลบรายการ"
                                            >
                                                🗑️
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
                {expenses.length === 0 && <p className="text-center text-gray-500">ยังไม่มีรายการ</p>}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                        disabled={page === 1}
                    >
                        ◀
                    </button>
                    <span>หน้า {page} / {totalPages}</span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                        disabled={page === totalPages}
                    >
                        ▶
                    </button>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                    <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg space-y-4 relative">
                        <h2 className="text-lg font-bold mb-2">
                            {editIndex !== null ? "✏️ แก้ไขรายการ" : "＋ เพิ่มรายการ"}
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block font-semibold">วันที่</label>
                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">ประเภท</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">-- เลือกประเภท --</option>
                                    <option value="Goods">Goods</option>
                                    <option value="เดินทาง">เดินทาง</option>
                                    <option value="อาหาร">อาหาร</option>
                                    <option value="ของขวัญ">ของขวัญ</option>
                                    <option value="อื่น ๆ">อื่น ๆ</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-semibold">โน้ต</label>
                                <input
                                    type="text"
                                    value={form.note}
                                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">จำนวนเงิน (บาท)</label>
                                <input
                                    type="number"
                                    value={form.amount}
                                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={saveExpense}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex-1"
                                >
                                    บันทึก
                                </button>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full flex-1"
                                >
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}