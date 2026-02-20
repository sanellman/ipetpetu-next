"use client";

import { useState } from "react";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import ScheduleSection from "./components/ScheduleSection";
import FlipCardGame from "./components/FlipCardGame";
import ExpensesTab from "./components/ExpensesTab";

const TABS = [
  { id: "schedule", label: "📅 Schedule" },
  { id: "expenses", label: "💸 Expenses" },
  { id: "game", label: "🃏 Flip Card" },
];

function ToolsSection() {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <section className="px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 mb-6 bg-white/60 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm border border-white/50">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-amber-400 text-white shadow"
                  : "text-stone-400 hover:text-[#44382b]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>
          {activeTab === "schedule" && <ScheduleSection />}
          {activeTab === "expenses" && <ExpensesTab />}
          {activeTab === "game" && <FlipCardGame />}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <ToolsSection />
      <HeroSection />
      <AboutSection />
      <GallerySection />
    </Layout>
  );
}
