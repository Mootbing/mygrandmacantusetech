"use client";

import { useEffect, useState } from 'react';

interface Position {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

interface BouncingProgramProps {
  id: number;
  onClose: (id: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function BouncingProgram({ id, onClose, containerRef }: BouncingProgramProps) {
  const [position, setPosition] = useState<Position>({
    x: Math.random() * 200,
    y: Math.random() * 200,
    velocityX: (Math.random() - 0.5) * 8,
    velocityY: (Math.random() - 0.5) * 8
  });

  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current.getBoundingClientRect();
      
      setPosition(prev => {
        let newX = prev.x + prev.velocityX;
        let newY = prev.y + prev.velocityY;
        let newVelocityX = prev.velocityX;
        let newVelocityY = prev.velocityY;

        // Bounce off walls
        if (newX <= 0 || newX >= container.width - 150) {
          newVelocityX = -prev.velocityX;
          newX = Math.max(0, Math.min(newX, container.width - 150));
        }
        if (newY <= 0 || newY >= container.height - 100) {
          newVelocityY = -prev.velocityY;
          newY = Math.max(0, Math.min(newY, container.height - 100));
        }

        return {
          x: newX,
          y: newY,
          velocityX: newVelocityX,
          velocityY: newVelocityY
        };
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [containerRef]);

  return (
    <div 
      className="bouncing-program"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <button 
        className="close-button"
        onClick={() => onClose(id)}
      >
        ×
      </button>
      <div className="program-content">
        Program {id}
      </div>
    </div>
  );
} 