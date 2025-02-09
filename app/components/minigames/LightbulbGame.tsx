"use client";

import React, { useState } from 'react';

interface LightbulbGameProps {
  onComplete: () => void;
}

export default function LightbulbGame({ onComplete }: LightbulbGameProps) {
  const [bulbRotation, setBulbRotation] = useState(0);
  const [isLit, setIsLit] = useState(false);

  const handleBulbScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    const rotationChange = delta > 0 ? 15 : -15;
    
    setBulbRotation(prev => {
      const newRotation = prev + rotationChange;
      if (newRotation >= 720) {
        setIsLit(true);
        setTimeout(onComplete, 500);
        return 720;
      }
      return Math.max(0, Math.min(720, newRotation));
    });
  };

  return (
    <div className="mini-game lightbulb">
      <h3>Tighten the Lightbulb</h3>
      <div 
        className="lightbulb-container"
        onWheel={handleBulbScroll}
      >
        <div 
          className={`lightbulb-icon ${isLit ? 'lit' : ''}`}
          style={{ transform: `rotate(${bulbRotation}deg)` }}
        >
          💡
        </div>
      </div>
      <p>Scroll to rotate</p>
    </div>
  );
} 