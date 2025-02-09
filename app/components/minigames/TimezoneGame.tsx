"use client";

import React, { useState, useEffect } from 'react';

interface TimezoneGameProps {
  onComplete: () => void;
}

export default function TimezoneGame({ onComplete }: TimezoneGameProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState('');

  // Common timezones with their UTC offsets
  const timezones = [
    { name: 'UTC-12:00 (Baker Island)', value: '-12' },
    { name: 'UTC-10:00 (Hawaii)', value: '-10' },
    { name: 'UTC-08:00 (Pacific Time)', value: '-8' },
    { name: 'UTC-07:00 (Mountain Time)', value: '-7' },
    { name: 'UTC-06:00 (Central Time)', value: '-6' },
    { name: 'UTC-05:00 (Eastern Time)', value: '-5' },
    { name: 'UTC-04:00 (Atlantic Time)', value: '-4' },
    { name: 'UTC-03:00 (Buenos Aires)', value: '-3' },
    { name: 'UTC+00:00 (London)', value: '0' },
    { name: 'UTC+01:00 (Paris)', value: '1' },
    { name: 'UTC+02:00 (Cairo)', value: '2' },
    { name: 'UTC+03:00 (Moscow)', value: '3' },
    { name: 'UTC+05:30 (India)', value: '5.5' },
    { name: 'UTC+08:00 (Singapore)', value: '8' },
    { name: 'UTC+09:00 (Tokyo)', value: '9' },
    { name: 'UTC+10:00 (Sydney)', value: '10' },
    { name: 'UTC+12:00 (Auckland)', value: '12' },
  ];

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimezoneSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(e.target.value);
    if (e.target.value !== '') {
      setTimeout(onComplete, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="mini-game timezone">
      <h3>Set the Correct Timezone</h3>
      <div className="clock-display">
        <div className="current-time">
          {formatTime(currentTime)}
        </div>
      </div>
      <div className="timezone-selector">
        <select 
          value={selectedTimezone}
          onChange={handleTimezoneSelect}
          className="timezone-select"
        >
          <option value="">Select your timezone...</option>
          {timezones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 