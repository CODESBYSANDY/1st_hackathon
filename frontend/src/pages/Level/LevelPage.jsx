import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { learningService } from '../../services/api/learningService';
import { useLearning } from '../../context/LearningContext';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Coins,
  Shield,
  Swords,
  ChevronLeft,
  CircleDot
} from 'lucide-react';

export const LevelPage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { activeDomain } = useLearning();

  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    learningService.getLevel(activeDomain, levelId)
      .then((res) => {
        if (isMounted) {
          setLevel(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [levelId, activeDomain]);

  if (loading || !level) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Loading Level Specifications...</h3>
      </div>
    );
  }

  const missions = level.missions || [];

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(`/domain/${activeDomain}`)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: '#2563EB',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={18} />
          <span>Back to Roadmap</span>
        </button>
      </div>

      {/* Level Header Banner with Mascot */}
      <div
        className="glass-card"
        style={{
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderLeft: '4px solid #2563EB'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: '800', fontSize: '0.82rem', textTransform: 'uppercase' }}>
            <span>LEVEL {level.number} MILESTONE</span>
            <span>•</span>
            <span style={{ color: '#7C3AED' }}>+{level.reward?.xp || 150} XP Available</span>
            <span>•</span>
            <span style={{ color: '#D97706' }}>+{level.reward?.coins || 60} Coins</span>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>
            {level.title}
          </h1>
          <p style={{ fontSize: '1rem', color: '#64748B', marginTop: '4px' }}>
            &ldquo;{level.subtitle}&rdquo;
          </p>

          {/* Completion Progress Bar */}
          <div style={{ marginTop: '20px', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
              <span>Completion Progress</span>
              <span>{level.progress || 0}%</span>
            </div>
            <div style={{ height: '8px', width: '100%', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${level.progress || 0}%`,
                  background: 'linear-gradient(90deg, #2563EB, #06B6D4)',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
        </div>

        <LynxCompanion
          mood="encouraging"
          message={`Level ${level.number}: Let's build strong technical foundations!`}
          size="md"
          showBubble={true}
        />
      </div>

      {/* Missions List */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '18px' }}>
          Level Missions & Concepts
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {missions.map((mission, idx) => {
            const isCompleted = mission.status === 'completed';
            const isCurrent = mission.status === 'recommended' || mission.isCurrent;
            const isLocked = mission.status === 'locked';

            return (
              <div
                key={mission.id}
                onClick={() => !isLocked && navigate(`/mission/${mission.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: isCurrent ? '2px solid #3B82F6' : '1px solid #E2E8F0',
                  background: isCurrent ? '#EFF6FF' : isLocked ? '#F8FAFC' : '#FFFFFF',
                  opacity: isLocked ? 0.65 : 1,
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isCompleted ? '#ECFDF5' : isCurrent ? '#DBEAFE' : '#F1F5F9',
                      color: isCompleted ? '#059669' : isCurrent ? '#2563EB' : '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : isCurrent ? <CircleDot size={18} /> : <Lock size={16} />}
                  </div>

                  <div>
                    <div style={{ fontSize: '0.96rem', fontWeight: '700', color: isLocked ? '#64748B' : '#0F172A' }}>
                      {mission.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
                      {mission.objective}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6366F1' }}>
                    +{mission.xp} XP
                  </span>
                  {!isLocked && <ArrowRight size={16} color="#2563EB" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gateways: Checkpoint & Boss Test */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        {/* Checkpoint Card */}
        <div
          onClick={() => level.checkpoint?.status !== 'locked' && navigate(`/checkpoint/${level.checkpoint?.id || 'web-chk-02'}`)}
          className="glass-card"
          style={{
            padding: '24px',
            borderRadius: '18px',
            border: '1.5px solid #F59E0B',
            cursor: level.checkpoint?.status === 'locked' ? 'not-allowed' : 'pointer',
            opacity: level.checkpoint?.status === 'locked' ? 0.75 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#D97706', textTransform: 'uppercase' }}>
                Level Checkpoint
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>
                {level.checkpoint?.title || 'Knowledge Checkpoint'}
              </h4>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                {level.checkpoint?.status === 'locked' ? 'Complete 3 missions to unlock' : 'Ready to evaluate'}
              </div>
            </div>
          </div>
          <div>
            {level.checkpoint?.status === 'locked' ? <Lock size={20} color="#94A3B8" /> : <ArrowRight size={20} color="#D97706" />}
          </div>
        </div>

        {/* Boss Test Card */}
        <div
          onClick={() => level.boss?.status !== 'locked' && navigate(`/boss/${level.boss?.id || 'web-boss-02'}`)}
          className="glass-card"
          style={{
            padding: '24px',
            borderRadius: '18px',
            border: '1.5px solid #DC2626',
            cursor: level.boss?.status === 'locked' ? 'not-allowed' : 'pointer',
            opacity: level.boss?.status === 'locked' ? 0.75 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Swords size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#DC2626', textTransform: 'uppercase' }}>
                Epic Boss Test
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>
                {level.boss?.title || 'Level Final Boss'}
              </h4>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                {level.boss?.status === 'locked' ? 'Conquer all missions to unlock' : 'Battle available'}
              </div>
            </div>
          </div>
          <div>
            {level.boss?.status === 'locked' ? <Lock size={20} color="#94A3B8" /> : <ArrowRight size={20} color="#DC2626" />}
          </div>
        </div>
      </div>
    </div>
  );
};
