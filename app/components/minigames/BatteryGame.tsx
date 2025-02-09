"use client";

import React, { useState, useRef } from 'react';

interface BatteryGameProps {
  onComplete: () => void;
}

export default function BatteryGame({ onComplete }: BatteryGameProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [batteryRotation, setBatteryRotation] = useState(180);
  const [batteryPosition, setBatteryPosition] = useState({ x: 50, y: 200 });
  const [isCorrect, setIsCorrect] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const batteryStartPos = useRef({ x: 0, y: 0 });

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    batteryStartPos.current = batteryPosition;
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;

    const newX = batteryStartPos.current.x + dx;
    const newY = batteryStartPos.current.y + dy;

    setBatteryPosition({ x: newX, y: newY });

    // Check if battery is in correct position and orientation
    const isInSlot = newX > 140 && newX < 160 && newY > 90 && newY < 110;
    const isCorrectOrientation = batteryRotation === 0;

    if (isInSlot && isCorrectOrientation && !isCorrect) {
      setIsCorrect(true);
      setTimeout(onComplete, 1000);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (!isCorrect) {
      // Return to starting position if not correctly placed
      setBatteryPosition({ x: 50, y: 200 });
    }
  };

  const rotateBattery = () => {
    if (!isDragging) {
      setBatteryRotation((prev) => (prev + 180) % 360);
    }
  };

  return (
    <div className="mini-game battery">
      <h3>Insert Battery Correctly</h3>
      <div className="battery-compartment">
        {/* Battery slot */}
        <div className="battery-slot">
          <div className="terminal positive">+</div>
          <div className="terminal negative">−</div>
        </div>

        {/* Draggable battery */}
        <div
          className={`battery-item ${isDragging ? 'dragging' : ''} ${isCorrect ? 'correct' : ''}`}
          style={{
            transform: `translate(${batteryPosition.x}px, ${batteryPosition.y}px) rotate(${batteryRotation}deg)`,
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onClick={rotateBattery}
        >
          <div className="battery-terminal positive">+</div>
          <div className="battery-body" />
          <div className="battery-terminal negative">−</div>
        </div>
      </div>
      <p>Drag battery to slot & click to rotate</p>
    </div>
  );
} 