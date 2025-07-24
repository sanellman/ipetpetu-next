"use client";
import { useState, useEffect } from "react";
import Card from "./Card"; // ต้อง import ให้ถูก
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

const cardImages = [
  "/images/cards/card1.jpg",
  "/images/cards/card2.jpg",
  "/images/cards/card3.jpg",
  "/images/cards/card4.jpg",
  "/images/cards/card5.jpg",
  "/images/cards/card6.jpg",
  "/images/cards/card7.jpg",
  "/images/cards/card8.jpg",
];

function shuffleCards() {
  const duplicated = [...cardImages, ...cardImages];
  return duplicated
    .map((src) => ({ id: uuidv4(), src, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
}

export default function FlipCardGame() {
    const [cards, setCards] = useState([]);
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const [lock, setLock] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false); // ← แก้ตรงนี้
    const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setCards(shuffleCards());
  }, []);

  useEffect(() => {
  let timer;
  if (isRunning) {
    timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }
  return () => clearInterval(timer);
}, [isRunning]);

  useEffect(() => {
  if (cards.length > 0 && cards.every((card) => card.matched)) {
    setIsRunning(false);
  }
}, [cards]);

  const handleClick = (card) => {
    if (!hasStarted) {
    setHasStarted(true);
    setIsRunning(true);
    }
    if (lock || card.flipped || card.matched) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    if (!first) {
      setFirst(card);
    } else if (!second) {
      setSecond(card);
      setLock(true);

      setTimeout(() => {
        const match = first.src === card.src;
        setCards((prev) =>
          prev.map((c) =>
            c.src === first.src && (c.id === first.id || c.id === card.id)
              ? { ...c, matched: match, flipped: match }
              : !match && (c.id === first.id || c.id === card.id)
              ? { ...c, flipped: false }
              : c
          )
        );
        setFirst(null);
        setSecond(null);
        setLock(false);
      }, 800);
    }
  };

  return (
  <div className="p-4 max-w-4xl mx-auto">
    <h2 className="text-2xl font-semibold text-center mb-4">🎮 Flip Card Memory Game</h2>
    <div className="text-center text-xl font-bold mb-4">
      Time: {seconds} sec
    </div>
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={() => handleClick(card)} />
      ))}
    </div>
  </div>
);
}