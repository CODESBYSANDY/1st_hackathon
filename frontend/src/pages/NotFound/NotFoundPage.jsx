import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '520px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <LynxCompanion
        mood="thinking"
        message="Lost on the map? Let me guide you back to your learning world!"
        size="lg"
        showBubble={true}
      />
      <h1 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0F172A' }}>
        Path Not Found
      </h1>
      <p style={{ color: '#64748B', fontSize: '0.96rem' }}>
        The milestone you are looking for has shifted on the learning roadmap.
      </p>
      <button onClick={() => navigate('/dashboard')} className="btn-game-primary" style={{ marginTop: '10px' }}>
        <Home size={18} />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );
};
