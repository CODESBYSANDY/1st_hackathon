import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import { getDomainById } from '../../data/domains/domainsData';
import {
  Sparkles,
  Coins,
  Flame,
  ArrowRight,
  Target,
  CheckCircle2,
  TrendingUp,
  Clock,
  Compass,
  Award
} from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { studentState, activeDomain } = useLearning();
  const currentDomain = getDomainById(activeDomain);

  const handleContinueMission = () => {
    navigate('/mission/web-l2-m3');
  };

  const handleOpenRoadmap = () => {
    navigate(`/domain/${activeDomain}`);
  };

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Welcome & Greeting Banner with Mascot */}
      <div
        className="glass-card"
        style={{
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(239,246,255,0.85) 100%)',
          borderLeft: '4px solid #2563EB'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src={studentState.student.avatar}
            alt={studentState.student.name}
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '20px',
              border: '3px solid #3B82F6',
              boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)',
              objectFit: 'cover'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563EB', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <Award size={15} />
                <span>Placement Readiness Engine</span>
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#065F46',
                  fontSize: '0.72rem',
                  fontWeight: '700'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                <span>Firebase Synced (placementpreparation-c7798)</span>
              </span>
            </div>
            <h1 style={{ fontSize: '2.1rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
              Good morning, {studentState.student.name}!
            </h1>
            <p style={{ fontSize: '0.94rem', color: '#64748B', marginTop: '3px' }}>
              Current Focus: <strong>{currentDomain.name}</strong> • Level {studentState.progress.levelNumber} ({studentState.progress.rank})
              {studentState.student.email && (
                <span style={{ marginLeft: '8px', color: '#94A3B8', fontSize: '0.84rem' }}>
                  • {studentState.student.email}
                </span>
              )}
            </p>
          </div>
        </div>


        <LynxCompanion
          mood="welcome"
          message="Ready to continue your journey?"
          size="md"
          showBubble={true}
        />
      </div>

      {/* 2. Top Stats Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {/* Streak */}
        <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={26} className="anim-flame" />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Daily Streak</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A' }}>{studentState.progress.streak} Days</div>
          </div>
        </div>

        {/* XP */}
        <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Experience</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A' }}>{studentState.progress.xp} XP</div>
          </div>
        </div>

        {/* Coins */}
        <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Coins size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Earned Coins</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A' }}>{studentState.progress.coins}</div>
          </div>
        </div>

        {/* Overall Completion */}
        <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Track Completion</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A' }}>{studentState.progress.overall}%</div>
          </div>
        </div>
      </div>

      {/* 3. Center Section: Today's Mission & Skill Mastery */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px' }}>
        {/* TODAY'S MISSION CARD */}
        <div
          className="glass-card anim-pulse-glow"
          style={{
            padding: '32px',
            background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #4F46E5 100%)',
            color: 'white',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: '0 14px 30px -4px rgba(37, 99, 235, 0.4)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: '800', color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <Target size={16} />
                <span>TODAY&apos;S MISSION</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem', fontWeight: '700', color: '#FCD34D' }}>
                <span>+20 XP</span>
                <span>•</span>
                <span>+10 Coins</span>
              </div>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '12px', lineHeight: 1.2 }}>
              {studentState.current_activity.title}
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#DBEAFE', marginTop: '6px', lineHeight: 1.5 }}>
              Master opening tags, attributes, closing tags, and element hierarchy to unlock dynamic styling.
            </p>

            <div style={{ marginTop: '20px', background: 'rgba(255, 255, 255, 0.14)', padding: '16px', borderRadius: '14px', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '700', color: '#E0E7FF', marginBottom: '8px' }}>
                <span>Progress: 3 / 5 concepts completed</span>
                <span>60%</span>
              </div>
              <div style={{ height: '8px', width: '100%', background: 'rgba(255, 255, 255, 0.25)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '60%', background: '#38BDF8', borderRadius: '4px' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <button
              onClick={handleContinueMission}
              className="btn-game-primary"
              style={{
                flex: 1,
                background: '#FFFFFF',
                color: '#1D4ED8',
                fontWeight: '800',
                padding: '14px',
                fontSize: '1rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
              }}
            >
              <span>Continue HTML Fundamentals</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={handleOpenRoadmap}
              className="btn-game-secondary"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '14px 20px'
              }}
            >
              <Compass size={18} />
            </button>
          </div>
        </div>

        {/* SKILL MASTERY CARD */}
        <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
                Skill Mastery
              </div>
              <span style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: '700', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                View All →
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {studentState.skills.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px' }}>
                    <span style={{ color: '#1E293B' }}>{skill.name}</span>
                    <span style={{ color: skill.color }}>{skill.percentage}% ({skill.status})</span>
                  </div>
                  <div style={{ height: '6px', width: '100%', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${skill.percentage}%`, background: skill.color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adaptive Recommendation Tag */}
          <div
            style={{
              marginTop: '20px',
              padding: '12px 16px',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '12px',
              fontSize: '0.82rem',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle2 size={16} color="#16A34A" />
            <span>Recommended by NETRA: Focus on HTML Tags before styling challenges.</span>
          </div>
        </div>
      </div>

      {/* 4. Recent Learning Activity Timeline */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginBottom: '16px' }}>
          <Clock size={16} />
          <span>Recent Learning Activity</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {studentState.recent_activities.map((act) => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: act.type === 'boss' ? '#FEF2F2' : '#EFF6FF',
                    color: act.type === 'boss' ? '#DC2626' : '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.8rem'
                  }}
                >
                  {act.type === 'boss' ? '⚔' : '✓'}
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A' }}>{act.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{act.timestamp}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', fontWeight: '700', fontSize: '0.85rem' }}>
                <span style={{ color: '#7C3AED' }}>{act.xp}</span>
                <span style={{ color: '#D97706' }}>{act.coins} Coins</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
