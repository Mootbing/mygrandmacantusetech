"use client";

import React, { useState } from 'react';

interface SprinklerGameProps {
  onComplete: () => void;
}

export default function SprinklerGame({ onComplete }: SprinklerGameProps) {
  const [startTime, setStartTime] = useState('12:00');
  const [duration, setDuration] = useState(30);
  const [days, setDays] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    setDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = () => {
    // Convert time to 24-hour format for comparison
    const [hours, minutes] = startTime.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;

    // Check if schedule is appropriate (between 5 AM and 9 AM)
    const isGoodTime = timeInMinutes >= 300 && timeInMinutes <= 540; // 5:00 to 9:00
    const isGoodDuration = duration >= 15 && duration <= 45;
    const hasSelectedDays = days.length > 0;

    if (isGoodTime && isGoodDuration && hasSelectedDays) {
      setMessage('Perfect schedule! Early morning watering is best.');
      setTimeout(onComplete, 1500);
    } else {
      if (!isGoodTime) {
        setMessage('Try scheduling early in the morning!');
      } else if (!isGoodDuration) {
        setMessage('Duration should be between 15-45 minutes.');
      } else {
        setMessage('Select at least one day of the week.');
      }
    }
  };

  return (
    <div className="mini-game sprinkler">
      <h3>Set the Sprinkler Schedule</h3>
      <div className="sprinkler-controls">
        <div className="control-group">
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="time-input"
          />
        </div>

        <div className="control-group">
          <label>Duration (minutes):</label>
          <div className="duration-control">
            <button 
              onClick={() => setDuration(prev => Math.max(5, prev - 5))}
              className="adjust-button"
            >
              −
            </button>
            <span className="duration-display">{duration}</span>
            <button 
              onClick={() => setDuration(prev => Math.min(60, prev + 5))}
              className="adjust-button"
            >
              +
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Days:</label>
          <div className="days-selector">
            {daysOfWeek.map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`day-button ${days.includes(day) ? 'selected' : ''}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} className="submit-button">
          Set Schedule
        </button>

        {message && (
          <div className="schedule-message">
            {message}
          </div>
        )}
      </div>
    </div>
  );
} 