import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import { ApiClient } from '../../services/api/client';
import {
  BookOpen,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Lightbulb,
  Layers,
  LayoutDashboard,
  Target,
} from 'lucide-react';

export const LessonPage = () => {
  const params = useParams();
  const lessonId = params.lessonId || params.missionId;
  const navigate = useNavigate();
  const { activeDomain, domains = [], journey } = useLearning();

  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback journey item info
  const journeyItem = useMemo(() => {
    if (!Array.isArray(journey?.journey) || !lessonId) return null;
    return journey.journey.find(
      (item) => (item?.lesson_id || item?.lessonId || item?.id) === lessonId
    ) || null;
  }, [journey, lessonId]);

  const currentDomain = useMemo(() => {
    return domains.find((d) => d.id === activeDomain || d.domain_id === activeDomain) || null;
  }, [domains, activeDomain]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchLesson = async () => {
      if (!lessonId) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const data = await ApiClient.get(`/learning/lessons/${lessonId}`);
        if (isMounted) {
          setLessonData(data);
          setLoading(false);
        }
      } catch (err) {
        // Non-blocking fallback: construct safe lesson data from journey or defaults
        if (isMounted) {
          setLessonData({
            id: lessonId,
            title: journeyItem?.title || `Lesson ${lessonId}`,
            description: journeyItem?.reason || 'Master core principles through interactive practice and code.',
            difficulty_level: journeyItem?.difficulty || 1,
            key_takeaways: [
              'Understand core architectural fundamentals.',
              'Implement clean, standard practices.',
              'Prepare for practical interview scenarios.',
            ],
          });
          setLoading(false);
        }
      }
    };

    fetchLesson();

    return () => { isMounted = false; };
  }, [lessonId, journeyItem]);

  const title = lessonData?.title || journeyItem?.title || 'Learning Milestone';
  const description = lessonData?.description || journeyItem?.reason || 'Master core placement concepts.';
  const domainName = currentDomain?.name || (activeDomain ? activeDomain.toUpperCase() : 'Engineering');

  return (
    <div style={styles.container}>
      {/* ──────────────────────────────────────────
          TOP NAVIGATION BAR
         ────────────────────────────────────────── */}
      <div style={styles.topNavRow}>
        <button
          type="button"
          onClick={() => navigate(activeDomain ? `/domain/${activeDomain}` : '/dashboard')}
          style={styles.backButton}
        >
          <ChevronLeft size={16} />
          <span>Back to Roadmap</span>
        </button>

        <div style={styles.domainBadge}>
          <Layers size={14} color="#2563EB" />
          <span>{domainName}</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────
          LESSON HEADER BANNER
         ────────────────────────────────────────── */}
      <section style={styles.bannerCard}>
        <div style={styles.bannerLayout}>
          <div style={styles.bannerContent}>
            <div style={styles.eyebrowBadge}>
              <Target size={14} color="#2563EB" />
              <span>Lesson Milestone</span>
            </div>
            <h1 style={styles.bannerTitle}>{title}</h1>
            <p style={styles.bannerSubtitle}>{description}</p>
          </div>

          <div style={styles.lynxWrapper}>
            <LynxCompanion
              mood="motivating"
              message="Let's master this foundation together!"
              size="sm"
              showBubble={true}
              bubblePosition="top"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          LESSON CONTENT / KEY TAKEAWAYS
         ────────────────────────────────────────── */}
      {loading ? (
        <div style={styles.loadingBox}>
          <RefreshCw size={24} color="#2563EB" className="anim-spin" />
          <p style={styles.loadingText}>Loading lesson content...</p>
        </div>
      ) : (
        <div style={styles.contentStack}>
          {/* Core Concept Card */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardHeaderLeft}>
                <div style={styles.cardIconBox}>
                  <Lightbulb size={18} color="#2563EB" />
                </div>
                <div>
                  <span style={styles.cardEyebrow}>CONCEPT BRIEFING</span>
                  <h2 style={styles.cardTitle}>Core Principles</h2>
                </div>
              </div>
            </div>

            <div style={styles.cardBody}>
              {lessonData?.content_markdown ? (
                <div style={styles.markdownContent}>
                  {lessonData.content_markdown}
                </div>
              ) : (
                <div style={styles.takeawaysList}>
                  <p style={styles.conceptLead}>
                    Focus on building clear mental models and writing clean, reliable code for this topic:
                  </p>
                  {(lessonData?.key_takeaways || [
                    'Focus on fundamentals and standard conventions.',
                    'Test edge cases and performance boundaries.',
                    'Articulate the problem-solving approach clearly.',
                  ]).map((takeaway, idx) => (
                    <div key={idx} style={styles.takeawayItem}>
                      <div style={styles.checkIcon}>
                        <CheckCircle2 size={16} color="#10B981" />
                      </div>
                      <span style={styles.takeawayText}>{takeaway}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Action Row */}
          <div style={styles.actionRow}>
            <button
              type="button"
              onClick={() => navigate(activeDomain ? `/domain/${activeDomain}` : '/dashboard')}
              style={styles.primaryButton}
            >
              <span>Return to Learning Journey</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              style={styles.secondaryButton}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────
const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    color: '#0F172A',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },

  topNavRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    borderRadius: '10px',
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#475569',
    fontSize: '0.84rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
  domainBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '999px',
    background: '#EFF6FF',
    border: '1px solid #BFDBFE',
    color: '#2563EB',
    fontSize: '0.78rem',
    fontWeight: '700',
  },

  // Banner
  bannerCard: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
    borderRadius: '24px',
    border: '1px solid #E2E8F0',
    boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)',
    padding: '32px 36px',
  },
  bannerLayout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    flexWrap: 'wrap',
  },
  bannerContent: {
    flex: 1,
    minWidth: '280px',
  },
  eyebrowBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '999px',
    background: '#EFF6FF',
    border: '1px solid #DBEAFE',
    color: '#2563EB',
    fontSize: '0.74rem',
    fontWeight: '800',
    letterSpacing: '0.04em',
    marginBottom: '8px',
  },
  bannerTitle: {
    fontSize: '1.9rem',
    fontWeight: '850',
    color: '#0F172A',
    margin: 0,
    letterSpacing: '-0.025em',
  },
  bannerSubtitle: {
    fontSize: '0.96rem',
    color: '#64748B',
    marginTop: '6px',
    maxWidth: '560px',
    lineHeight: 1.5,
  },
  lynxWrapper: {
    flexShrink: 0,
  },

  // Content stack
  contentStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '20px',
    border: '1px solid #E2E8F0',
    boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    padding: '20px 24px 16px 24px',
    borderBottom: '1px solid #F1F5F9',
  },
  cardHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cardIconBox: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: '#F1F5F9',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
  },
  cardEyebrow: {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: '800',
    letterSpacing: '0.06em',
    color: '#64748B',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#0F172A',
    margin: 0,
  },
  cardBody: {
    padding: '24px 28px',
  },
  conceptLead: {
    fontSize: '0.94rem',
    color: '#334155',
    lineHeight: 1.6,
    margin: '0 0 16px 0',
  },
  takeawaysList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  takeawayItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
  },
  checkIcon: {
    marginTop: '2px',
    flexShrink: 0,
  },
  takeawayText: {
    fontSize: '0.9rem',
    color: '#334155',
    fontWeight: '600',
    lineHeight: 1.4,
  },
  markdownContent: {
    fontSize: '0.96rem',
    color: '#334155',
    lineHeight: 1.7,
    whiteSpace: 'pre-line',
  },

  // Actions
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '4px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '12px',
    background: '#2563EB',
    color: '#FFFFFF',
    fontSize: '0.9rem',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.22)',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    borderRadius: '12px',
    background: '#FFFFFF',
    color: '#0F172A',
    fontSize: '0.9rem',
    fontWeight: '600',
    border: '1px solid #E2E8F0',
    cursor: 'pointer',
  },

  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '12px',
    color: '#64748B',
  },
  loadingText: {
    fontSize: '0.92rem',
    fontWeight: '600',
    margin: 0,
  },
};
