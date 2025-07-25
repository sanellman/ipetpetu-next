"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#fff8d6] text-[#4a3f2f] shadow-md py-3 px-6 fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">🎉 Petpet Birthday</h1>
        <div className="space-x-4">
          <Link href="#countdown" className="hover:underline">Countdown</Link>
          <Link href="#game" className="hover:underline">Game</Link>
          <Link href="#about" className="hover:underline">About</Link>
        </div>
      </div>
    </nav>
  );
}