import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Layers,
  ChevronLeft,
} from 'lucide-react';

export const RoadmapPage = () => {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const {
    activeDomain,
    domains = [],
    journey,
    fetchJourney,
    selectDomain,
  } = useLearning();

  const currentDomainId = domainId || activeDomain || 'web';
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (currentDomainId) {
      setLocalLoading(true);
      setLocalError(null);
      fetchJourney(currentDomainId)
        .then(() => {
          if (isMounted) setLocalLoading(false);
        })
        .catch((err) => {
          if (isMounted) {
            setLocalError(err.message || 'Failed to load domain journey');
            setLocalLoading(false);
          }
        });
    }
    return () => { isMounted = false; };
  }, [currentDomainId, fetchJourney]);

  const currentDomain = useMemo(() => {
    return domains.find((d) => d.id === currentDomainId || d.domain_id === currentDomainId) || null;
  }, [domains, currentDomainId]);

  const domainName =
    currentDomain?.name ||
    currentDomain?.title ||
    (currentDomainId ? currentDomainId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Domain');

  const journeyItems = useMemo(() => {
    if (Array.isArray(journey?.journey)) {
      return journey.journey;
    }
    return [];
  }, [journey]);

  const currentLesson = useMemo(() => {
    if (!journeyItems.length) return null;
    const explicit = journeyItems.find((item) => item?.is_current || item?.isCurrent);
    if (explicit) return explicit;
    return journeyItems.find((item) => !(item?.is_completed || item?.isCompleted || item?.completed)) || null;
  }, [journeyItems]);

  const currentLessonId = currentLesson?.lesson_id || currentLesson?.lessonId || currentLesson?.id;
  const completedCount = journeyItems.filter((item) => item?.is_completed || item?.isCompleted || item?.completed).length;

  const handleLessonClick = (item) => {
    const lid = item?.lesson_id || item?.lessonId || item?.id;
    const isCompleted = Boolean(item?.is_completed || item?.isCompleted || item?.completed);
    const isCurrent = Boolean(currentLessonId && lid === currentLessonId);

    if ((isCompleted || isCurrent) && lid) {
      navigate(`/lesson/${lid}`);
    }
  };

  return (
    <div style={styles.container}>
      {/* ──────────────────────────────────────────
          BACK NAVIGATION & DOMAIN BAR
         ────────────────────────────────────────── */}
      <div style={styles.topNavRow}>
        <button
          type="button"
          onClick={() => navigate('/domains')}
          style={styles.backButton}
        >
          <ChevronLeft size={16} />
          <span>All Domains</span>
        </button>

        {domains.length > 0 && (
          <div style={styles.domainPillList}>
            {domains.map((d) => {
              const isActive = d.id === currentDomainId;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    selectDomain(d.id);
                    navigate(`/domain/${d.id}`);
                  }}
                  style={{
                    ...styles.domainPill,
                    ...(isActive ? styles.domainPillActive : {}),
                  }}
                >
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ──────────────────────────────────────────
          JOURNEY HERO BANNER
         ────────────────────────────────────────── */}
      <section style={styles.bannerCard}>
        <div style={styles.bannerLayout}>
          <div style={styles.bannerContent}>
            <div style={styles.eyebrowBadge}>
              <Compass size={14} color="#2563EB" />
              <span>Personalized Learning Roadmap</span>
            </div>
            <h1 style={styles.bannerTitle}>
              {domainName} Path
            </h1>
            <p style={styles.bannerSubtitle}>
              {currentDomain?.tagline ||
                'Progress sequentially through hands-on technical lessons tailored to your skills.'}
            </p>

            {journeyItems.length > 0 && (
              <div style={styles.statsRow}>
                <span style={styles.statChip}>
                  <strong>{completedCount}</strong> of <strong>{journeyItems.length}</strong> lessons completed
                </span>
              </div>
            )}
          </div>

          <div style={styles.lynxWrapper}>
            <LynxCompanion
              mood={completedCount > 0 ? 'happy' : 'welcome'}
              message={
                currentLesson
                  ? `Ready for ${currentLesson.title || 'your next lesson'}?`
                  : 'Welcome to your learning journey!'
              }
              size="sm"
              showBubble={true}
              bubblePosition="top"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          JOURNEY LESSONS LIST
         ────────────────────────────────────────── */}
      <section style={styles.journeyCard}>
        <div style={styles.cardHeader}>
          <div style={styles.cardHeaderLeft}>
            <div style={styles.cardIconBox}>
              <Layers size={18} color="#2563EB" />
            </div>
            <div>
              <span style={styles.cardEyebrow}>CURRICULUM SEQUENCE</span>
              <h2 style={styles.cardTitle}>Milestone Progression</h2>
            </div>
          </div>
        </div>

        <div style={styles.cardBody}>
          {localLoading ? (
            <div style={styles.loadingContainer}>
              <RefreshCw size={24} color="#2563EB" className="anim-spin" />
              <p style={styles.loadingText}>Syncing roadmap milestones...</p>
            </div>
          ) : localError ? (
            <div style={styles.errorContainer}>
              <AlertCircle size={28} color="#DC2626" />
              <h3 style={styles.errorTitle}>Unable to load journey</h3>
              <p style={styles.errorSubtitle}>{localError}</p>
              <button
                type="button"
                onClick={() => fetchJourney(currentDomainId)}
                style={styles.retryButton}
              >
                <RefreshCw size={14} />
                <span>Retry</span>
              </button>
            </div>
          ) : journeyItems.length > 0 ? (
            <div style={styles.lessonList}>
              {journeyItems.map((item, index) => {
                const lid = item?.lesson_id || item?.lessonId || item?.id;
                const isCompleted = Boolean(item?.is_completed || item?.isCompleted || item?.completed);
                const isCurrent = Boolean(currentLessonId && lid === currentLessonId);
                const isLocked = !isCompleted && !isCurrent;
                const isClickable = isCompleted || isCurrent;

                return (
                  <div
                    key={lid || `item-${index}`}
                    onClick={() => isClickable && handleLessonClick(item)}
                    style={{
                      ...styles.lessonItem,
                      ...(isCurrent ? styles.lessonItemCurrent : {}),
                      ...(isClickable ? styles.lessonItemClickable : styles.lessonItemLocked),
                    }}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleLessonClick(item);
                      }
                    }}
                  >
                    <div style={styles.lessonLeft}>
                      <div
                        style={{
                          ...styles.lessonIndexBadge,
                          ...(isCompleted ? styles.indexCompleted : {}),
                          ...(isCurrent ? styles.indexCurrent : {}),
                          ...(isLocked ? styles.indexLocked : {}),
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={16} color="#10B981" />
                        ) : isCurrent ? (
                          <span style={styles.arrowText}>→</span>
                        ) : (
                          <Lock size={14} color="#94A3B8" />
                        )}
                      </div>

                      <div style={styles.lessonInfo}>
                        <span
                          style={{
                            ...styles.lessonTitle,
                            ...(isCurrent ? styles.titleCurrent : {}),
                            ...(isLocked ? styles.titleLocked : {}),
                          }}
                        >
                          {item.title || `Lesson ${index + 1}`}
                        </span>
                        {item.difficulty && (
                          <span style={styles.lessonMeta}>Difficulty Level {item.difficulty}</span>
                        )}
                      </div>
                    </div>

                    <div style={styles.lessonRight}>
                      {isCompleted && (
                        <span style={styles.badgeCompleted}>✓ Completed</span>
                      )}
                      {isCurrent && (
                        <span style={styles.badgeCurrent}>→ Current</span>
                      )}
                      {isLocked && (
                        <span style={styles.badgeLocked}>🔒 Locked</span>
                      )}
                      {isClickable && <ArrowRight size={16} color="#2563EB" style={{ marginLeft: 8 }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={styles.emptyContainer}>
              <div style={styles.emptyIconCircle}>
                <Compass size={24} color="#6366F1" />
              </div>
              <h3 style={styles.emptyTitle}>Your personalized journey is being prepared</h3>
              <p style={styles.emptySubtitle}>
                Select a domain to begin building your personalized curriculum path.
              </p>
              <button
                type="button"
                onClick={() => navigate('/domains')}
                style={styles.primaryButton}
              >
                <Compass size={16} />
                <span>Explore Domains</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ──────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────
const styles = {
  container: {
    maxWidth: '1080px',
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
    flexWrap: 'wrap',
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
  domainPillList: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  domainPill: {
    padding: '6px 14px',
    borderRadius: '999px',
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#64748B',
    fontSize: '0.82rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  domainPillActive: {
    background: '#EFF6FF',
    border: '1px solid #BFDBFE',
    color: '#2563EB',
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.15)',
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
    maxWidth: '580px',
    lineHeight: 1.5,
  },
  statsRow: {
    marginTop: '12px',
  },
  statChip: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '8px',
    background: '#F1F5F9',
    color: '#334155',
    fontSize: '0.82rem',
  },
  lynxWrapper: {
    flexShrink: 0,
  },

  // Card
  journeyCard: {
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
    padding: '24px',
  },

  // Lesson list
  lessonList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  lessonItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    borderRadius: '14px',
    border: '1px solid #E2E8F0',
    background: '#FFFFFF',
    gap: '14px',
    transition: 'all 0.15s ease',
  },
  lessonItemCurrent: {
    borderColor: '#93C5FD',
    background: '#F8FAFC',
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
  },
  lessonItemClickable: {
    cursor: 'pointer',
  },
  lessonItemLocked: {
    cursor: 'default',
    opacity: 0.85,
  },
  lessonLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: 0,
    flex: 1,
  },
  lessonIndexBadge: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
  },
  indexCompleted: {
    background: '#ECFDF5',
  },
  indexCurrent: {
    background: '#EFF6FF',
  },
  indexLocked: {
    background: '#F1F5F9',
  },
  arrowText: {
    color: '#2563EB',
    fontWeight: '800',
    fontSize: '1.05rem',
  },
  lessonInfo: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  lessonTitle: {
    fontSize: '0.94rem',
    fontWeight: '700',
    color: '#0F172A',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  titleCurrent: {
    color: '#2563EB',
  },
  titleLocked: {
    color: '#64748B',
  },
  lessonMeta: {
    fontSize: '0.74rem',
    color: '#94A3B8',
    marginTop: '2px',
  },
  lessonRight: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  badgeCompleted: {
    padding: '4px 10px',
    borderRadius: '8px',
    background: '#ECFDF5',
    color: '#059669',
    fontSize: '0.78rem',
    fontWeight: '700',
    border: '1px solid #A7F3D0',
  },
  badgeCurrent: {
    padding: '4px 10px',
    borderRadius: '8px',
    background: '#EFF6FF',
    color: '#2563EB',
    fontSize: '0.78rem',
    fontWeight: '700',
    border: '1px solid #BFDBFE',
  },
  badgeLocked: {
    padding: '4px 10px',
    borderRadius: '8px',
    background: '#F1F5F9',
    color: '#94A3B8',
    fontSize: '0.78rem',
    fontWeight: '600',
    border: '1px solid #E2E8F0',
  },

  // Loading & Empty
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 16px',
    gap: '12px',
    color: '#64748B',
  },
  loadingText: {
    fontSize: '0.92rem',
    fontWeight: '600',
    margin: 0,
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 16px',
    textAlign: 'center',
    gap: '8px',
  },
  errorTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: '#991B1B',
    margin: 0,
  },
  errorSubtitle: {
    fontSize: '0.86rem',
    color: '#64748B',
    margin: 0,
  },
  retryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '10px',
    background: '#EFF6FF',
    color: '#2563EB',
    fontSize: '0.84rem',
    fontWeight: '700',
    border: '1px solid #BFDBFE',
    cursor: 'pointer',
    marginTop: '6px',
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '48px 16px',
    gap: '8px',
  },
  emptyIconCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#EEF2FF',
    display: 'grid',
    placeItems: 'center',
    marginBottom: '4px',
  },
  emptyTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: '#0F172A',
    margin: 0,
  },
  emptySubtitle: {
    fontSize: '0.88rem',
    color: '#64748B',
    maxWidth: '340px',
    margin: 0,
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '12px',
    background: '#2563EB',
    color: '#FFFFFF',
    fontSize: '0.88rem',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
};
