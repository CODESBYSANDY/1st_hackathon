import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { learningService } from '../../services/api/learningService';
import { useLearning } from '../../context/LearningContext';
import { GenericLessonRenderer } from '../../components/lessons/GenericLessonRenderer';
import { ChevronLeft, RefreshCw } from 'lucide-react';

export const MissionPage = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const { activeDomain } = useLearning();

  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    learningService.getMission(activeDomain, missionId)
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

  if (loading || !mission) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
        <RefreshCw size={26} className="anim-float" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Preparing Mission Briefing...</h3>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate(`/level/${mission.levelId || 'web-l2'}`)}
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
          <span>Back to Level Overview</span>
        </button>
      </div>

      <GenericLessonRenderer
        mission={mission}
        onLaunchChallenge={() => navigate(`/challenge/${mission.challengeId || 'ch-web-l2-m3'}`)}
      />
    </div>
  );
};
