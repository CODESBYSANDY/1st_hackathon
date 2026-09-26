import React, { useState } from 'react';

/**
 * LynxCompanion Component
 * The central learning guide and mascot of NETRA.
 * Vector-rendered with expressive moods, animated reactions, and speech bubble.
 */
export const LynxCompanion = ({
  mood = 'idle',
  message = null,
  size = 'md', // sm, md, lg, xl
  showBubble = true,
  bubblePosition = 'top', // top, right, left, bottom
  interactive = true,
  onMascotClick = null
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Dimension scaling
  const sizeMap = {
    sm: { width: 70, height: 75, bubbleText: '0.8rem' },
    md: { width: 100, height: 110, bubbleText: '0.9rem' },
    lg: { width: 140, height: 155, bubbleText: '0.98rem' },
    xl: { width: 190, height: 210, bubbleText: '1.05rem' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Eye styling by mood
  const renderEyes = () => {
    switch (mood) {
      case 'happy':
      case 'celebrating':
      case 'levelUp':
        // Happy arcs ^_^
        return (
          <g stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M38 46 Q45 38 52 46" />
            <path d="M68 46 Q75 38 82 46" />
          </g>
        );
      case 'thinking':
        // Looking up to the right
        return (
          <g>
            <circle cx="47" cy="42" r="6" fill="#0284C7" />
            <circle cx="49" cy="40" r="2.5" fill="white" />
            <circle cx="77" cy="42" r="6" fill="#0284C7" />
            <circle cx="79" cy="40" r="2.5" fill="white" />
          </g>
        );
      case 'sad':
      case 'challengeFailure':
        // Empathetic soft downward tilt
        return (
          <g>
            <ellipse cx="45" cy="46" rx="5" ry="6" fill="#1E293B" />
            <circle cx="47" cy="44" r="2" fill="white" />
            <ellipse cx="75" cy="46" rx="5" ry="6" fill="#1E293B" />
            <circle cx="77" cy="44" r="2" fill="white" />
          </g>
        );
      case 'bossBattle':
        // Tactical cyber visor over left eye
        return (
          <g>
            {/* Cyber Visor */}
            <rect x="30" y="38" width="30" height="14" rx="4" fill="#06B6D4" opacity="0.85" />
            <line x1="28" y1="45" x2="62" y2="45" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Right eye */}
            <circle cx="75" cy="45" r="5.5" fill="#0F172A" />
            <circle cx="73" cy="43" r="2" fill="#38BDF8" />
          </g>
        );
      default:
        // Confident, intelligent, bright eyes
        return (
          <g>
            <circle cx="45" cy="45" r="6" fill="#0284C7" />
            <circle cx="45" cy="45" r="3.5" fill="#0F172A" />
            <circle cx="43" cy="43" r="2" fill="white" />
            <circle cx="75" cy="45" r="6" fill="#0284C7" />
            <circle cx="75" cy="45" r="3.5" fill="#0F172A" />
            <circle cx="73" cy="43" r="2" fill="white" />
          </g>
        );
    }
  };

  // Mouth & whiskers
  const renderMouth = () => {
    if (mood === 'sad' || mood === 'challengeFailure') {
      return (
        <path d="M55 58 Q60 55 65 58" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      );
    }
    return (
      <path d="M54 55 Q60 61 66 55" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    );
  };

  // Paws / Gestures
  const renderPaws = () => {
    if (mood === 'welcome') {
      // Right paw waving
      return (
        <g className="anim-float">
          <ellipse cx="88" cy="58" rx="8" ry="11" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" transform="rotate(-25 88 58)" />
          <circle cx="88" cy="54" r="3" fill="#FDA4AF" />
          <circle cx="84" cy="56" r="2" fill="#FDA4AF" />
          <circle cx="92" cy="56" r="2" fill="#FDA4AF" />
        </g>
      );
    }
    if (mood === 'celebrating' || mood === 'levelUp') {
      // Both paws up in celebration
      return (
        <g>
          <ellipse cx="28" cy="38" rx="7" ry="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" transform="rotate(-30 28 38)" />
          <ellipse cx="92" cy="38" rx="7" ry="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" transform="rotate(30 92 38)" />
        </g>
      );
    }
    if (mood === 'thinking') {
      // Paw touching chin
      return (
        <ellipse cx="60" cy="62" rx="7" ry="9" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      );
    }
    return null;
  };

  return (
    <div 
      className={`lynx-container inline-flex flex-col items-center select-none relative ${interactive ? 'cursor-pointer' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onMascotClick}
      style={{
        display: 'inline-flex',
        flexDirection: bubblePosition === 'bottom' ? 'column-reverse' : 'column',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      {/* Speech Bubble */}
      {showBubble && message && (
        <div
          className="lynx-bubble anim-float"
          style={{
            maxWidth: '300px',
            fontSize: currentSize.bubbleText,
            textAlign: 'center',
            marginBottom: bubblePosition === 'top' ? '8px' : '0',
            marginTop: bubblePosition === 'bottom' ? '8px' : '0',
            border: mood === 'celebrating' || mood === 'levelUp' ? '1.5px solid #FBBF24' : '1px solid #E2E8F0',
            background: mood === 'bossBattle' ? '#0F172A' : '#FFFFFF',
            color: mood === 'bossBattle' ? '#38BDF8' : '#0F172A',
            boxShadow: mood === 'celebrating' ? '0 0 16px rgba(251, 191, 36, 0.25)' : 'var(--shadow-md)',
            borderRadius: '16px',
            padding: '10px 16px'
          }}
        >
          {message}
        </div>
      )}

      {/* SVG Mascot Character */}
      <div 
        className="lynx-mascot-wrapper transition-transform duration-300"
        style={{
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
          filter: mood === 'bossBattle' ? 'drop-shadow(0 0 14px rgba(6, 182, 212, 0.4))' : 'drop-shadow(0 6px 12px rgba(0,0,0,0.06))'
        }}
      >
        <svg
          width={currentSize.width}
          height={currentSize.height}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Aura Halo if Celebrating or LevelUp */}
          {(mood === 'celebrating' || mood === 'levelUp') && (
            <circle cx="60" cy="55" r="48" fill="url(#haloGrad)" opacity="0.35" className="anim-pulse-glow" />
          )}

          {/* Ears with Iconic Lynx Tufts */}
          {/* Left Ear */}
          <path d="M30 45 L18 10 L48 30 Z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M32 40 L24 16 L44 30 Z" fill="#FDA4AF" opacity="0.65" />
          {/* Left Ear Black Tuft (Iconic Lynx feature) */}
          <path d="M18 10 Q14 2 12 0 Q18 5 21 8" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />

          {/* Right Ear */}
          <path d="M90 45 L102 10 L72 30 Z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M88 40 L96 16 L76 30 Z" fill="#FDA4AF" opacity="0.65" />
          {/* Right Ear Black Tuft */}
          <path d="M102 10 Q106 2 108 0 Q102 5 99 8" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />

          {/* Golden Crown if LevelUp */}
          {mood === 'levelUp' && (
            <g transform="translate(42, -2)">
              <polygon points="0,18 9,4 18,18 27,4 36,18" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
              <circle cx="18" cy="18" r="3" fill="#DC2626" />
            </g>
          )}

          {/* Head Shape with Cheek Tufts (Fluffy Lynx Face) */}
          <path
            d="M26 50 
               C20 62 20 72 32 78 
               C42 85 78 85 88 78 
               C100 72 100 62 94 50 
               C90 32 30 32 26 50 Z"
            fill="url(#lynxFurGrad)"
            stroke="#CBD5E1"
            strokeWidth="2.5"
          />

          {/* White Muzzle & Fluff */}
          <ellipse cx="60" cy="62" rx="22" ry="14" fill="#FFFFFF" />

          {/* Cute Lynx Pink Nose */}
          <polygon points="56,53 64,53 60,58" fill="#F43F5E" />

          {/* Whiskers */}
          <line x1="42" y1="60" x2="28" y2="58" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="64" x2="30" y2="67" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="78" y1="60" x2="92" y2="58" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="78" y1="64" x2="90" y2="67" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Eyes (Dynamic by Mood) */}
          {renderEyes()}

          {/* Mouth */}
          {renderMouth()}

          {/* Forehead Markings (Subtle Tech Cheetah/Lynx Pattern) */}
          <path d="M57 28 L60 33 L63 28" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="53" cy="30" r="1.5" fill="#94A3B8" />
          <circle cx="67" cy="30" r="1.5" fill="#94A3B8" />

          {/* Paws */}
          {renderPaws()}

          {/* Tech Collar with NETRA Eye Emblem */}
          <rect x="42" y="80" width="36" height="8" rx="4" fill="#2563EB" />
          <circle cx="60" cy="84" r="7" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          {/* Glowing Eye of Netra Center */}
          <circle cx="60" cy="84" r="3" fill="#22D3EE" />

          {/* Gradients */}
          <defs>
            <linearGradient id="lynxFurGrad" x1="20" y1="20" x2="100" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
