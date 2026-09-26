import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LynxCompanion } from '../lynx/LynxCompanion';
import { VisualSection } from './VisualSection';
import { Target, Lightbulb, Code2, Play, Sparkles, CheckCircle2 } from 'lucide-react';

export const GenericLessonRenderer = ({ mission, onLaunchChallenge }) => {
  const navigate = useNavigate();
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleLaunch = () => {
    if (onLaunchChallenge) {
      onLaunchChallenge();
    } else if (mission.challengeId) {
      navigate(`/challenge/${mission.challengeId}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '880px', margin: '0 auto' }}>
      {/* 1. Header with Mascot Guide */}
      <div
        className="glass-card"
        style={{
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderLeft: '4px solid #06B6D4'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0891B2', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <Target size={16} />
            <span>Mission Objective</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
            {mission.title}
          </h1>
          <p style={{ fontSize: '0.96rem', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>
            {mission.objective}
          </p>
        </div>

        <LynxCompanion
          mood="thinking"
          message="Let's master this foundation together!"
          size="sm"
          showBubble={true}
        />
      </div>

      {/* 2. Concept Explanation */}
      <div className="glass-card" style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: '800', fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '12px' }}>
          <Lightbulb size={18} />
          <span>Core Concept</span>
        </div>
        <div
          style={{
            fontSize: '1.02rem',
            color: '#1E293B',
            lineHeight: 1.7,
            whiteSpace: 'pre-line'
          }}
        >
          {mission.concept || 'Review the conceptual mechanics of this learning milestone.'}
        </div>

        {/* 3. Visual Interactive Section */}
        {mission.visualType && (
          <div style={{ marginTop: '24px' }}>
            <VisualSection visualType={mission.visualType} />
          </div>
        )}
      </div>

      {/* 4. Code Example (If Present) */}
      {mission.example && (
        <div className="glass-card" style={{ padding: '24px 32px', background: '#0F172A', color: 'white', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontWeight: '700', fontSize: '0.82rem' }}>
              <Code2 size={18} />
              <span>Production Example</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}>
              syntax verified
            </span>
          </div>

          <pre
            style={{
              background: '#1E293B',
              padding: '18px',
              borderRadius: '12px',
              overflowX: 'auto',
              fontSize: '0.92rem',
              color: '#F8FAFC',
              lineHeight: 1.6,
              fontFamily: 'JetBrains Mono, monospace',
              border: '1px solid #334155'
            }}
          >
            <code>{mission.example}</code>
          </pre>
        </div>
      )}

      {/* 5. Mini Interactive Task / Check */}
      <div
        className="glass-card"
        style={{
          padding: '24px 32px',
          background: taskCompleted ? '#F0FDF4' : '#FFFFFF',
          border: taskCompleted ? '1px solid #86EFAC' : '1px solid #E2E8F0',
          transition: 'all 0.25s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: '800', color: taskCompleted ? '#15803D' : '#64748B', textTransform: 'uppercase' }}>
              Checkpoint Confirmation
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A', marginTop: '4px' }}>
              {mission.interactiveTask || 'Confirm your comprehension of the core concept above.'}
            </div>
          </div>

          <button
            onClick={() => setTaskCompleted(!taskCompleted)}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              border: 'none',
              background: taskCompleted ? '#10B981' : '#E2E8F0',
              color: taskCompleted ? 'white' : '#475569',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle2 size={16} />
            <span>{taskCompleted ? 'Verified' : 'I Understand'}</span>
          </button>
        </div>
      </div>

      {/* 6. Challenge Call to Action Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          borderRadius: '20px',
          padding: '28px 36px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 10px 25px -4px rgba(37, 99, 235, 0.35)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: '800', color: '#93C5FD', textTransform: 'uppercase' }}>
            <Sparkles size={16} />
            <span>Prove Your Mastery</span>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px' }}>
            Ready for the Interactive Challenge?
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#DBEAFE', marginTop: '2px' }}>
            Earn +{mission.xp || 25} XP and +{mission.coins || 15} Coins upon successful completion.
          </p>
        </div>

        <button
          onClick={handleLaunch}
          className="btn-game-primary"
          style={{
            background: '#FFFFFF',
            color: '#1D4ED8',
            fontSize: '1rem',
            padding: '14px 28px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
          }}
        >
          <Play size={18} fill="#1D4ED8" />
          <span>Launch Challenge</span>
        </button>
      </div>
    </div>
  );
};
