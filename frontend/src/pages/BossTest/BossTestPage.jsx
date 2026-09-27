import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assessmentService } from '../../services/api/assessmentService';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import { useLearning } from '../../context/LearningContext';
import { Swords, ShieldAlert, Award, ArrowRight, CheckCircle2, Flame, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BossTestPage = () => {
  const { bossId } = useParams();
  const navigate = useNavigate();
  const { addRewards } = useLearning();

  const [bossData, setBossData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    assessmentService.getBossTest(bossId)
      .then((res) => {
        if (isMounted) {
          setBossData(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [bossId]);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
        <RefreshCw size={26} className="anim-float anim-spin" style={{ margin: '0 auto 12px' }} />
        <h3>Preparing Boss Arena...</h3>
      </div>
    );
  }

  if (!bossData) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A' }}>Boss Battle Completed</h3>
        <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '6px' }}>
          This boss battle is not active or has already been completed.
        </p>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{
            marginTop: '16px',
            padding: '10px 20px',
            borderRadius: '12px',
            background: '#2563EB',
            color: '#FFFFFF',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleSelectOption = (taskId, optionId) => {
    if (!hasSubmitted) {
      setSelectedOptions(prev => ({ ...prev, [taskId]: optionId }));
    }
  };

  const handleDefeatBoss = () => {
    const allCorrect = bossData.tasks?.every(task => {
      const selected = task.options.find(o => o.id === selectedOptions[task.id]);
      return selected?.isCorrect;
    });

    setIsVictory(true);
    setHasSubmitted(true);
    addRewards(bossData.xpReward || 100, bossData.coinReward || 50);

    // Boss victory confetti burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 }
    });
  };

  const handleContinue = () => {
    navigate('/result/boss-' + bossData.id, {
      state: {
        title: bossData.title,
        isCorrect: true,
        xpEarned: bossData.xpReward || 100,
        coinsEarned: bossData.coinReward || 50,
        skillsAffected: ['Architectural Debugging', 'Technical Problem Solving'],
        strongAreas: ['System-Level Diagnostics', 'Production Code Review'],
        nextRecommended: 'web-l3',
        lynxReaction: "UNBELIEVABLE VICTORY! You conquered the Boss Test and unlocked Level 3!"
      }
    });
  };

  const allAnswered = bossData.tasks?.every(t => selectedOptions[t.id]);

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Epic Arena Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #311042 100%)',
          borderRadius: '24px',
          padding: '36px 40px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
          border: '1px solid #4338CA'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F43F5E', fontWeight: '800', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Swords size={18} />
            <span>LEVEL FINAL BOSS CHALLENGE</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', marginTop: '6px', letterSpacing: '-0.02em' }}>
            {bossData.title}
          </h1>
          <p style={{ fontSize: '0.94rem', color: '#CBD5E1', marginTop: '4px', maxWidth: '560px' }}>
            Theory ends here. Diagnose real production architecture and solve technical breakdown scenarios under pressure.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', fontSize: '0.85rem', fontWeight: '700' }}>
            <span style={{ color: '#C084FC', background: 'rgba(192, 132, 252, 0.15)', padding: '4px 10px', borderRadius: '8px' }}>
              +{bossData.xpReward} XP Bounty
            </span>
            <span style={{ color: '#FBBF24', background: 'rgba(251, 191, 36, 0.15)', padding: '4px 10px', borderRadius: '8px' }}>
              +{bossData.coinReward} Coins
            </span>
          </div>
        </div>

        <LynxCompanion
          mood={hasSubmitted ? 'levelUp' : 'bossBattle'}
          message={hasSubmitted ? 'You conquered the Boss!' : 'Show what you can build! Stay sharp!'}
          size="md"
          showBubble={true}
        />
      </div>

      {/* Production Scenario Card */}
      <div className="glass-card" style={{ padding: '28px 36px', borderLeft: '4px solid #DC2626' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>
          <ShieldAlert size={16} />
          <span>PRODUCTION INCIDENT SCENARIO</span>
        </div>
        <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.6, fontWeight: '500' }}>
          {bossData.scenario}
        </p>
      </div>

      {/* Boss Tasks */}
      <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {bossData.tasks?.map((task, idx) => (
          <div key={task.id} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>
              Task {idx + 1}: {task.description}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {task.options.map((opt) => {
                const isSelected = selectedOptions[task.id] === opt.id;
                let border = '1px solid #CBD5E1';
                let background = '#FFFFFF';

                if (hasSubmitted) {
                  if (opt.isCorrect) {
                    border = '2px solid #10B981';
                    background = '#ECFDF5';
                  } else if (isSelected && !opt.isCorrect) {
                    border = '2px solid #EF4444';
                    background = '#FEF2F2';
                  }
                } else if (isSelected) {
                  border = '2px solid #6366F1';
                  background = '#EEF2FF';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(task.id, opt.id)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border,
                      background,
                      cursor: hasSubmitted ? 'default' : 'pointer',
                      fontSize: '0.92rem',
                      fontWeight: isSelected ? '700' : '500'
                    }}
                  >
                    {opt.text}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Victory Banner */}
        {hasSubmitted && isVictory && (
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
              border: '2px solid #34D399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', fontWeight: '900', color: '#065F46' }}>
                <Award size={24} />
                <span>BOSS CONQUERED! Level Milestone Cleared</span>
              </div>
              <div style={{ fontSize: '0.88rem', color: '#047857', marginTop: '4px' }}>
                You have demonstrated true engineering competency. New levels have been unlocked!
              </div>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#6366F1' }}>
              +{bossData.xpReward} XP • +{bossData.coinReward} Coins
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
          {!hasSubmitted ? (
            <button
              onClick={handleDefeatBoss}
              disabled={!allAnswered}
              className="btn-game-primary"
              style={{
                background: allAnswered ? 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)' : '#CBD5E1',
                padding: '14px 32px',
                fontSize: '1rem'
              }}
            >
              <Swords size={18} />
              <span>Execute Boss Solution</span>
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="btn-game-primary"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                padding: '14px 32px',
                fontSize: '1rem'
              }}
            >
              <span>Claim Victory & Continue</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
