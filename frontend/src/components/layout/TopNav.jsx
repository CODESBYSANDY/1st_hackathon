import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Wifi, WifiOff, LogOut } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import netraLogoIcon from '../../assets/netra-logo-icon.png';
import netraWordmarkDark from '../../assets/netra-wordmark-clean-dark.png';

export const TopNav = ({ onMenuClick }) => {
  const { studentState, activeDomain, backendHealth, domains, handleSignOut } = useLearning();
  const currentDomain = domains.find(d => d.id === activeDomain);

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
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left: Menu + Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            background: 'white',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            flexShrink: 0,
          }}
        >
          <Menu size={20} color="#475569" />
        </button>

        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <img
            src={netraLogoIcon}
            alt="NETRA Logo"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              boxShadow: '0 3px 10px rgba(6, 182, 212, 0.25)',
              objectFit: 'cover',
            }}
          />
          <img
            src={netraWordmarkDark}
            alt="NETRA"
            style={{ height: '26px', objectFit: 'contain' }}
          />
        </Link>

        {/* Current Domain Pill */}
        {currentDomain && (
          <div
            style={{
              marginLeft: '6px',
              padding: '4px 12px',
              background: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: '700',
            }}
          >
            {currentDomain.name}
          </div>
        )}
      </div>

      {/* Right: Status + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Backend Status */}
        <div
          title={backendHealth.isOnline ? 'Backend Connected' : 'Backend Offline'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.73rem',
            fontWeight: '600',
            padding: '4px 10px',
            borderRadius: '20px',
            background: backendHealth.isOnline ? '#ECFDF5' : '#F1F5F9',
            color: backendHealth.isOnline ? '#065F46' : '#64748B',
            border: `1px solid ${backendHealth.isOnline ? '#A7F3D0' : '#E2E8F0'}`,
          }}
        >
          {backendHealth.isOnline ? <Wifi size={12} color="#10B981" /> : <WifiOff size={12} color="#94A3B8" />}
          <span>{backendHealth.isOnline ? 'Online' : 'Offline'}</span>
        </div>

        {/* User Avatar + Name */}
        {studentState.student.name && (
          <Link
            to="/profile"
            title={`Signed in as ${studentState.student.name}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              padding: '3px 10px 3px 3px',
              borderRadius: '20px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              transition: 'all 0.15s ease',
            }}
          >
            {studentState.student.avatar ? (
              <img
                src={studentState.student.avatar}
                alt={studentState.student.name}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: '2px solid #3B82F6',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3B82F6, #7C3AED)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: '0.78rem',
                }}
              >
                {studentState.student.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span style={{
              fontSize: '0.82rem',
              fontWeight: '700',
              color: '#1E293B',
              maxWidth: '90px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {studentState.student.name}
            </span>
          </Link>
        )}

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          aria-label="Sign out"
          title="Sign out"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            background: 'white',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <LogOut size={16} color="#64748B" />
        </button>
      </div>
    </header>
  );
};
