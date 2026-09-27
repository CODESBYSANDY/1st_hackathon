import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Compass, Layers, User, X, Award } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const SidebarNav = ({ isOpen, onClose }) => {
  const { activeDomain } = useLearning();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: activeDomain ? `/domain/${activeDomain}` : '/domains', label: 'Learning Journey', icon: Compass },
    { to: '/domains', label: 'Explore Domains', icon: Layers },
    { to: '/profile', label: 'Skills & Profile', icon: User },
  ];

  const handleNav = (to) => {
    navigate(to);
    onClose();
  };

  return (
    <aside
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '280px',
        height: '100vh',
        background: '#FFFFFF',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0',
        zIndex: 100,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isOpen ? '8px 0 30px rgba(0,0,0,0.1)' : 'none',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px',
          borderBottom: '1px solid #F1F5F9',
        }}>
          <span style={{
            fontSize: '0.82rem',
            fontWeight: '800',
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Navigation
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              background: '#F8FAFC',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        {/* Nav Items */}
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={(e) => { e.preventDefault(); handleNav(item.to); }}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  color: isActive ? '#2563EB' : '#475569',
                  background: isActive ? '#EFF6FF' : 'transparent',
                  border: isActive ? '1px solid #BFDBFE' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                })}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Card */}
      <div style={{ padding: '14px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
            border: '1px solid #DBEAFE',
            borderRadius: '16px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1D4ED8', fontWeight: '700', fontSize: '0.82rem' }}>
            <Award size={15} />
            <span>Placement Target</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
            Focus on fundamentals and challenge milestones to boost your placement readiness.
          </div>
        </div>
      </div>
    </aside>
  );
};
