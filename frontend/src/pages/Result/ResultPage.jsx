import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import { useLearning } from '../../context/LearningContext';
import { Sparkles, Coins, CheckCircle2, ArrowRight, Award, Compass, TrendingUp } from 'lucide-react';

export const ResultPage = () => {
  const { attemptId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { activeDomain } = useLearning();

  // State passed via router or defaults
  const state = location.state || {};
  const title = state.title || 'Technical Milestone';
  const xpEarned = state.xpEarned || 25;
  const coinsEarned = state.coinsEarned || 15;
  const isCorrect = state.isCorrect !== false;
  const explanation = state.explanation || "You've demonstrated solid understanding of this placement concept!";
  const lynxReaction = state.lynxReaction || (isCorrect ? "You've got the structure! Ready for the next step?" : "Every mistake is a step towards mastery. Keep pushing!");
  const skills = state.skillsAffected || ['HTML & Semantics'];

  const handleContinueJourney = () => {
    navigate(activeDomain ? `/domain/${activeDomain}` : '/dashboard');
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Celebration Header Card */}
      <div
        className="glass-card"
        style={{
          padding: '36px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isCorrect
            ? 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,253,244,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,242,242,0.95) 100%)',
          borderLeft: isCorrect ? '4px solid #10B981' : '4px solid #EF4444'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isCorrect ? '#059669' : '#DC2626', fontWeight: '800', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Award size={18} />
            <span>{isCorrect ? 'MISSION COMPLETE!' : 'ATTEMPT EVALUATION'}</span>
          </div>

          <h1 style={{ fontSize: '2.1rem', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>
            {title}
          </h1>

          <div style={{ display: 'flex', gap: '14px', marginTop: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '12px',
                background: '#F5F3FF',
                color: '#7C3AED',
                fontWeight: '800',
                fontSize: '0.95rem'
              }}
            >
              <Sparkles size={18} />
              <span>+{xpEarned} XP</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '12px',
                background: '#FFFBEB',
                color: '#D97706',
                fontWeight: '800',
                fontSize: '0.95rem'
              }}
            >
              <Coins size={18} />
              <span>+{coinsEarned} Coins</span>
            </div>
          </div>
        </div>

        <LynxCompanion
          mood={isCorrect ? 'celebrating' : 'encouraging'}
          message={lynxReaction}
          size="md"
          showBubble={true}
        />
      </div>

      {/* Skills Mastery Impact */}
      <div className="glass-card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginBottom: '16px' }}>
          <TrendingUp size={18} color="#2563EB" />
          <span>Skill Progress Delta</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {skills.map((skillName) => (
            <div key={skillName}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', fontWeight: '700', marginBottom: '6px' }}>
                <span style={{ color: '#0F172A' }}>{skillName}</span>
                <span style={{ color: '#059669' }}>82% (Mastered)</span>
              </div>
              {/* Visual Progress Bar formatted with character style block as well */}
              <div style={{ height: '10px', width: '100%', background: '#F1F5F9', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '82%', background: 'linear-gradient(90deg, #10B981, #06B6D4)', borderRadius: '5px' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Rationale */}
        <div style={{ marginTop: '24px', padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
          {explanation}
        </div>
      </div>

      {/* Next Step Adaptive Recommendation */}
      <div
        className="glass-card"
        style={{
          padding: '24px 32px',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          border: '1.5px solid #93C5FD',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#1D4ED8', textTransform: 'uppercase' }}>
            Recommended Next Step
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
            Continue to Links & Navigation (Mission 4)
          </div>
          <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '2px' }}>
            Recommended because you demonstrated 100% precision on HTML tags.
          </div>
        </div>

        <button
          onClick={handleContinueJourney}
          className="btn-game-primary"
          style={{
            padding: '14px 28px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
          }}
        >
          <span>CONTINUE JOURNEY</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
