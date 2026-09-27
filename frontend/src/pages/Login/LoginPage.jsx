import React, { useEffect, useState } from 'react';
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
  VolumeX,
} from 'lucide-react';

/* =========================================================
   GOOGLE LOGO
========================================================= */

const GoogleLogo = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
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

/* =========================================================
   DOMAIN DATA
========================================================= */

const DOMAIN_CARDS = [
  {
    id: 'web',
    title: 'Web Development',
    icon: Code,
    iconColor: '#7C3AED',
    bgTint: '#F5F3FF',
    hoverSpeech:
      'Web Dev: Master full-stack React, Node, and browser architecture!',
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    icon: Cloud,
    iconColor: '#0284C7',
    bgTint: '#F0F9FF',
    hoverSpeech:
      'Cloud Track: AWS, Docker, Kubernetes & scalable microservices!',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    icon: ShieldCheck,
    iconColor: '#059669',
    bgTint: '#ECFDF5',
    hoverSpeech:
      'Cybersecurity: Ethical hacking, OWASP Top 10 & defensive security!',
  },
  {
    id: 'datascience',
    title: 'Data Science',
    icon: BarChart3,
    iconColor: '#7C3AED',
    bgTint: '#F5F3FF',
    hoverSpeech:
      'Data Science: Pandas, ML pipelines, stats & predictive analytics!',
  },
  {
    id: 'aiml',
    title: 'AI & ML',
    icon: Brain,
    iconColor: '#E11D48',
    bgTint: '#FFF1F2',
    hoverSpeech:
      'AI & ML: Neural networks, PyTorch, Transformers & generative AI!',
  },
  {
    id: 'app',
    title: 'App Development',
    icon: Smartphone,
    iconColor: '#D97706',
    bgTint: '#FFFBEB',
    hoverSpeech:
      'App Dev: Build high-performance mobile apps with Flutter & Dart!',
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: InfinityIcon,
    iconColor: '#2563EB',
    bgTint: '#EFF6FF',
    hoverSpeech:
      'DevOps: Automate CI/CD pipelines, Terraform & modern cloud SRE!',
  },
  {
    id: 'database',
    title: 'Database',
    icon: Database,
    iconColor: '#4F46E5',
    bgTint: '#EEF2FF',
    hoverSpeech:
      'Database: High-scale SQL, Postgres, Redis caching & data engines!',
  },
];

/* =========================================================
   SOUND
========================================================= */

const playChimeSound = (type = 'click') => {
  try {
    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    const ctx = new AudioContext();

    if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.5];

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const start = ctx.currentTime + index * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.1, start);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          start + 0.35
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.36);
      });
    } else if (type === 'purr') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        540,
        ctx.currentTime + 0.15
      );

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.25
      );

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
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.08
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.09);
    }
  } catch {
    // Browser audio restrictions are intentionally ignored.
  }
};

/* =========================================================
   LOGIN PAGE
========================================================= */

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
    authError,
  } = useLearning();

  const [selectedDomain, setSelectedDomain] = useState(
    activeDomain || 'web'
  );

  const [soundEnabled, setSoundEnabled] = useState(true);

  const [lynxMessage, setLynxMessage] = useState(
    'Welcome back! Continue with Google to sync your placement journey. 🐾'
  );

  const [isLynxHovered, setIsLynxHovered] = useState(false);

  /* =========================================================
     PAGE LOCK
  ========================================================= */

  useEffect(() => {
    document.documentElement.classList.add('login-page-root');
    document.body.classList.add('login-page-root');

    return () => {
      document.documentElement.classList.remove('login-page-root');
      document.body.classList.remove('login-page-root');
    };
  }, []);

  /* =========================================================
     GOOGLE LOGIN
  ========================================================= */

  const onGoogleLoginClick = async () => {
    if (soundEnabled) {
      playChimeSound('click');
    }

    setLynxMessage(
      'Connecting to Google and Firebase Auth...'
    );

    const result = await handleGoogleSignIn();

    if (result?.success) {
      if (soundEnabled) {
        playChimeSound('success');
      }

      setLynxMessage(
        `Welcome, ${result.user?.name || 'there'}! Syncing your placement dashboard...`
      );

      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } else {
      setLynxMessage(
        'Google sign-in was interrupted. Please try again or use Instant Demo mode.'
      );
    }
  };

  /* =========================================================
     DEMO LOGIN
  ========================================================= */

  const onDemoLoginClick = async () => {
    if (soundEnabled) {
      playChimeSound('success');
    }

    setLynxMessage(
      'Launching placement dashboard in Demo mode! 🚀'
    );

    await handleDemoSignIn();

    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  /* =========================================================
     LYNX INTERACTION
  ========================================================= */

  const onLynxClick = () => {
    if (soundEnabled) {
      playChimeSound('purr');
    }

    const messages = [
      "Purr! I'm ready to help you get placed!",
      'Choose a domain and start building your journey! ✦',
      'Your next challenge is closer than you think!',
      'Keep learning. Keep building. Keep moving forward!',
    ];

    setLynxMessage(
      messages[Math.floor(Math.random() * messages.length)]
    );
  };

  /* =========================================================
     DOMAIN CLICK
  ========================================================= */

  const handleDomainCardClick = (domain) => {
    if (soundEnabled) {
      playChimeSound('click');
    }

    setSelectedDomain(domain.id);
    selectDomain(domain.id);
    setLynxMessage(domain.hoverSpeech);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="login-page">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="login-background">
        <img
          src={heroImage}
          alt=""
          className="login-background-image"
        />

        <div className="background-white-fade" />
        <div className="background-top-glow" />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="login-header">

        <button
          type="button"
          className="brand-button"
          onClick={() =>
            navigate(isAuthenticated ? '/dashboard' : '/login')
          }
          aria-label="Go to home"
        >
          <img
            src={netraLogoIcon}
            alt="NETRA"
            className="brand-icon"
          />

          <img
            src={netraWordmarkDark}
            alt="NETRA - See Your Next Step"
            className="brand-wordmark"
          />
        </button>

        <div className="journey-link">
          <span>Start Your Journey</span>
          <span className="journey-line" />
        </div>

        <button
          type="button"
          className="sound-button"
          onClick={() => setSoundEnabled((value) => !value)}
          aria-label={
            soundEnabled
              ? 'Mute sound effects'
              : 'Enable sound effects'
          }
        >
          {soundEnabled ? (
            <Volume2 size={17} />
          ) : (
            <VolumeX size={17} />
          )}
        </button>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="login-main">

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <section className="hero-column">

          <div className="hero-badge">
            <Sparkles size={15} />
            <span>Your Path to High-Paying Tech Careers</span>
          </div>

          <h1 className="hero-title">
            Learn. Practice.
            <br />
            Build.{' '}
            <span>Get Placed.</span>
          </h1>

          <p className="hero-description">
            Personalized learning paths, real projects and
            placement preparation for in-demand tech careers.
          </p>

          {/* DOMAIN GRID */}

          <div className="domain-grid">

            {DOMAIN_CARDS.map((domain) => {
              const Icon = domain.icon;
              const isSelected =
                selectedDomain === domain.id;

              return (
                <button
                  type="button"
                  key={domain.id}
                  className={`domain-card ${isSelected ? 'selected' : ''
                    }`}
                  onClick={() =>
                    handleDomainCardClick(domain)
                  }
                  onMouseEnter={() =>
                    setLynxMessage(domain.hoverSpeech)
                  }
                  style={{
                    '--icon-color': domain.iconColor,
                    '--icon-background': domain.bgTint,
                  }}
                >

                  <div className="domain-icon">
                    <Icon
                      size={21}
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="domain-card-bottom">

                    <span className="domain-title">
                      {domain.title}
                    </span>

                    <span className="domain-arrow">
                      <ArrowRight size={11} />
                    </span>

                  </div>

                </button>
              );
            })}

          </div>

        </section>

        {/* ===================================================
            CENTER LYNX AREA
        =================================================== */}

        <section className="lynx-column">

          <div className="lynx-speech">
            {lynxMessage}

            <div className="speech-pointer" />
          </div>

          <button
            type="button"
            className={`lynx-interaction ${isLynxHovered ? 'hovered' : ''
              }`}
            onClick={onLynxClick}
            onMouseEnter={() => setIsLynxHovered(true)}
            onMouseLeave={() => setIsLynxHovered(false)}
            aria-label="Interact with Lynx mascot"
          >
            <div className="lynx-glow" />
            <div className="lynx-image-wrapper" aria-hidden="true" />
          </button>

        </section>

        {/* ===================================================
            AUTH CARD
        =================================================== */}

        <section className="auth-column">

          <div className="auth-card">

            {/* AUTH BRAND */}

            <div className="auth-brand">

              <div className="auth-brand-logo">
                <img
                  src={netraLogoIcon}
                  alt="NETRA"
                />

                <img
                  src={netraWordmarkDark}
                  alt="NETRA"
                />
              </div>

              <h2>Welcome Back</h2>

              <p>
                Continue with Google to access your
                personalized learning journey.
              </p>

            </div>

            {/* AUTH ACTIONS */}

            <div className="auth-actions">

              {isAuthenticated && authUser ? (

                <div className="authenticated-box">

                  <div className="user-information">

                    <img
                      src={
                        authUser.avatar ||
                        studentState?.student?.avatar
                      }
                      alt={authUser.name || 'User'}
                      className="user-avatar"
                    />

                    <div className="user-text">

                      <strong>
                        {authUser.name}
                      </strong>

                      <span>
                        {authUser.email}
                      </span>

                    </div>

                  </div>

                  <button
                    type="button"
                    className="dashboard-button"
                    onClick={() =>
                      navigate('/dashboard')
                    }
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight size={17} />
                  </button>

                  <button
                    type="button"
                    className="switch-account-button"
                    onClick={handleSignOut}
                  >
                    Sign Out / Switch Account
                  </button>

                </div>

              ) : (

                <>
                  <button
                    type="button"
                    className="google-button"
                    onClick={onGoogleLoginClick}
                    disabled={isAuthLoading}
                  >

                    <span className="google-button-left">
                      <GoogleLogo />

                      <span>
                        {isAuthLoading
                          ? 'Connecting to Google...'
                          : 'Continue with Google'}
                      </span>
                    </span>

                    <ArrowRight size={18} />

                  </button>

                  <button
                    type="button"
                    className="demo-button"
                    onClick={onDemoLoginClick}
                    disabled={isAuthLoading}
                  >
                    <Zap size={14} />

                    <span>
                      Instant Demo Mode (No Google Account)
                    </span>
                  </button>
                </>

              )}

              {/* AUTH ERROR */}

              {authError && (

                <div className="auth-error">

                  <AlertCircle
                    size={16}
                    className="error-icon"
                  />

                  <div>
                    <strong>
                      Authentication Notice
                    </strong>

                    <span>
                      {authError}
                    </span>
                  </div>

                </div>

              )}

            </div>

            {/* SECURITY */}

            <div className="auth-footer">

              <div className="security-line">
                <Shield size={15} />
                <span>
                  Secure login powered by Google
                </span>
              </div>

              <div className="firebase-status">
                <span className="firebase-dot" />
                Firebase Authentication
              </div>

            </div>

          </div>

        </section>

      </main>

      {/* =====================================================
          INLINE RESPONSIVE STYLES
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html.login-page-root,
        body.login-page-root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
        }

        button {
          font-family: inherit;
        }

        /* ================================================
           PAGE
        ================================================ */

        .login-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          height: 100vh;
          overflow: hidden;
          color: #0f172a;
          font-family:
            "Plus Jakarta Sans",
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          background:
            linear-gradient(
              135deg,
              #f8fbff 0%,
              #edf5ff 50%,
              #f8fbff 100%
            );
        }

        /* ================================================
           BACKGROUND
        ================================================ */

        .login-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .login-background-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          transform: scale(1.015);
          filter: saturate(1.08) contrast(1.02);
        }

        .background-white-fade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,0.30) 0%,
              rgba(255,255,255,0.14) 30%,
              rgba(255,255,255,0.035) 55%,
              rgba(255,255,255,0.08) 100%
            );
        }

        .background-top-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 48% 15%,
              rgba(255,255,255,0.18),
              transparent 42%
            );
        }

        /* ================================================
           HEADER
        ================================================ */

        .login-header {
          position: relative;
          z-index: 20;

          width: 100%;
          height: 88px;

          padding:
            18px
            clamp(24px, 5vw, 76px);

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-button {
          display: flex;
          align-items: center;
          gap: 12px;

          padding: 0;
          border: 0;
          background: transparent;

          cursor: pointer;
        }

        .brand-icon {
          width: 46px;
          height: 46px;
          object-fit: contain;
          border-radius: 12px;
        }

        .brand-wordmark {
          width: 145px;
          height: auto;
          object-fit: contain;
        }

        .journey-link {
          position: absolute;
          right: clamp(80px, 7vw, 110px);

          display: flex;
          align-items: center;
          gap: 13px;

          font-size: 14px;
          font-weight: 700;
          color: #334155;
        }

        .journey-line {
          width: 38px;
          height: 4px;
          border-radius: 99px;

          background:
            linear-gradient(
              90deg,
              #2563eb,
              #7c3aed
            );
        }

        .sound-button {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(148,163,184,0.35);
          border-radius: 50%;

          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(12px);

          color: #475569;

          cursor: pointer;

          box-shadow:
            0 8px 22px rgba(15,23,42,0.08);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .sound-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 28px rgba(15,23,42,0.13);
        }

        /* ================================================
           MAIN
        ================================================ */

        .login-main {
          position: relative;
          z-index: 10;

          width: 100%;
          height: calc(100vh - 88px);

          padding:
            18px
            clamp(24px, 5vw, 76px)
            35px;

          display: grid;

          grid-template-columns:
            minmax(390px, 1.15fr)
            minmax(300px, 0.95fr)
            minmax(330px, 0.75fr);

          align-items: center;

          gap: clamp(20px, 3vw, 55px);
        }

        /* ================================================
           HERO
        ================================================ */

        .hero-column {
          position: relative;
          z-index: 15;

          max-width: 560px;
          justify-self: start;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transform: translateY(-38px);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          padding: 8px 14px;

          border-radius: 999px;

          background:
            rgba(245,243,255,0.90);

          border:
            1px solid rgba(196,181,253,0.55);

          color: #5b5bd6;

          font-size: 13px;
          font-weight: 800;

          box-shadow:
            0 8px 22px rgba(79,70,229,0.08);

          margin-bottom: 18px;
        }

        .hero-title {
          margin: 0;

          font-size:
            clamp(
              2.9rem,
              3.9vw,
              4.75rem
            );

          line-height: 0.98;

          letter-spacing: -0.055em;

          font-weight: 900;

          color: #07132f;
          text-shadow: 0 2px 18px rgba(255,255,255,0.28);
        }

        .hero-title span {
          background:
            linear-gradient(
              90deg,
              #0ea5e9,
              #2563eb,
              #7c3aed
            );

          -webkit-background-clip: text;
          background-clip: text;

          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          max-width: 500px;

          margin:
            22px 0 25px;

          color: #334155;
          text-shadow: 0 1px 10px rgba(255,255,255,0.20);

          font-size:
            clamp(14px, 1.15vw, 17px);

          line-height: 1.55;

          font-weight: 500;
        }

        /* ================================================
           DOMAIN GRID
        ================================================ */

        .domain-grid {
          width: 100%;
          max-width: 560px;

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 12px;
        }

        .domain-card {
          min-height: 106px;

          padding: 13px;

          border:
            1px solid rgba(226,232,240,0.90);

          border-radius: 18px;

          background:
            rgba(255,255,255,0.84);

          backdrop-filter: blur(12px);

          box-shadow:
            0 7px 20px rgba(15,23,42,0.045);

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;

          text-align: left;

          cursor: pointer;

          transition:
            transform 220ms cubic-bezier(.2,.8,.2,1),
            box-shadow 220ms ease,
            border-color 220ms ease,
            background 220ms ease;
        }

        .domain-card:hover {
          transform:
            translateY(-7px)
            scale(1.025);

          background: rgba(255,255,255,0.97);

          border-color:
            rgba(99,102,241,0.35);

          box-shadow:
            0 18px 34px rgba(37,99,235,0.13),
            0 5px 12px rgba(15,23,42,0.07);
        }

        .domain-card.selected {
          border-color:
            rgba(59,130,246,0.70);

          box-shadow:
            0 0 0 2px rgba(59,130,246,0.13),
            0 15px 30px rgba(37,99,235,0.12);
        }

        .domain-icon {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          background: var(--icon-background);
          color: var(--icon-color);
        }

        .domain-card-bottom {
          width: 100%;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          gap: 6px;
        }

        .domain-title {
          color: #172033;

          font-size: 12px;
          line-height: 1.15;

          font-weight: 800;
        }

        .domain-arrow {
          width: 23px;
          height: 23px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #f1f5f9;
          color: #64748b;

          transition:
            transform 180ms ease,
            background 180ms ease,
            color 180ms ease;
        }

        .domain-card:hover .domain-arrow {
          transform: translateX(3px);

          background:
            linear-gradient(
              135deg,
              #2563eb,
              #7c3aed
            );

          color: white;
        }

        .domain-card.selected .domain-arrow {
          background: #2563eb;
          color: white;
        }

        /* ================================================
           LYNX
        ================================================ */

        .lynx-column {
          position: relative;

          height: 100%;

          min-height: 520px;

          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .lynx-speech {
          position: absolute;

          top: 3%;

          left: 50%;

          transform: translateX(-50%);

          width: min(330px, 90%);

          padding: 14px 18px;

          border-radius: 19px;

          background:
            rgba(255,255,255,0.94);

          border:
            1px solid rgba(191,219,254,0.85);

          box-shadow:
            0 15px 35px rgba(37,99,235,0.13);

          color: #0f172a;

          text-align: center;

          font-size: 13px;
          line-height: 1.4;
          font-weight: 750;

          z-index: 8;
        }

        .speech-pointer {
          position: absolute;

          bottom: -8px;
          left: 50%;

          width: 16px;
          height: 16px;

          transform:
            translateX(-50%)
            rotate(45deg);

          background: white;

          border-right:
            1px solid rgba(191,219,254,0.85);

          border-bottom:
            1px solid rgba(191,219,254,0.85);
        }

        .lynx-interaction {
          position: relative;

          width: min(440px, 100%);
          height: min(610px, 80vh);

          padding: 0;

          border: 0;

          background: transparent;

          cursor: pointer;

          display: flex;
          align-items: flex-end;
          justify-content: center;

          overflow: visible;
        }

        .lynx-glow {
          position: absolute;

          width: 72%;
          height: 42%;

          bottom: 3%;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(59,130,246,0.24),
              rgba(124,58,237,0.08),
              transparent 70%
            );

          filter: blur(15px);
        }

        /*
           The background artwork already contains the Lynx.
           Do NOT render another copy here.
           This layer is only an invisible interaction/glow layer.
        */

        .lynx-image-wrapper {
          position: absolute;
          left: 50%;
          bottom: 0;

          width: 86%;
          height: 78%;

          transform: translateX(-50%);

          background: transparent;
          border: 0;
          pointer-events: none;

          transition:
            transform 350ms cubic-bezier(.2,.8,.2,1);
        }

        .lynx-interaction:hover .lynx-image-wrapper {
          transform:
            translateX(-50%)
            translateY(-4px);
        }
           AUTH
        ================================================ */

        .auth-column {
          position: relative;

          z-index: 20;

          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .auth-card {
          width: min(410px, 100%);

          padding:
            clamp(28px, 3vw, 42px);

          border-radius: 30px;

          background:
            rgba(255,255,255,0.93);

          border:
            1px solid rgba(255,255,255,0.95);

          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);

          box-shadow:
            0 28px 70px rgba(15,23,42,0.14),
            0 4px 16px rgba(15,23,42,0.06);

          display: flex;
          flex-direction: column;
        }

        .auth-brand {
          display: flex;
          flex-direction: column;
          align-items: center;

          text-align: center;
        }

        .auth-brand-logo {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 10px;

          margin-bottom: 24px;
        }

        .auth-brand-logo img:first-child {
          width: 44px;
          height: 44px;

          object-fit: contain;

          border-radius: 12px;
        }

        .auth-brand-logo img:last-child {
          width: 145px;
          height: auto;
        }

        .auth-brand h2 {
          margin: 0;

          color: #07132f;

          font-size:
            clamp(2rem, 2.4vw, 2.65rem);

          letter-spacing: -0.045em;

          font-weight: 900;
        }

        .auth-brand p {
          max-width: 290px;

          margin:
            11px 0 0;

          color: #64748b;

          font-size: 14px;

          line-height: 1.55;

          font-weight: 500;
        }

        .auth-actions {
          width: 100%;

          margin-top: 30px;

          display: flex;
          flex-direction: column;

          gap: 12px;
        }

        /* GOOGLE */

        .google-button {
          width: 100%;
          min-height: 58px;

          padding: 0 18px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border:
            1px solid #dbe3ef;

          border-radius: 17px;

          background: white;

          color: #1e293b;

          cursor: pointer;

          box-shadow:
            0 5px 14px rgba(15,23,42,0.045);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease;
        }

        .google-button:hover:not(:disabled) {
          transform: translateY(-3px);

          border-color:
            rgba(59,130,246,0.35);

          box-shadow:
            0 13px 27px rgba(37,99,235,0.11);
        }

        .google-button:disabled {
          cursor: wait;
          opacity: 0.7;
        }

        .google-button-left {
          display: flex;
          align-items: center;

          gap: 12px;

          font-size: 15px;
          font-weight: 800;
        }

        /* DEMO */

        .demo-button {
          width: 100%;

          min-height: 47px;

          padding: 0 13px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          border:
            1px dashed #cbd5e1;

          border-radius: 15px;

          background:
            rgba(248,250,252,0.82);

          color: #475569;

          font-size: 12px;
          font-weight: 750;

          cursor: pointer;

          transition:
            transform 180ms ease,
            background 180ms ease,
            border-color 180ms ease;
        }

        .demo-button:hover:not(:disabled) {
          transform: translateY(-2px);

          background: white;

          border-color:
            #94a3b8;
        }

        /* AUTHENTICATED */

        .authenticated-box {
          width: 100%;

          padding: 15px;

          border-radius: 19px;

          background: #f8fafc;

          border:
            1px solid #dbeafe;

          display: flex;
          flex-direction: column;

          gap: 13px;
        }

        .user-information {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .user-avatar {
          width: 46px;
          height: 46px;

          border-radius: 50%;

          object-fit: cover;

          border:
            2px solid #60a5fa;
        }

        .user-text {
          display: flex;
          flex-direction: column;

          min-width: 0;

          text-align: left;
        }

        .user-text strong {
          color: #0f172a;

          font-size: 14px;
          font-weight: 850;
        }

        .user-text span {
          margin-top: 3px;

          color: #64748b;

          font-size: 11px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dashboard-button {
          width: 100%;

          min-height: 50px;

          border: 0;

          border-radius: 14px;

          background:
            linear-gradient(
              90deg,
              #2563eb,
              #7c3aed
            );

          color: white;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          font-size: 14px;
          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 10px 24px rgba(79,70,229,0.20);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .dashboard-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 15px 30px rgba(79,70,229,0.27);
        }

        .switch-account-button {
          border: 0;

          background: transparent;

          color: #64748b;

          text-decoration: underline;

          font-size: 11px;
          font-weight: 700;

          cursor: pointer;
        }

        /* ERROR */

        .auth-error {
          width: 100%;

          display: flex;
          align-items: flex-start;

          gap: 8px;

          padding: 11px;

          border-radius: 13px;

          background: #fef2f2;

          border: 1px solid #fecaca;

          color: #991b1b;

          font-size: 11px;

          line-height: 1.45;

          text-align: left;
        }

        .error-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .auth-error div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* ================================================
           FOOTER
        ================================================ */

        .auth-footer {
          margin-top: 28px;

          padding-top: 20px;

          border-top:
            1px solid #e2e8f0;

          display: flex;
          flex-direction: column;

          align-items: center;

          gap: 9px;
        }

        .security-line {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #64748b;

          font-size: 12px;
          font-weight: 650;
        }

        .firebase-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          padding: 5px 10px;

          border-radius: 999px;

          background: #ecfdf5;

          border:
            1px solid #a7f3d0;

          color: #059669;

          font-size: 10px;
          font-weight: 750;
        }

        .firebase-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #10b981;

          box-shadow:
            0 0 7px rgba(16,185,129,0.65);
        }

        /* ================================================
           TABLET
        ================================================ */

        @media (max-width: 1200px) {

          .login-main {
            grid-template-columns:
              minmax(350px, 1.1fr)
              minmax(270px, 0.8fr)
              minmax(310px, 0.8fr);

            gap: 20px;
          }

          .hero-title {
            font-size: clamp(
              2.65rem,
              4vw,
              4rem
            );
          }

          .domain-grid {
            gap: 9px;
          }

          .domain-card {
            min-height: 94px;
            padding: 10px;
          }

          .lynx-interaction {
            width: 390px;
          }
        }

        /* ================================================
           SMALL LAPTOP
        ================================================ */

        @media (max-width: 1050px) {

          .login-header {
            height: 72px;
          }

          .login-main {
            height: calc(100vh - 72px);

            grid-template-columns:
              1fr 0.85fr;

            padding:
              15px 30px 25px;

            gap: 20px;
          }

          .lynx-column {
            position: absolute;

            left: 47%;

            width: 34%;

            pointer-events: none;

            opacity: 0.65;
          }

          .hero-column {
            max-width: 530px;
            transform: translateY(-18px);
          }

          .auth-column {
            justify-self: end;
          }

          .auth-card {
            width: 360px;
          }
        }

        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 760px) {

          .login-page {
            min-height: 100vh;
            height: auto;

            overflow-y: auto;
          }

          .login-header {
            height: 70px;

            padding:
              13px 18px;
          }

          .brand-icon {
            width: 39px;
            height: 39px;
          }

          .brand-wordmark {
            width: 120px;
          }

          .journey-link {
            display: none;
          }

          .sound-button {
            width: 38px;
            height: 38px;
          }

          .login-main {
            height: auto;

            min-height: calc(100vh - 70px);

            display: flex;

            flex-direction: column;

            align-items: stretch;

            padding:
              20px 18px 35px;

            gap: 25px;
          }

          .hero-column {
            width: 100%;
            max-width: none;
            transform: none;

            align-items: center;

            text-align: center;
          }

          .hero-badge {
            font-size: 11px;
          }

          .hero-title {
            font-size:
              clamp(2.4rem, 11vw, 3.5rem);

            line-height: 1.02;
          }

          .hero-description {
            max-width: 430px;

            font-size: 14px;
          }

          .domain-grid {
            width: 100%;

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            max-width: 500px;

            gap: 10px;
          }

          .domain-card {
            min-height: 92px;
          }

          .lynx-column {
            position: relative;

            left: auto;

            width: 100%;

            height: 350px;

            min-height: 350px;

            order: 2;

            opacity: 1;

            pointer-events: auto;
          }

          .lynx-speech {
            top: 0;

            font-size: 12px;
          }

          .lynx-interaction {
            height: 340px;
            width: 300px;
          }

          .auth-column {
            width: 100%;

            justify-content: center;

            order: 3;
          }

          .auth-card {
            width: 100%;

            max-width: 440px;

            border-radius: 25px;
          }

          .login-background {
            position: fixed;
          }

        }

        /* ================================================
           VERY SMALL
        ================================================ */

        @media (max-width: 420px) {

          .hero-title {
            font-size: 2.25rem;
          }

          .domain-title {
            font-size: 11px;
          }

          .auth-card {
            padding: 25px 18px;
          }

        }

        /* ================================================
           REDUCED MOTION
        ================================================ */

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }

        }

      `}</style>

    </div>
  );
};

export default LoginPage;