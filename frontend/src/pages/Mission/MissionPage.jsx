import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { learningService } from '../../services/api/learningService';
import { useLearning } from '../../context/LearningContext';
import { GenericLessonRenderer } from '../../components/lessons/GenericLessonRenderer';
import { ChevronLeft, RefreshCw, AlertCircle } from 'lucide-react';

export const MissionPage = () => {
  const params = useParams();
  const missionId = params.missionId || params.lessonId;
  const navigate = useNavigate();
  const { activeDomain } = useLearning();

  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    learningService.getMission(activeDomain || 'web', missionId)
      .then((res) => {
        if (isMounted) {
          setMission(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [missionId, activeDomain]);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
        <RefreshCw size={26} className="anim-float anim-spin" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Preparing Mission Briefing...</h3>
      </div>
    );
  }

  if (!mission) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
        <AlertCircle size={32} color="#EF4444" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A' }}>Mission Unavailable</h3>
        <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '6px' }}>
          This mission briefing is currently being synchronized.
        </p>
        <button
          type="button"
          onClick={() => navigate(activeDomain ? `/domain/${activeDomain}` : '/dashboard')}
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
          Return to Learning Journey
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate(activeDomain ? `/domain/${activeDomain}` : '/dashboard')}
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

      <GenericLessonRenderer
        mission={mission}
        onLaunchChallenge={() => navigate(`/challenge/${mission.challengeId || 'ch-web-l2-m3'}`)}
      />
    </div>
  );
};
