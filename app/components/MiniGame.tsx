"use client";

import React from 'react';
import WifiGame from './minigames/WifiGame';
import RadioGame from './minigames/RadioGame';
import LightbulbGame from './minigames/LightbulbGame';
import ProgramsGame from './minigames/ProgramsGame';
import TimezoneGame from './minigames/TimezoneGame';
import DoorGame from './minigames/DoorGame';
import ThermostatGame from './minigames/ThermostatGame';
import BatteryGame from './minigames/BatteryGame';

interface MiniGameProps {
  type: 'wifi' | 'radio' | 'lightbulb' | 'programs' | 'timezone' | 'door' | 'thermostat' | 'battery';
  onComplete: () => void;
}

export default function MiniGame({ type, onComplete }: MiniGameProps) {
  switch (type) {
    case 'wifi':
      return <WifiGame onComplete={onComplete} />;
    case 'radio':
      return <RadioGame onComplete={onComplete} />;
    case 'lightbulb':
      return <LightbulbGame onComplete={onComplete} />;
    case 'programs':
      return <ProgramsGame onComplete={onComplete} />;
    case 'timezone':
      return <TimezoneGame onComplete={onComplete} />;
    case 'door':
      return <DoorGame onComplete={onComplete} />;
    case 'thermostat':
      return <ThermostatGame onComplete={onComplete} />;
    case 'battery':
      return <BatteryGame onComplete={onComplete} />;
  }
} 