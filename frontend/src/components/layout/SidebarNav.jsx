import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass, Layers, User, Award, ExternalLink } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const SidebarNav = () => {
  const { activeDomain } = useLearning();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: `/domain/${activeDomain}`, label: 'Learning Journey', icon: Compass },
    { to: '/domains', label: 'Explore Domains', icon: Layers },
    { to: '/profile', label: 'Skills & Profile', icon: User }
  ];

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        minHeight: 'calc(100vh - var(--top-nav-height))',
        background: '#FFFFFF',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        flexShrink: 0
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 12px 10px' }}>
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '12px',
                fontWeight: isActive ? '700' : '600',
                fontSize: '0.92rem',
                textDecoration: 'none',
                color: isActive ? '#2563EB' : '#475569',
                background: isActive ? '#EFF6FF' : 'transparent',
                border: isActive ? '1px solid #BFDBFE' : '1px solid transparent',
                transition: 'all 0.15s ease'
              })}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Placement Preparation Info Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
          border: '1px solid #DBEAFE',
          borderRadius: '16px',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1D4ED8', fontWeight: '700', fontSize: '0.82rem' }}>
          <Award size={15} />
          <span>Placement Target</span>
        </div>
        <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
          Focus on fundamentals and challenge milestones to boost your placement readiness score.
        </div>
      </div>
    </aside>
  );
};
