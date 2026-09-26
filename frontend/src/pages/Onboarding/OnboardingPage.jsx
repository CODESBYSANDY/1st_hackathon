import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import { Compass, Sparkles, Award, ArrowRight, Target, Shield, Swords } from 'lucide-react';

export const OnboardingPage = () => {
  const navigate = useNavigate();

  const loopSteps = [
    { title: '1. Select Track', desc: 'Choose Web or App Development', icon: Target },
    { title: '2. Learning Worlds', desc: 'Explore connected level maps', icon: Compass },
    { title: '3. Hands-on Missions', desc: 'Concept, visual diagrams, code', icon: Sparkles },
    { title: '4. Mini Challenges', desc: 'MCQ, code fix, debugging', icon: Shield },
    { title: '5. Level Boss Battles', desc: 'Solve real production bugs', icon: Swords },
    { title: '6. Adaptive Next Step', desc: 'NETRA guides your next leap', icon: Award }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 15%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), #F8FAFC'
      }}
    >
      <div style={{ maxWidth: '860px', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Onboarding Hero Banner */}
        <div
          className="glass-card"
          style={{
            padding: '36px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%)',
            borderLeft: '4px solid #2563EB'
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              SEE YOUR NEXT STEP
            </div>
            <h1 style={{ fontSize: '2.3rem', fontWeight: '900', color: '#0F172A', marginTop: '4px' }}>
              Welcome to NETRA
            </h1>
            <p style={{ fontSize: '1rem', color: '#475569', marginTop: '4px', maxWidth: '520px', lineHeight: 1.5 }}>
              The adaptive placement-preparation platform that turns technical preparation into a game-like journey.
            </p>
          </div>

          <LynxCompanion
            mood="motivating"
            message="I'm your Lynx Companion! I'll guide your placement adventure!"
            size="md"
            showBubble={true}
          />
        </div>

        {/* The Core Visual Loop Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {loopSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="glass-card"
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '2px' }}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
          <button
            onClick={() => navigate('/domains')}
            className="btn-game-primary"
            style={{
              padding: '16px 40px',
              fontSize: '1.1rem',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)'
            }}
          >
            <span>Begin Your Journey</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
