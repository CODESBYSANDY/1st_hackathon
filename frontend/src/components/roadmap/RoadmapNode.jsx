import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Lock, Sparkles, Flame, ShieldAlert, Award, ChevronRight } from 'lucide-react';

export const RoadmapNode = ({
  level,
  isCurrent = false,
  onSelect = null
}) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', className: 'badge-completed', icon: CheckCircle2 };
      case 'mastered':
        return { label: 'Mastered', className: 'badge-mastered', icon: Award };
      case 'recommended':
        return { label: 'Recommended', className: 'badge-recommended', icon: Sparkles };
      case 'in_progress':
        return { label: 'In Progress', className: 'badge-in-progress', icon: Flame };
      case 'needs_reinforcement':
        return { label: 'Reinforce', className: 'badge-reinforcement', icon: ShieldAlert };
      case 'locked':
        return { label: 'Locked', className: 'badge-locked', icon: Lock };
      default:
        return { label: 'Available', className: 'badge-recommended', icon: ChevronRight };
    }
  };

  const badgeInfo = getStatusBadge(level.status);
  const BadgeIcon = badgeInfo.icon;
  const isLocked = level.status === 'locked';

  const handleClick = () => {
    if (onSelect) {
      onSelect(level);
    } else {
      navigate(`/level/${level.id}`);
    }
  };

  // Node glowing border styles by state
  const getNodeBorder = () => {
    if (level.status === 'recommended') return '2px solid #3B82F6';
    if (level.status === 'needs_reinforcement') return '2px solid #F43F5E';
    if (level.status === 'completed') return '1.5px solid #10B981';
    if (level.status === 'mastered') return '2px solid #F59E0B';
    return '1px solid #E2E8F0';
  };

  return (
    <div
      onClick={handleClick}
      className={`glass-card ${level.status === 'recommended' ? 'anim-pulse-glow' : ''}`}
      style={{
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.72 : 1,
        border: getNodeBorder(),
        padding: '20px 24px',
        borderRadius: '20px',
        position: 'relative',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isLocked ? '#F8FAFC' : '#FFFFFF',
        boxShadow: level.status === 'recommended' ? '0 10px 25px -4px rgba(59, 130, 246, 0.25)' : 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Top Meta: Level Number, Status Badge & Rewards */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: level.status === 'completed' ? '#10B981' : level.status === 'recommended' ? '#2563EB' : '#64748B',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.85rem'
            }}
          >
            {level.number}
          </div>
          <span className={`badge-node ${badgeInfo.className}`}>
            <BadgeIcon size={12} />
            {badgeInfo.label}
          </span>
        </div>

        {level.reward && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '700', color: '#6366F1' }}>
            <span>+{level.reward.xp} XP</span>
            <span style={{ color: '#F59E0B' }}>• {level.reward.coins} Coins</span>
          </div>
        )}
      </div>

      {/* Title & Subtitle */}
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
          {level.title}
        </h3>
        <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.4 }}>
          {level.subtitle}
        </p>
      </div>

      {/* Adaptive Reason (If recommended or needs reinforcement) */}
      {level.recommendationReason && (
        <div
          style={{
            fontSize: '0.78rem',
            padding: '6px 10px',
            borderRadius: '8px',
            background: level.status === 'needs_reinforcement' ? '#FFF1F2' : '#EFF6FF',
            color: level.status === 'needs_reinforcement' ? '#BE123C' : '#1D4ED8',
            border: `1px solid ${level.status === 'needs_reinforcement' ? '#FECDD3' : '#DBEAFE'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>✦</span>
          <span>{level.recommendationReason}</span>
        </div>
      )}

      {/* Skills Pill Tags */}
      {level.skills && level.skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {level.skills.map((skill, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.72rem',
                fontWeight: '600',
                padding: '2px 8px',
                borderRadius: '6px',
                background: '#F1F5F9',
                color: '#475569'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div style={{ marginTop: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', color: '#64748B', marginBottom: '4px' }}>
          <span>Mastery Progress</span>
          <span>{level.progress || 0}%</span>
        </div>
        <div style={{ height: '6px', width: '100%', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${level.progress || 0}%`,
              background: level.progress === 100 ? '#10B981' : 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
              borderRadius: '4px',
              transition: 'width 0.4s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
};
