"use client";

import React, { useState } from 'react';

interface RadioGameProps {
  onComplete: () => void;
}

export default function RadioGame({ onComplete }: RadioGameProps) {
  const [radioOn, setRadioOn] = useState(true);

  const handleRadioToggle = () => {
    setRadioOn(false);
    setTimeout(onComplete, 1000);
  };

  return (
    <div className="mini-game radio">
      <h3>Turn Off the Radio</h3>
      <button 
        className={`radio-button ${radioOn ? 'on' : 'off'}`}
        onClick={handleRadioToggle}
      >
        {radioOn ? '🔊' : '🔇'}
      </button>
      {radioOn && <div className="music-waves">♪♫♪</div>}
    </div>
  );
} 