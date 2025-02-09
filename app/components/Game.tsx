"use client";

import { useState } from 'react';

interface Room {
  id: string;
  name: string;
  description: string;
  puzzle: {
    question: string;
    options: string[];
    correctAnswer: number;
    tip: string;
    wrongAnswerResponses: string[];
  };
  isCompleted: boolean;
}

const initialRooms: Room[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    description: "Grandma's cozy living room has a mysterious smart TV that won't connect.",
    puzzle: {
      question: "Why won't the smart TV connect to WiFi?",
      options: [
        "The TV is unplugged",
        "Wrong WiFi password entered",
        "TV needs to be closer to router",
        "The remote needs new batteries"
      ],
      correctAnswer: 1,
      tip: "Always double-check your WiFi password! It's case-sensitive.",
      wrongAnswerResponses: [
        "Oh sweetie, the TV is definitely plugged in - see that pretty standby light?",
        "That's the right answer! Let's fix that password!",
        "The TV's right next to the router, dear. That's not the issue.",
        "The remote batteries are fresh as daisies - Grandma just changed them yesterday!"
      ]
    },
    isCompleted: false
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: "The smart speaker in the kitchen keeps playing music randomly!",
    puzzle: {
      question: "What's causing the smart speaker to play music unexpectedly?",
      options: [
        "It's possessed by ghosts",
        "Routine schedule is active",
        "Neighbor's device interference",
        "Speaker needs cleaning"
      ],
      correctAnswer: 1,
      tip: "Check your speaker's routine settings in the app to manage automated actions.",
      wrongAnswerResponses: [
        "No, silly! Though Grandma's cookies ARE so good they might attract friendly ghosts!",
        "That's right! Someone's been scheduling midnight jazz sessions!",
        "The neighbors are lovely people, but their devices aren't that powerful!",
        "A clean speaker is nice, but that won't stop the random music, dearie!"
      ]
    },
    isCompleted: false
  },
  // Add more rooms as needed
];

export default function Game() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [currentRoom, setCurrentRoom] = useState<number>(0);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(1);
  const [isPowered, setIsPowered] = useState(true);

  const handleAnswer = (answerIndex: number) => {
    const room = rooms[currentRoom];
    if (answerIndex === room.puzzle.correctAnswer) {
      const newRooms = [...rooms];
      newRooms[currentRoom].isCompleted = true;
      setRooms(newRooms);
      setScore(score + 1);
      setShowTip(true);
      setFeedback('');
    } else {
      setFeedback(room.puzzle.wrongAnswerResponses[answerIndex]);
      const roomElement = document.querySelector('.room');
      roomElement?.classList.remove('shake');
      void roomElement?.offsetWidth;
      roomElement?.classList.add('shake');
    }
  };

  const nextRoom = () => {
    if (currentRoom < rooms.length - 1) {
      setCurrentRoom(currentRoom + 1);
      setShowTip(false);
      setFeedback('');
    }
  };

  const handleFontSizeChange = (type: 'increase' | 'decrease') => {
    const newSize = type === 'increase' 
      ? Math.min(fontSize + 0.2, 2.5)
      : Math.max(fontSize - 0.2, 0.8);
    
    // Check if we hit a limit
    if ((type === 'increase' && newSize === 2.5) || 
        (type === 'decrease' && newSize === 0.8)) {
      const content = document.querySelector('.tv-inner > div');
      content?.classList.remove('scale-limit');
      void content?.offsetWidth; // Trigger reflow
      content?.classList.add('scale-limit');
    }
    
    setFontSize(newSize);
  };

  const handleButtonClick = (type: 'increase' | 'decrease') => {
    const button = document.querySelector(`.tv-button.${type}`);
    button?.classList.remove('spinning');
    void button?.offsetWidth; // Trigger reflow
    button?.classList.add('spinning');
    
    handleFontSizeChange(type);
    
    setTimeout(() => {
      button?.classList.remove('spinning');
    }, 300);
  };

  const handlePowerToggle = () => {
    setIsPowered(!isPowered);
  };

  const room = rooms[currentRoom];

  return (
    <div className={`crt-screen ${!isPowered ? 'power-off' : ''}`}>
      <div className="tv-controls">
        <button 
          className="tv-button decrease" 
          onClick={() => handleButtonClick('decrease')} 
          title="Decrease text size"
        />
        <button 
          className={`tv-button power ${!isPowered ? 'off' : ''}`}
          onClick={handlePowerToggle}
          title="Power"
        >
          <div className="power-indicator" />
        </button>
        <button 
          className="tv-button plus increase" 
          onClick={() => handleButtonClick('increase')} 
          title="Increase text size"
        />
      </div>

      <div className="tv-inner">
        <div style={{ fontSize: `${fontSize}rem` }}>
          <h1 
            className="glitch-text" 
            data-text="Grandma's Smart Home Adventure"
            style={{ textAlign: 'center', marginBottom: '2rem' }}
          >
            Grandma's Smart Home Adventure
          </h1>
          
          <div className="room">
            <h2 className="glitch-text" data-text={room.name}>{room.name}</h2>
            <p style={{ margin: '1rem 0' }}>{room.description}</p>
            
            <div style={{ margin: '2rem 0' }}>
              <h3>{room.puzzle.question}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
                {room.puzzle.options.map((option, index) => (
                  <button
                    key={index}
                    className="button"
                    onClick={() => handleAnswer(index)}
                    disabled={room.isCompleted}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {feedback && (
              <div style={{ 
                margin: '1rem 0', 
                padding: '1rem', 
                border: '2px dashed var(--crt-text)',
                animation: 'fadeIn 0.3s ease-in'
              }}>
                <p>{feedback}</p>
              </div>
            )}

            {showTip && (
              <div style={{ margin: '1rem 0', padding: '1rem', border: '2px dashed var(--crt-text)' }}>
                <h3>Tech Tip Unlocked!</h3>
                <p>{room.puzzle.tip}</p>
                {currentRoom < rooms.length - 1 && (
                  <button className="button" onClick={nextRoom}>
                    Next Room
                  </button>
                )}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p>Score: {score} / {rooms.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 