import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { learningService } from '../../services/api/learningService';
import { RoadmapWorld } from '../../components/roadmap/RoadmapWorld';
import { useLearning } from '../../context/LearningContext';
import { Globe, Smartphone, RefreshCw, AlertCircle } from 'lucide-react';

export const RoadmapPage = () => {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const { activeDomain, selectDomain } = useLearning();

  const currentDomainId = domainId || activeDomain || 'web';
  const [curriculumData, setCurriculumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    learningService.getRoadmap(currentDomainId)
      .then((res) => {
        if (isMounted) {
          setCurriculumData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load curriculum roadmap');
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [currentDomainId]);

  const handleSelectLevel = (level) => {
    if (level.status !== 'locked') {
      navigate(`/level/${level.id}`);
    }
  };

  const handleToggleDomain = (targetId) => {
    selectDomain(targetId);
    navigate(`/domain/${targetId}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>
        <RefreshCw size={28} className="anim-float" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A' }}>Loading Your Learning World...</h3>
        <p style={{ fontSize: '0.88rem' }}>Generating connected milestone path</p>
      </div>
    );
  }

  if (error || !curriculumData) {
    return (
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '500px', margin: '40px auto' }}>
        <AlertCircle size={36} color="#EF4444" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A' }}>Roadmap Unavailable</h3>
        <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '6px' }}>{error || 'Unable to render curriculum graph.'}</p>
        <button onClick={() => navigate('/domains')} className="btn-game-primary" style={{ marginTop: '18px' }}>
          Back to Domain Selection
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* Domain Switch Header Pill Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => handleToggleDomain('web')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '24px',
            border: currentDomainId === 'web' ? '2px solid #2563EB' : '1px solid #CBD5E1',
            background: currentDomainId === 'web' ? '#EFF6FF' : '#FFFFFF',
            color: currentDomainId === 'web' ? '#1D4ED8' : '#64748B',
            fontWeight: '800',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: currentDomainId === 'web' ? '0 4px 12px rgba(37,99,235,0.2)' : 'none'
          }}
        >
          <Globe size={16} />
          <span>Web Development</span>
        </button>

        <button
          onClick={() => handleToggleDomain('app')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '24px',
            border: currentDomainId === 'app' ? '2px solid #7C3AED' : '1px solid #CBD5E1',
            background: currentDomainId === 'app' ? '#F5F3FF' : '#FFFFFF',
            color: currentDomainId === 'app' ? '#6D28D9' : '#64748B',
            fontWeight: '800',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: currentDomainId === 'app' ? '0 4px 12px rgba(124,58,237,0.2)' : 'none'
          }}
        >
          <Smartphone size={16} />
          <span>App Development (Flutter)</span>
        </button>
      </div>

      <RoadmapWorld
        curriculum={curriculumData}
        onSelectLevel={handleSelectLevel}
      />
    </div>
  );
};
