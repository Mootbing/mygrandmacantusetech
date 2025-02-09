"use client";

import React, { useState } from 'react';

interface ThermostatGameProps {
  onComplete: () => void;
}

export default function ThermostatGame({ onComplete }: ThermostatGameProps) {
  const [temperature, setTemperature] = useState(75);
  const targetTemp = 69;
  const [message, setMessage] = useState('');

  const adjustTemperature = (change: number) => {
    const newTemp = temperature + change;
    setTemperature(newTemp);
    
    if (newTemp === targetTemp) {
      setMessage('Perfect temperature!');
      setTimeout(onComplete, 1000);
    } else {
      setMessage(newTemp > targetTemp ? 'Too warm...' : 'Too cold...');
    }
  };

  return (
    <div className="mini-game thermostat">
      <h3>Set the Temperature to 69°F</h3>
      <div className="thermostat-display">
        <div className="temp-buttons">
          <button 
            className="temp-button up"
            onClick={() => adjustTemperature(1)}
            disabled={temperature >= 80}
          >
            ▲
          </button>
          <div className="temperature">
            <span className="temp-number">{temperature}</span>
            <span className="temp-degree">°F</span>
          </div>
          <button 
            className="temp-button down"
            onClick={() => adjustTemperature(-1)}
            disabled={temperature <= 60}
          >
            ▼
          </button>
        </div>
        {message && (
          <div className="temp-message">
            {message}
          </div>
        )}
      </div>
    </div>
  );
} 