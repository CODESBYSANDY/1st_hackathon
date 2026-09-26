import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const LynxContext = createContext();

const DEFAULT_MESSAGES = {
  idle: "Ready for your next step?",
  welcome: "Welcome back! Ready to continue your journey?",
  encouraging: "Let's learn this together.",
  celebrating: "Mission complete! Spectacular work!",
  thinking: "Let's analyze this concept step-by-step.",
  happy: "You're building tremendous momentum!",
  sad: "That's okay. Let's understand why and conquer it.",
  motivating: "Choose your world. Your path to tech placement starts here!",
  levelUp: "Level unlocked! Your next milestone awaits!",
  lessonComplete: "Concept mastered! Ready for the challenge?",
  challengeSuccess: "Great work! Flawless execution.",
  challengeFailure: "Don't worry. Let's learn from that mistake.",
  bossComplete: "Boss defeated! You conquered the level!",
  locked: "This milestone is locked. Complete preceding missions to proceed."
};

export const LynxProvider = ({ children }) => {
  const [mood, setMood] = useState('welcome');
  const [message, setMessage] = useState(DEFAULT_MESSAGES.welcome);
  const timerRef = useRef(null);

  const setLynxState = useCallback((newMood, customMessage = null, durationMs = null) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setMood(newMood);
    setMessage(customMessage || DEFAULT_MESSAGES[newMood] || DEFAULT_MESSAGES.idle);

    if (durationMs) {
      timerRef.current = setTimeout(() => {
        setMood('idle');
        setMessage(DEFAULT_MESSAGES.idle);
      }, durationMs);
    }
  }, []);

  return (
    <LynxContext.Provider
      value={{
        mood,
        message,
        setLynxState,
      }}
    >
      {children}
    </LynxContext.Provider>
  );
};

export const useLynx = () => {
  const context = useContext(LynxContext);
  if (!context) {
    throw new Error('useLynx must be used within a LynxProvider');
  }
  return context;
};
