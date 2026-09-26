import React from 'react';
import { useLearning } from '../../context/LearningContext';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import {
  User,
  Award,
  Sparkles,
  Coins,
  Flame,
  Globe,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ProfilePage = () => {
  const { studentState, activeDomain, selectDomain } = useLearning();

  const badges = [
    { id: 'b1', name: 'Web Navigator', desc: 'Completed Level 1 Web Architecture', icon: '🌐', unlocked: true },
    { id: 'b2', name: 'Semantic Architect', desc: 'Mastered Semantic HTML Markup', icon: '🏗️', unlocked: true },
    { id: 'b3', name: 'CSS Alchemist', desc: 'Perfect score on Box Model Challenge', icon: '🎨', unlocked: true },
    { id: 'b4', name: 'Bug Slayer', desc: 'Conquered Level 1 Final Boss Test', icon: '⚔️', unlocked: true },
    { id: 'b5', name: 'Dart Master', desc: '100% sound null safety accuracy', icon: '🎯', unlocked: false }
  ];

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Student Banner */}
      <div
        className="glass-card"
        style={{
          padding: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,249,255,0.9) 100%)',
          borderLeft: '4px solid #2563EB'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <img
            src={studentState.student.avatar}
            alt={studentState.student.name}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              border: '3px solid #3B82F6',
              objectFit: 'cover',
              boxShadow: '0 8px 20px rgba(37,99,235,0.2)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.9rem', fontWeight: '800', color: '#0F172A' }}>
                {studentState.student.name}
              </h1>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '12px', background: '#DBEAFE', color: '#1D4ED8' }}>
                {studentState.progress.rank}
              </span>
            </div>
            <p style={{ fontSize: '0.94rem', color: '#64748B', marginTop: '2px' }}>
              Target Role: <strong>{studentState.student.targetRole}</strong> • {studentState.student.college}
            </p>
          </div>
        </div>

        <LynxCompanion
          mood="happy"
          message="Your placement portfolio is taking shape nicely!"
          size="sm"
          showBubble={true}
        />
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ color: '#7C3AED', fontWeight: '800', fontSize: '1.7rem' }}>{studentState.progress.xp}</div>
          <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>Total XP Earned</div>
        </div>

        <div className="glass-card" style={{ padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ color: '#D97706', fontWeight: '800', fontSize: '1.7rem' }}>{studentState.progress.coins}</div>
          <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>Earned Coins</div>
        </div>

        <div className="glass-card" style={{ padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ color: '#DC2626', fontWeight: '800', fontSize: '1.7rem' }}>{studentState.progress.streak} Days</div>
          <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>Active Streak</div>
        </div>

        <div className="glass-card" style={{ padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ color: '#059669', fontWeight: '800', fontSize: '1.7rem' }}>78%</div>
          <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>Placement Readiness</div>
        </div>
      </div>

      {/* Skill Mastery Breakdown */}
      <div className="glass-card" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '18px' }}>
          Skill Mastery Portfolio
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {studentState.skills.map((skill) => (
            <div
              key={skill.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: '#F8FAFC',
                borderRadius: '14px',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ flex: 1, maxWidth: '280px' }}>
                <div style={{ fontWeight: '700', fontSize: '0.96rem', color: '#0F172A' }}>{skill.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>Evaluation status: {skill.status}</div>
              </div>

              <div style={{ flex: 1.5, margin: '0 24px' }}>
                <div style={{ height: '8px', width: '100%', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${skill.percentage}%`, background: skill.color, borderRadius: '4px' }} />
                </div>
              </div>

              <div style={{ minWidth: '90px', textAlign: 'right', fontWeight: '800', color: skill.color, fontSize: '0.94rem' }}>
                {skill.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Placement Badges */}
      <div className="glass-card" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '18px' }}>
          Placement Milestone Badges
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {badges.map((b) => (
            <div
              key={b.id}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: b.unlocked ? '#FFFFFF' : '#F1F5F9',
                border: b.unlocked ? '1px solid #CBD5E1' : '1px dashed #CBD5E1',
                opacity: b.unlocked ? 1 : 0.6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '2rem' }}>{b.icon}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>{b.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{b.desc}</div>
              {b.unlocked ? (
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#059669', background: '#ECFDF5', padding: '2px 8px', borderRadius: '6px' }}>
                  Conquered
                </span>
              ) : (
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94A3B8' }}>
                  Locked
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
