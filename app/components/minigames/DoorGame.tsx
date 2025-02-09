"use client";

import React, { useState, useRef } from 'react';

interface DoorGameProps {
  onComplete: () => void;
}

export default function DoorGame({ onComplete }: DoorGameProps) {
  const [doorOpen, setDoorOpen] = useState(75); // Changed from 100 to 45 degrees
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const doorStartPosition = useRef<number>(75); // Also update initial ref position

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    doorStartPosition.current = doorOpen;
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX.current === null) return;

    const dragDistance = dragStartX.current - e.clientX;
    const newPosition = Math.max(0, Math.min(75, doorStartPosition.current + (dragDistance / 3)));
    setDoorOpen(newPosition);

    if (newPosition <= 5) {
      setDoorOpen(0);
      setIsDragging(false);
      setTimeout(onComplete, 500);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (doorOpen > 5) {
      // Door swings back to halfway if not closed enough
      setDoorOpen(75);
    }
  };

  return (
    <div className="mini-game door">
      <h3>Close the Car Door</h3>
      <div className="door-frame">
        <div 
          className={`car-door ${isDragging ? 'dragging' : ''} ${doorOpen <= 5 ? 'closed' : ''}`}
          style={{ 
            transform: `rotateY(${doorOpen}deg)`,
            transformOrigin: 'left center'
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div className="door-handle" />
          <div className="door-window" />
        </div>
        <div className="car-body" />
      </div>
      <p>Drag the door closed</p>
    </div>
  );
} 