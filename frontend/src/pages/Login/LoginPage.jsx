import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import heroImage from '../../assets/netra-clean-bg.jpg';
import netraLogoIcon from '../../assets/netra-logo-icon.png';
import netraWordmarkDark from '../../assets/netra-wordmark-clean-dark.png';
import {
  Code,
  Cloud,
  ShieldCheck,
  BarChart3,
  Brain,
  Smartphone,
  Infinity as InfinityIcon,
  Database,
  ArrowRight,
  Shield,
  Sparkles,
  AlertCircle,
  Zap,
  Volume2,
  VolumeX
} from 'lucide-react';

// Synthesized sound effects via Web Audio API (zero external assets required)
const playChimeSound = (type = 'click') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.36);
      });
    } else if (type === 'purr') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.26);
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.09);
    }
  } catch (e) {
    // Ignore audio restrictions
  }
};

// Official Google Multicolored "G" Logo
const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// 8 Career Domain Cards Data matching the image exactly
const DOMAIN_CARDS = [
  {
    id: 'web',
    title: 'Web Development',
    icon: Code,
    iconColor: '#7C3AED',
    bgTint: '#F5F3FF',
    hoverSpeech: 'Web Dev: Master full-stack React, Node, and browser architecture!'
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    icon: Cloud,
    iconColor: '#0284C7',
    bgTint: '#F0F9FF',
    hoverSpeech: 'Cloud Track: AWS, Docker, Kubernetes & scalable microservices!'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    icon: ShieldCheck,
    iconColor: '#059669',
    bgTint: '#ECFDF5',
    hoverSpeech: 'Cybersecurity: Ethical hacking, OWASP Top 10 & defensive security!'
  },
  {
    id: 'datascience',
    title: 'Data Science',
    icon: BarChart3,
    iconColor: '#7C3AED',
    bgTint: '#F5F3FF',
    hoverSpeech: 'Data Science: Pandas, ML pipelines, stats & predictive analytics!'
  },
  {
    id: 'aiml',
    title: 'AI & ML',
    icon: Brain,
    iconColor: '#E11D48',
    bgTint: '#FFF1F2',
    hoverSpeech: 'AI & ML: Neural networks, PyTorch, Transformers & generative AI!'
  },
  {
    id: 'app',
    title: 'App Development',
    icon: Smartphone,
    iconColor: '#D97706',
    bgTint: '#FFFBEB',
    hoverSpeech: 'App Dev: Build high-performance mobile apps with Flutter & Dart!'
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: InfinityIcon,
    iconColor: '#2563EB',
    bgTint: '#EFF6FF',
    hoverSpeech: 'DevOps: Automate CI/CD pipelines, Terraform & modern cloud SRE!'
  },
  {
    id: 'database',
    title: 'Database',
    icon: Database,
    iconColor: '#4F46E5',
    bgTint: '#EEF2FF',
    hoverSpeech: 'Database: High-scale SQL, Postgres, Redis caching & data engines!'
  }
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    studentState,
    activeDomain,
    selectDomain,
    handleGoogleSignIn,
    handleDemoSignIn,
    handleSignOut,
    isAuthenticated,
    authUser,
    isAuthLoading,
    authError
  } = useLearning();

  const [lynxMessage, setLynxMessage] = useState(
    'Welcome back! Continue with Google to sync your placement journey. 🐾'
  );
  const [lynxMood, setLynxMood] = useState('welcome');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState(activeDomain || 'web');
  const [isWinking, setIsWinking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // STRICT VIEWPORT LOCK: Completely disable page scrolling, wheeling, and gestures
  useEffect(() => {
    document.documentElement.classList.add('login-lock');
    document.body.classList.add('login-lock');

    const blockScroll = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });

    return () => {
      document.documentElement.classList.remove('login-lock');
      document.body.classList.remove('login-lock');
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
    };
  }, []);

  // Parallax mouse follow
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Google sign in click
  const onGoogleLoginClick = async () => {
    if (soundEnabled) playChimeSound('click');
    setLynxMessage('Connecting to Google and Firebase Auth...');
    setLynxMood('thinking');

    const result = await handleGoogleSignIn();

    if (result.success) {
      if (soundEnabled) playChimeSound('success');
      setLynxMood('celebrating');
      setLynxMessage(`Welcome, ${result.user.name}! Syncing your placement dashboard...`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } else {
      setLynxMood('sad');
      setLynxMessage(
        'Google sign-in was interrupted. You can try again or use Instant Demo mode!'
      );
    }
  };

  // Quick Demo guest login
  const onDemoLoginClick = async () => {
    if (soundEnabled) playChimeSound('success');
    setLynxMood('happy');
    setLynxMessage('Launching placement dashboard in Demo mode! 🚀');
    await handleDemoSignIn();
    setTimeout(() => {
      navigate('/dashboard');
    }, 700);
  };

  // Click on mascot interaction
  const onLynxClick = () => {
    if (soundEnabled) playChimeSound('purr');
    setIsWinking(true);
    setLynxMood('happy');
    const quips = [
      "Purr! NETRA's readiness engine is primed to get you placed!",
      'I will be your companion through every boss test and coding mission! ✦',
      'Choose any domain card on the left to preview what you will build!',
      'Google sign-in securely keeps your daily streak and XP safe on Firebase!'
    ];
    setLynxMessage(quips[Math.floor(Math.random() * quips.length)]);
    setTimeout(() => setIsWinking(false), 800);
  };

  // Domain card click
  const handleDomainCardClick = (domain) => {
    if (soundEnabled) playChimeSound('click');
    setSelectedDomain(domain.id);
    selectDomain(domain.id);
    setLynxMood('motivating');
    setLynxMessage(domain.hoverSpeech);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden',
        overscrollBehavior: 'none',
        touchAction: 'none',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#EDF3F9',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        userSelect: 'none'
      }}
    >
      {/* Background Scenic Landscape Artwork - Stretched to Cover 100% Viewport */}
      <img
        src={heroImage}
        alt="NETRA Placement Preparation Stage"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center bottom',
          userSelect: 'none',
          pointerEvents: 'none',
          transform: `scale(1.02) translate(${mousePos.x * -4}px, ${mousePos.y * -4}px)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1
        }}
      />

      {/* Sound Toggle (Top-right corner) */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #CBD5E1',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#475569',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      {/* ====================================================================
          LAYER 1: TOP HEADER NAVIGATION (Compact, fixed 60px)
          ==================================================================== */}
      <header
        style={{
          position: 'relative',
          height: '64px',
          padding: '12px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 30,
          flexShrink: 0
        }}
      >
        {/* Top-Left Official Logo & Brand */}
        <div
          onClick={() => {
            if (isAuthenticated && authUser) {
              navigate('/dashboard');
            } else {
              navigate('/login');
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <img
            src={netraLogoIcon}
            alt="NETRA Logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              boxShadow: '0 4px 14px rgba(6, 182, 212, 0.45)',
              objectFit: 'cover'
            }}
          />
          <img
            src={netraWordmarkDark}
            alt="NETRA - SEE YOUR NEXT STEP"
            style={{
              height: '34px',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Top-Right "Start Your Journey" */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#334155',
            fontSize: '0.88rem',
            fontWeight: '600',
            marginRight: '44px'
          }}
        >
          <span>Start Your Journey</span>
          <div
            style={{
              width: '32px',
              height: '4px',
              borderRadius: '4px',
              background: 'linear-gradient(90deg, #2563EB, #7C3AED)'
            }}
          />
        </div>
      </header>

      {/* ====================================================================
          LAYER 2: MAIN VIEWPORT STAGE (Strictly fits calc(100vh - 64px))
          ==================================================================== */}
      <main
        style={{
          position: 'relative',
          flex: 1,
          height: 'calc(100vh - 64px)',
          maxHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 36px 14px 36px',
          overflow: 'hidden',
          zIndex: 20
        }}
      >
        {/* ==================================================================
            LEFT COLUMN: HERO CONTENT & 8 DOMAIN CARDS
            ================================================================== */}
        <div
          style={{
            width: '38%',
            maxWidth: '470px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
            zIndex: 20
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '16px',
              background: 'rgba(238, 242, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #DDD6FE',
              color: '#6366F1',
              fontSize: '0.74rem',
              fontWeight: '700',
              width: 'fit-content'
            }}
          >
            <Sparkles size={13} color="#7C3AED" />
            <span>Your Path to High-Paying Tech Careers</span>
          </div>

          {/* Headline */}
          <div>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 2.7vw, 2.35rem)',
                fontWeight: '900',
                color: '#0F172A',
                lineHeight: 1.14,
                letterSpacing: '-0.03em'
              }}
            >
              Learn. Practice.
              <br />
              Build.{' '}
              <span className="text-gradient-placement">Get Placed.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(0.78rem, 1vw, 0.86rem)',
                color: '#475569',
                marginTop: '6px',
                lineHeight: 1.4,
                maxWidth: '410px',
                fontWeight: '500'
              }}
            >
              Personalized learning paths, real projects and placement preparation for
              in-demand tech careers.
            </p>
          </div>

          {/* 8 Career Domain Cards in 2 rows of 4 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              marginTop: '4px'
            }}
          >
            {DOMAIN_CARDS.map((card) => {
              const IconComp = card.icon;
              const isSelected = selectedDomain === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => handleDomainCardClick(card)}
                  onMouseEnter={() => {
                    setLynxMood('thinking');
                    setLynxMessage(card.hoverSpeech);
                  }}
                  className="domain-interactive-card"
                  style={{
                    borderRadius: '14px',
                    padding: '9px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '74px',
                    cursor: 'pointer',
                    position: 'relative',
                    borderColor: isSelected ? '#3B82F6' : 'rgba(226, 232, 240, 0.85)',
                    boxShadow: isSelected
                      ? '0 0 0 2px #3B82F6, 0 6px 14px rgba(37, 99, 235, 0.15)'
                      : undefined
                  }}
                >
                  {/* Icon Badge */}
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: card.bgTint,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.iconColor
                    }}
                  >
                    <IconComp size={16} strokeWidth={2.2} />
                  </div>

                  {/* Card Title & Arrow */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      marginTop: '6px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.67rem',
                        fontWeight: '700',
                        color: isSelected ? '#1D4ED8' : '#1E293B',
                        lineHeight: 1.15
                      }}
                    >
                      {card.title}
                    </span>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: isSelected ? '#2563EB' : '#F1F5F9',
                        color: isSelected ? '#FFFFFF' : '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <ArrowRight size={9} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================================
            SPEECH BUBBLE: POSITIONED HIGH IN OPEN SKY ABOVE THE LYNX
            ================================================================== */}
        <div
          className="anim-bubble-bounce"
          style={{
            position: 'absolute',
            top: '16px',
            left: '52%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1.5px solid #BFDBFE',
            borderRadius: '18px',
            padding: '10px 18px',
            maxWidth: '320px',
            boxShadow: '0 12px 28px -4px rgba(37, 99, 235, 0.2)',
            fontSize: '0.82rem',
            fontWeight: '700',
            color: '#0F172A',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 35
          }}
        >
          {lynxMessage}
          {/* Bubble pointer stem pointing down to the Lynx */}
          <div
            style={{
              position: 'absolute',
              bottom: '-7px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              background: 'white',
              borderRight: '1.5px solid #BFDBFE',
              borderBottom: '1.5px solid #BFDBFE'
            }}
          />
        </div>

        {/* ==================================================================
            CENTER: LYNX MASCOT INTERACTION & ALPINE SPARKLES
            ================================================================== */}
        <div
          onClick={onLynxClick}
          title="Click to interact with the Lynx mascot!"
          style={{
            position: 'absolute',
            left: '52%',
            bottom: '0',
            transform: 'translateX(-50%)',
            width: '340px',
            height: '460px',
            zIndex: 25,
            cursor: 'pointer'
          }}
        >
          {/* Alpine Mountain Sparkles / Fireflies */}
          <div
            className="anim-sparkle"
            style={{
              position: 'absolute',
              left: '18%',
              top: '55%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
              boxShadow: '0 0 10px #22D3EE',
              pointerEvents: 'none'
            }}
          />
          <div
            className="anim-sparkle"
            style={{
              position: 'absolute',
              left: '84%',
              top: '65%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FBBF24 0%, transparent 70%)',
              boxShadow: '0 0 12px #FBBF24',
              pointerEvents: 'none',
              animationDelay: '1.4s'
            }}
          />
          <div
            className="anim-sparkle"
            style={{
              position: 'absolute',
              left: '50%',
              top: '78%',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)',
              boxShadow: '0 0 12px #818CF8',
              pointerEvents: 'none',
              animationDelay: '2.5s'
            }}
          />
        </div>


        {/* ==================================================================
            RIGHT COLUMN: AUTHENTICATION CARD (Compact Frosted Glass)
            ================================================================== */}
        <div
          style={{
            width: '30%',
            maxWidth: '360px',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1.5px solid rgba(255, 255, 255, 0.9)',
            boxShadow:
              '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.7)',
            padding: '26px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'space-between',
            zIndex: 30
          }}
        >
          {/* Card Top: NETRA Logo & Brand */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              width: '100%'
            }}
          >
            {/* Logo Group */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={netraLogoIcon}
                alt="NETRA Logo"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.4)',
                  objectFit: 'cover'
                }}
              />
              <img
                src={netraWordmarkDark}
                alt="NETRA - SEE YOUR NEXT STEP"
                style={{
                  height: '32px',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Title & Subtitle */}
            <div style={{ marginTop: '8px' }}>
              <h2
                style={{
                  fontSize: '1.55rem',
                  fontWeight: '800',
                  color: '#0F172A',
                  letterSpacing: '-0.02em'
                }}
              >
                Welcome Back
              </h2>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#64748B',
                  marginTop: '4px',
                  lineHeight: 1.4,
                  padding: '0 4px'
                }}
              >
                Continue with Google to access your personalized learning journey.
              </p>
            </div>
          </div>

          {/* Card Center: Authentication Actions */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: '18px 0'
            }}
          >
            {isAuthenticated && authUser ? (
              // User already authenticated state
              <div
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1.5px solid #BFDBFE',
                  borderRadius: '16px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={authUser.avatar || studentState.student.avatar}
                    alt={authUser.name}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '2px solid #3B82F6',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0F172A' }}>
                      {authUser.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      {authUser.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-game-primary"
                  style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={handleSignOut}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748B',
                    fontSize: '0.74rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Sign Out / Switch Account
                </button>
              </div>
            ) : (
              // Google Sign-In Button
              <>
                <button
                  onClick={onGoogleLoginClick}
                  disabled={isAuthLoading}
                  className="btn-google-auth"
                  style={{
                    padding: '11px 16px',
                    opacity: isAuthLoading ? 0.75 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <GoogleLogo />
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1E293B' }}>
                      {isAuthLoading ? 'Connecting to Google...' : 'Continue with Google'}
                    </span>
                  </div>
                  <ArrowRight size={15} color="#64748B" />
                </button>

                {/* Instant Guest / Demo Mode Button */}
                <button
                  onClick={onDemoLoginClick}
                  disabled={isAuthLoading}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    background: '#F8FAFC',
                    border: '1px dashed #CBD5E1',
                    color: '#475569',
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Zap size={13} color="#D97706" />
                  <span>Instant Demo Mode (No Google Account)</span>
                </button>
              </>
            )}

            {/* Error Message if Google Login Failed */}
            {authError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#991B1B',
                  fontSize: '0.72rem',
                  textAlign: 'left'
                }}
              >
                <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: '700' }}>Authentication Notice:</div>
                  <div>{authError}</div>
                </div>
              </div>
            )}
          </div>

          {/* Card Footer: Security & Firebase Connection Status */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {/* "Secure login powered by Google" */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#64748B',
                fontWeight: '600'
              }}
            >
              <Shield size={14} color="#64748B" />
              <span>Secure login powered by Google</span>
            </div>

            {/* Live Firebase project status pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.67rem',
                color: '#059669',
                background: '#ECFDF5',
                padding: '2px 8px',
                borderRadius: '10px',
                border: '1px solid #A7F3D0',
                fontWeight: '700'
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 6px #10B981'
                }}
              />
              <span>Firebase: placementpreparation-c7798</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
