"use client";

import { useState } from 'react';
import MiniGame from './MiniGame';
import VictoryAnimation from './VictoryAnimation';

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
        "Incorrect WiFi password entered",
        "TV is too far from the router",
        "Remote control batteries are dead"
      ],
      correctAnswer: 1,
      tip: "Always double-check your WiFi password! Remember, it's case-sensitive.",
      wrongAnswerResponses: [
        "No, dear—the TV is definitely powered on!",
        "That's right! The password must be entered correctly.",
        "Not at all; the TV is right next to the router.",
        "The remote is working fine; its batteries were replaced recently!"
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
        "Haunted by ghostly melodies",
        "A pre-programmed routine is triggering the music",
        "Neighbor's device interference",
        "Mechanical malfunction in the speaker"
      ],
      correctAnswer: 1,
      tip: "Check the speaker's routine settings in the app to manage automated actions.",
      wrongAnswerResponses: [
        "No way—there are no ghosts in this kitchen!",
        "That's correct! A routine is scheduling the music.",
        "Not likely—the neighbor's devices aren't affecting your speaker.",
        "The speaker is mechanically sound; the issue is in its settings."
      ]
    },
    isCompleted: false
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: "Grandma's bedroom light keeps flickering when she's trying to sleep.",
    puzzle: {
      question: "What might be causing the bedroom light to flicker?",
      options: [
        "The light bulb is loose",
        "Faulty wiring",
        "A ghost is playing tricks",
        "Dimmer switch malfunction"
      ],
      correctAnswer: 0,
      tip: "Sometimes simply tightening a loose bulb can solve the problem!",
      wrongAnswerResponses: [
        "Not quite—securing the bulb is often all it takes.",
        "Faulty wiring is serious, but it doesn't match this subtle flicker.",
        "There's no ghost in your bedroom, dear!",
        "A dimmer malfunction would likely cause more erratic behavior."
      ]
    },
    isCompleted: false
  },
  {
    id: 'study',
    name: 'Study',
    description: "Grandma's computer keeps freezing during her video calls.",
    puzzle: {
      question: "What is a common cause for a computer to freeze during video calls?",
      options: [
        "The computer is overheating",
        "It has insufficient memory",
        "Internet connectivity issues",
        "Too many programs are running simultaneously"
      ],
      correctAnswer: 3,
      tip: "Closing unnecessary programs can free up resources and smooth out video calls.",
      wrongAnswerResponses: [
        "Overheating can cause problems, but that's not the main issue here.",
        "Memory constraints might slow things down, but they rarely cause complete freezes.",
        "Internet issues tend to cause lag, not a full freeze.",
        "That's right—reducing open programs can help prevent freezing."
      ]
    },
    isCompleted: false
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    description: "Grandma's smart mirror is displaying the wrong date and time.",
    puzzle: {
      question: "What might be causing the smart mirror to show the wrong date?",
      options: [
        "The mirror needs a software update",
        "Time zone settings are incorrect",
        "It's reflecting a parallel universe",
        "Internal battery is low"
      ],
      correctAnswer: 1,
      tip: "Check and adjust the time zone settings in the mirror's configuration.",
      wrongAnswerResponses: [
        "A software update could help in some cases, but not here.",
        "That's correct—an incorrect time zone setting is the likely culprit.",
        "As fun as a parallel universe would be, that's not the issue.",
        "A low battery would more likely shut it down than alter the time."
      ]
    },
    isCompleted: false
  },
  {
    id: 'garage',
    name: 'Garage',
    description: "Grandma's electric car is not starting, even though the battery is charged.",
    puzzle: {
      question: "What could be the issue preventing the car from starting?",
      options: [
        "The car keys are not recognized",
        "Software glitch in the car's system",
        "The door isn't fully closed",
        "The tires are flat"
      ],
      correctAnswer: 2,
      tip: "Ensure all safety checks, like closed doors, are met before starting the car.",
      wrongAnswerResponses: [
        "The keys are working perfectly fine, dear.",
        "A software glitch is unlikely with a fully charged battery.",
        "That's right! The car won't start if the door is ajar.",
        "Flat tires would affect driving, not the starting process."
      ]
    },
    isCompleted: false
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    description: "Grandma's smart refrigerator is not keeping the food cold.",
    puzzle: {
      question: "What is a potential reason for the smart refrigerator malfunction?",
      options: [
        "The thermostat is set too high",
        "The fridge is overloaded",
        "A power outage affected it",
        "It needs a defrost cycle"
      ],
      correctAnswer: 0,
      tip: "Check the thermostat settings and adjust them to a cooler temperature.",
      wrongAnswerResponses: [
        "That's right—adjusting the thermostat should help!",
        "Overloading can be a factor, but it's not the issue here.",
        "A power outage would cause a broader range of issues.",
        "A defrost cycle is important, but it doesn't directly affect temperature settings."
      ]
    },
    isCompleted: false
  },
  {
    id: 'basement',
    name: 'Basement',
    description: "Grandma's home security system is triggering false alarms.",
    puzzle: {
      question: "Why might the home security system be giving false alarms?",
      options: [
        "Faulty sensors",
        "Interference from other devices",
        "Low battery in the sensors",
        "A software bug in the system"
      ],
      correctAnswer: 2,
      tip: "Try replacing the sensor batteries to see if the false alarms stop.",
      wrongAnswerResponses: [
        "Faulty sensors would cause constant issues, not sporadic alarms.",
        "Interference is possible, but low battery is more common here.",
        "That's right—replacing the batteries might resolve the issue.",
        "Software bugs are less likely to cause intermittent false alarms."
      ]
    },
    isCompleted: false
  },
  {
    id: 'garden',
    name: 'Garden',
    description: "Grandma's smart sprinkler system is watering at odd hours.",
    puzzle: {
      question: "What could be causing the smart sprinkler system to run unexpectedly?",
      options: [
        "The weather app is malfunctioning",
        "Scheduled timers are set incorrectly",
        "The system is hacked by mischievous gnomes",
        "Rain sensors are faulty"
      ],
      correctAnswer: 1,
      tip: "Review the schedule settings in the sprinkler's app to fix the timing.",
      wrongAnswerResponses: [
        "The weather app might be off sometimes, but that's not the issue here.",
        "That's correct—incorrect timers can lead to unexpected watering.",
        "As amusing as gnomes sound, they aren't behind your sprinkler's schedule.",
        "Faulty rain sensors typically prevent watering, not trigger it."
      ]
    },
    isCompleted: false
  },
  {
    id: 'attic',
    name: 'Attic',
    description: "Grandma's digital photo frame is stuck on a single picture.",
    puzzle: {
      question: "What might be causing the digital photo frame to not rotate through photos?",
      options: [
        "The memory card is corrupted",
        "Slide show settings are turned off",
        "The frame is in sleep mode",
        "The WiFi is disconnected"
      ],
      correctAnswer: 1,
      tip: "Make sure the slideshow option is enabled in the photo frame settings.",
      wrongAnswerResponses: [
        "A corrupted memory card would lead to missing photos, not a static display.",
        "That's right—enabling the slideshow should fix the issue.",
        "If it were in sleep mode, the frame would likely be off.",
        "WiFi disconnection affects online features, not locally stored photos."
      ]
    },
    isCompleted: false
  }
];

export default function Game() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [currentRoom, setCurrentRoom] = useState<number>(0);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(1);
  const [isPowered, setIsPowered] = useState(true);
  const [showMiniGame, setShowMiniGame] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const room = rooms[currentRoom];
    if (answerIndex === room.puzzle.correctAnswer) {
      const newRooms = [...rooms];
      newRooms[currentRoom].isCompleted = true;
      setRooms(newRooms);
      setScore(score + 1);
      setFeedback('');
      setShowTip(true);
    } else {
      setFeedback(room.puzzle.wrongAnswerResponses[answerIndex]);
      const roomElement = document.querySelector('.room') as HTMLElement;
      roomElement?.classList.remove('shake');
      void roomElement?.offsetWidth;
      roomElement?.classList.add('shake');
    }
  };

  const nextRoom = () => {
    if (currentRoom < rooms.length - 1) {
      setShowTip(false);
      setShowMiniGame(true);
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
      const content = document.querySelector('.tv-inner > div') as HTMLElement;
      content?.classList.remove('scale-limit');
      void content?.offsetWidth;
      content?.classList.add('scale-limit');
    }
    
    setFontSize(newSize);
  };

  const handleButtonClick = (type: 'increase' | 'decrease') => {
    const button = document.querySelector(`.tv-button.${type}`) as HTMLElement;
    button?.classList.remove('spinning');
    void button?.offsetWidth;
    button?.classList.add('spinning');
    
    handleFontSizeChange(type);
    
    setTimeout(() => {
      button?.classList.remove('spinning');
    }, 300);
  };

  const handlePowerToggle = () => {
    setIsPowered(!isPowered);
  };

  const handleMiniGameComplete = () => {
    setShowMiniGame(false);
    setCurrentRoom(currentRoom + 1);
  };

  const getMiniGameType = () => {
    switch (currentRoom) {
      case 0:
        return 'wifi';
      case 1:
        return 'radio';
      case 2:
        return 'lightbulb';
      case 3:
        return 'programs';
      case 4:
        return 'timezone';
      case 5:
        return 'door';
      case 6:
        return 'thermostat';
      case 7:
        return 'battery';
      case 8:
        return 'sprinkler';
      default:
        return 'wifi';
    }
  };

  const room = rooms[currentRoom];

  // Add check for game completion
  const isGameComplete = rooms.every(room => room.isCompleted);

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
          {isGameComplete ? (
            <VictoryAnimation />
          ) : (
            <div className="room">
              {showMiniGame ? (
                <MiniGame 
                  type={getMiniGameType()} 
                  onComplete={handleMiniGameComplete}
                />
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 