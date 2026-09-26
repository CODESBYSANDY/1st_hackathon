import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Coins, Flame, Globe, Smartphone, ShieldCheck, Wifi, WifiOff } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import netraLogoIcon from '../../assets/netra-logo-icon.png';
import netraWordmarkDark from '../../assets/netra-wordmark-clean-dark.png';

export const TopNav = () => {
  const { studentState, activeDomain, selectDomain, backendHealth } = useLearning();
  const navigate = useNavigate();

  const handleDomainToggle = () => {
    const nextDomain = activeDomain === 'web' ? 'app' : 'web';
    selectDomain(nextDomain);
    navigate(`/domain/${nextDomain}`);
  };

  return (
    <header
      style={{
        height: 'var(--top-nav-height)',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      {/* Brand & Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src={netraLogoIcon}
            alt="NETRA Logo"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
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
        </Link>


        {/* Domain Switcher Pill */}
        <button
          onClick={handleDomainToggle}
          title="Switch Active Learning Domain"
          style={{
            marginLeft: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: activeDomain === 'web' ? '#EFF6FF' : '#F5F3FF',
            color: activeDomain === 'web' ? '#2563EB' : '#7C3AED',
            border: `1px solid ${activeDomain === 'web' ? '#BFDBFE' : '#DDD6FE'}`,
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {activeDomain === 'web' ? <Globe size={14} /> : <Smartphone size={14} />}
          <span>{activeDomain === 'web' ? 'Web Track' : 'App Track'}</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>⇄</span>
        </button>
      </div>

      {/* Stats Counter & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Backend Connectivity Status Pill */}
        <div
          title={backendHealth.isOnline ? 'FastAPI Backend Connected' : 'Running in Offline / Mock Mode'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '5px 10px',
            borderRadius: '20px',
            background: backendHealth.isOnline ? '#ECFDF5' : '#F1F5F9',
            color: backendHealth.isOnline ? '#065F46' : '#64748B',
            border: `1px solid ${backendHealth.isOnline ? '#A7F3D0' : '#E2E8F0'}`
          }}
        >
          {backendHealth.isOnline ? <Wifi size={13} color="#10B981" /> : <WifiOff size={13} color="#94A3B8" />}
          <span>{backendHealth.isOnline ? 'API Online' : 'Mock Mode'}</span>
        </div>

        {/* Streak Flame */}
        <div
          title="Consecutive Daily Learning Streak"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#FEF2F2',
            color: '#DC2626',
            borderRadius: '12px',
            border: '1px solid #FECACA',
            fontWeight: '700',
            fontSize: '0.85rem'
          }}
        >
          <Flame size={16} className="anim-flame" />
          <span>{studentState.progress.streak} Days</span>
        </div>

        {/* XP Badge */}
        <div
          title="Total Experience Points (XP)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#F5F3FF',
            color: '#7C3AED',
            borderRadius: '12px',
            border: '1px solid #DDD6FE',
            fontWeight: '700',
            fontSize: '0.85rem'
          }}
        >
          <Sparkles size={16} />
          <span>{studentState.progress.xp} XP</span>
        </div>

        {/* Coins Badge */}
        <div
          title="Coins Earned from Completed Lessons & Bosses"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#FFFBEB',
            color: '#D97706',
            borderRadius: '12px',
            border: '1px solid #FDE68A',
            fontWeight: '700',
            fontSize: '0.85rem'
          }}
        >
          <Coins size={16} />
          <span>{studentState.progress.coins}</span>
        </div>

        {/* User Profile & Firebase Auth Status */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            to="/profile"
            title={`Signed in as ${studentState.student.name} (${studentState.student.email || 'Firebase Student'})`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              padding: '2px 8px 2px 2px',
              borderRadius: '20px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              transition: 'all 0.2s ease'
            }}
          >
            <img
              src={studentState.student.avatar}
              alt={studentState.student.name}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid #3B82F6',
                objectFit: 'cover'
              }}
            />
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1E293B', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {studentState.student.name}
            </span>
          </Link>

          <Link
            to="/login"
            title="Switch Account or View Login Gateway"
            style={{
              fontSize: '0.74rem',
              fontWeight: '700',
              color: '#2563EB',
              textDecoration: 'none',
              padding: '4px 8px',
              borderRadius: '8px',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE'
            }}
          >
            Auth
          </Link>
        </div>
      </div>
    </header>
  );
};

