"use client";

import React, { useState } from 'react';

interface WifiGameProps {
  onComplete: () => void;
}

export default function WifiGame({ onComplete }: WifiGameProps) {
  const [wifiPassword, setWifiPassword] = useState('');
  const [showError, setShowError] = useState(false);
  
  const handleWifiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wifiPassword.toLowerCase() === 'password') {
      onComplete();
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <div className="mini-game wifi">
      <h3>Enter WiFi Password</h3>
      <div className="wifi-container">
        <div className="sticky-note">
          <div className="sticky-note-content">
            <span className="sticky-title">WiFi Info</span>
            <span className="sticky-text">Password: "password"</span>
            <span className="sticky-subtext">(I know, I know... 🙄)</span>
          </div>
        </div>
        <form onSubmit={handleWifiSubmit} className="wifi-form">
          <input
            type="password"
            value={wifiPassword}
            onChange={(e) => setWifiPassword(e.target.value)}
            placeholder="Enter password..."
            className={`wifi-input ${showError ? 'error' : ''}`}
          />
          <button type="submit" className="button">Connect</button>
          {showError && (
            <div className="error-message">
              Incorrect password. Try again!
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 