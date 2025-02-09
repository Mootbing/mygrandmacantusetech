"use client";

import React, { useState } from 'react';

interface WifiGameProps {
  onComplete: () => void;
}

export default function WifiGame({ onComplete }: WifiGameProps) {
  const [wifiPassword, setWifiPassword] = useState('');
  
  const handleWifiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wifiPassword.length > 0) {
      onComplete();
    }
  };

  return (
    <div className="mini-game wifi">
      <h3>Enter WiFi Password</h3>
      <form onSubmit={handleWifiSubmit}>
        <input
          type="password"
          value={wifiPassword}
          onChange={(e) => setWifiPassword(e.target.value)}
          placeholder="Enter password..."
          className="wifi-input"
        />
        <button type="submit" className="button">Connect</button>
      </form>
    </div>
  );
} 