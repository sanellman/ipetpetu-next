"use client";
import { useState, useEffect } from "react";
import Card from "./Card";
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const cardImages = [
  "/images/cards/card1.jpg",
  "/images/cards/card2.jpg",
  "/images/cards/card3.jpg",
  "/images/cards/card4.jpg",
  "/images/cards/card5.jpg",
  "/images/cards/card6.jpg",
  "/images/cards/card7.jpg",
  "/images/cards/card8.jpg",
  "/images/cards/card9.jpg",
  "/images/cards/card10.jpg",
  "/images/cards/card11.jpg",
  "/images/cards/card12.jpg",
  "/images/cards/card13.jpg",
  "/images/cards/card14.jpg",
  "/images/cards/card15.jpg",
  "/images/cards/card16.jpg",
  "/images/cards/card17.jpg",
  "/images/cards/card18.jpg",
  "/images/cards/card19.jpg",
  "/images/cards/card20.jpg",
];

function fisherYates(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomImages(images, count) {
  return fisherYates(images).slice(0, count);
}

function shuffleCards() {
  const selected = getRandomImages(cardImages, 8); // ดึงมา 8 รูปแบบสุ่ม
  const duplicated = [...selected, ...selected];
  return fisherYates(duplicated).map((src) => ({
    id: uuidv4(),
    src,
    flipped: false,
    matched: false,
  }));
}

export default function FlipCardGame() {
  const [cards, setCards] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [lock, setLock] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
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
    const allMatched = cards.length > 0 && cards.every((card) => card.matched);
    if (allMatched && hasStarted) {
      setIsRunning(false);

      setTimeout(() => {
        Swal.fire({
          title: '🎉 เก่งมาก!',
          text: `ใช้เวลาไปทั้งหมด ${seconds} วินาที`,
          icon: 'success',
          confirmButtonText: 'Done!',
          confirmButtonColor: '#facc15',
        });
      }, 500);
    }
  }, [cards, hasStarted, seconds]);

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
      <h2 className="text-2xl font-semibold text-center mb-4">🎮 มาเล่นเกมรอกัน</h2>
      <div className="text-center text-xl font-bold mb-4 text-yellow-700">
        ⏱️ เวลา: {seconds} วินาที
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => handleClick(card)} />
        ))}
      </div>
    </div>
  );
}