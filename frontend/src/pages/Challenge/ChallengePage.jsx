import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assessmentService } from '../../services/api/assessmentService';
import { ChallengeDispatcher } from '../../components/challenges/ChallengeDispatcher';
import { ChevronLeft, RefreshCw } from 'lucide-react';

export const ChallengePage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    assessmentService.getChallenge(challengeId)
      .then((res) => {
        if (isMounted) {
          setChallenge(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [challengeId]);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
        <RefreshCw size={26} className="anim-float anim-spin" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Loading Challenge Canvas...</h3>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A' }}>Challenge Milestone Completed</h3>
        <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '6px' }}>
          This challenge has been processed or is not currently active.
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

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
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
          <span>Back to Lesson</span>
        </button>
      </div>

      <ChallengeDispatcher challenge={challenge} />
    </div>
  );
};
