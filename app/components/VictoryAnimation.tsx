"use client";

import React, { useEffect, useState } from 'react';

const houseFrames = [
  `
   /\\
  /  \\
 /____\\
 |    |
 |  []|
 |    |
 |____|
  `,
  `
    /\\
   /  \\
  /____\\
  |    |
  |[]  |
  |    |
  |____|
  `,
  `
     /\\
    /  \\
   /____\\
   |    |
   |  []|
   |    |
   |____|
  `,
  `
      /\\
     /  \\
    /____\\
    |    |
    |[]  |
    |    |
    |____|
  `
];

export default function VictoryAnimation() {
  const [frame, setFrame] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      setFrame(prev => (prev + 1) % houseFrames.length);
    }, 300);

    const scaleInterval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.1 : 1);
    }, 1000);

    return () => {
      clearInterval(frameInterval);
      clearInterval(scaleInterval);
    };
  }, []);

  return (
    <div className="victory-animation">
      <div className="victory-text">
        <h2>Congratulations!</h2>
        <p>You've helped Grandma fix all her smart home issues!</p>
      </div>
      <pre 
        className="ascii-house"
        style={{ 
          transform: `scale(${scale})`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        {houseFrames[frame]}
      </pre>
    </div>
  );
} 