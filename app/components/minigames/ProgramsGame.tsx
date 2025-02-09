"use client";

import React, { useState, useRef } from 'react';
import BouncingProgram from './BouncingProgram';

interface ProgramsGameProps {
  onComplete: () => void;
}

export default function ProgramsGame({ onComplete }: ProgramsGameProps) {
  const [programs, setPrograms] = useState([1, 2, 3, 4, 5]);
  const containerRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

  const handleProgramClose = (id: number) => {
    setPrograms(prev => prev.filter(programId => programId !== id));
    if (programs.length <= 1) {
      setTimeout(onComplete, 500);
    }
  };

  return (
    <div 
      className="mini-game programs"
      ref={containerRef}
    >
      <h3>Close All Programs</h3>
      {programs.map(id => (
        <BouncingProgram
          key={id}
          id={id}
          onClose={handleProgramClose}
          containerRef={containerRef}
        />
      ))}
      <p>Click the × to close programs</p>
    </div>
  );
} 