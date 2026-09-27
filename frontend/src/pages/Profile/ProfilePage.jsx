import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import {
  User,
  Mail,
  Compass,
  Layers,
  Sparkles,
  BarChart3,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
  Wifi,
  WifiOff,
} from 'lucide-react';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    studentState,
    authUser,
    activeDomain,
    domains = [],
    backendHealth,
    backendUser,
  } = useLearning();

  const student = studentState?.student || {};
  const name = authUser?.name || student.name || 'Learner';
  const email = authUser?.email || student.email || 'student@avira.learn';
  const avatar = authUser?.avatar || student.avatar || null;
  const uid = authUser?.uid || student.id || null;

  const currentDomain = useMemo(() => {
    if (!activeDomain) return null;
    return domains.find((d) => d.id === activeDomain || d.domain_id === activeDomain) || null;
  }, [domains, activeDomain]);

  const domainName =
    currentDomain?.name ||
    currentDomain?.title ||
    (activeDomain ? activeDomain.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : null);

  // Safely parse skills from studentState.skills
  const skillList = useMemo(() => {
    const rawSkills = studentState?.skills;
    if (!rawSkills || typeof rawSkills !== 'object' || Array.isArray(rawSkills)) {
      return [];
    }

    return Object.entries(rawSkills)
      .map(([key, val]) => {
        let num = null;
        if (typeof val === 'number' && Number.isFinite(val)) {
          num = val;
        } else if (val && typeof val === 'object' && typeof val.score === 'number') {
          num = val.score;
        } else if (val && typeof val === 'object' && typeof val.percentage === 'number') {
          num = val.percentage;
        } else if (typeof val === 'string' && !isNaN(Number(val))) {
          num = Number(val);
        }

        if (num === null) return null;

        const formattedName = key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return {
          key,
          name: formattedName,
          percentage: Math.max(0, Math.min(100, Math.round(num))),
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.percentage - a.percentage);
  }, [studentState?.skills]);

  const completedLessons = studentState?.progress?.completedLessons || 0;
  const totalLessons = studentState?.progress?.totalLessons || 0;
  const isOnline = Boolean(backendHealth?.isOnline);

  return (
    <div style={styles.container}>
      {/* ──────────────────────────────────────────
          PROFILE BANNER
         ────────────────────────────────────────── */}
      <section style={styles.bannerCard}>
        <div style={styles.bannerLayout}>
          <div style={styles.userProfileGroup}>
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                style={styles.avatarImg}
              />
            ) : (
              <div style={styles.avatarFallback}>
                {name.charAt(0).toUpperCase()}
              </div>
            )}

            <div style={styles.userInfo}>
              <div style={styles.nameRow}>
                <h1 style={styles.userName}>{name}</h1>
                <span style={styles.statusBadge}>
                  {isOnline ? (
                    <>
                      <Wifi size={12} color="#10B981" />
                      <span>Synced</span>
                    </>
                  ) : (
                    <>
                      <WifiOff size={12} color="#94A3B8" />
                      <span>Offline</span>
                    </>
                  )}
                </span>
              </div>

              <div style={styles.userMetaRow}>
                <span style={styles.userMetaItem}>
                  <Mail size={14} color="#64748B" />
                  <span>{email}</span>
                </span>
                {uid && (
                  <span style={styles.userMetaItem}>
                    <ShieldCheck size={14} color="#64748B" />
                    <span>ID: {uid.slice(0, 10)}...</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={styles.lynxWrapper}>
            <LynxCompanion
              mood="happy"
              message="Your learning profile is active and synced."
              size="sm"
              showBubble={true}
              bubblePosition="top"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          MAIN 2-COLUMN GRID: LEARNING INFO & SKILLS
         ────────────────────────────────────────── */}
      <div style={styles.mainGrid}>
        {/* LEFT COLUMN: ACTIVE TRACK & PROGRESS */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardHeaderLeft}>
              <div style={styles.cardIconBox}>
                <Layers size={18} color="#2563EB" />
              </div>
              <div>
                <span style={styles.cardEyebrow}>CURRENT TRACK</span>
                <h2 style={styles.cardTitle}>Learning Domain</h2>
              </div>
            </div>
          </div>

          <div style={styles.cardBody}>
            {domainName ? (
              <div style={styles.domainInfoBox}>
                <div style={styles.domainHeader}>
                  <h3 style={styles.domainTitle}>{domainName}</h3>
                  <span style={styles.activePill}>Active Track</span>
                </div>
                {currentDomain?.tagline && (
                  <p style={styles.domainTagline}>{currentDomain.tagline}</p>
                )}

                {totalLessons > 0 && (
                  <div style={styles.progressSection}>
                    <div style={styles.progressHeader}>
                      <span>Lesson Progress</span>
                      <strong>{completedLessons} / {totalLessons} completed</strong>
                    </div>
                    <div style={styles.progressTrack}>
                      <div
                        style={{
                          ...styles.progressFill,
                          width: `${Math.round((completedLessons / totalLessons) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div style={styles.actionButtonsRow}>
                  <button
                    type="button"
                    onClick={() => navigate(`/domain/${activeDomain}`)}
                    style={styles.primaryButton}
                  >
                    <span>View Learning Path</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/domains')}
                    style={styles.secondaryButton}
                  >
                    <span>Change Domain</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={styles.emptyContainer}>
                <div style={styles.emptyIconCircle}>
                  <Compass size={24} color="#6366F1" />
                </div>
                <h3 style={styles.emptyTitle}>No domain selected yet</h3>
                <p style={styles.emptySubtitle}>
                  Choose a core engineering track to start building your profile.
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

        {/* RIGHT COLUMN: SKILLS PROFILE */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardHeaderLeft}>
              <div style={styles.cardIconBox}>
                <BarChart3 size={18} color="#6366F1" />
              </div>
              <div>
                <span style={styles.cardEyebrow}>EVALUATION PROFILE</span>
                <h2 style={styles.cardTitle}>Skill Mastery</h2>
              </div>
            </div>
          </div>

          <div style={styles.cardBody}>
            {skillList.length > 0 ? (
              <div style={styles.skillList}>
                {skillList.map((skill) => (
                  <div key={skill.key} style={styles.skillRow}>
                    <div style={styles.skillHeading}>
                      <span style={styles.skillName}>{skill.name}</span>
                      <strong style={styles.skillPercent}>{skill.percentage}%</strong>
                    </div>
                    <div style={styles.progressTrack}>
                      <div
                        style={{
                          ...styles.progressFill,
                          width: `${skill.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyContainer}>
                <div style={styles.emptyIconCircle}>
                  <Sparkles size={24} color="#6366F1" />
                </div>
                <h3 style={styles.emptyTitle}>Your skill profile starts here</h3>
                <p style={styles.emptySubtitle}>
                  Complete lessons and assessments. Your skills will appear here based on real learning activity.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ──────────────────────────────────────────
          FOOTER NAVIGATION BAR
         ────────────────────────────────────────── */}
      <div style={styles.footerRow}>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={styles.backButton}
        >
          <LayoutDashboard size={16} />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────
const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    color: '#0F172A',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
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
  userProfileGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    minWidth: '260px',
  },
  avatarImg: {
    width: '74px',
    height: '74px',
    borderRadius: '20px',
    border: '3px solid #3B82F6',
    objectFit: 'cover',
    boxShadow: '0 6px 18px rgba(37, 99, 235, 0.2)',
  },
  avatarFallback: {
    width: '74px',
    height: '74px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #2563EB, #6366F1)',
    color: '#FFFFFF',
    display: 'grid',
    placeItems: 'center',
    fontSize: '1.8rem',
    fontWeight: '800',
    boxShadow: '0 6px 18px rgba(37, 99, 235, 0.2)',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  userName: {
    fontSize: '1.6rem',
    fontWeight: '850',
    color: '#0F172A',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    borderRadius: '20px',
    background: '#ECFDF5',
    border: '1px solid #A7F3D0',
    color: '#065F46',
    fontSize: '0.74rem',
    fontWeight: '700',
  },
  userMetaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  userMetaItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.86rem',
    color: '#64748B',
  },
  lynxWrapper: {
    flexShrink: 0,
  },

  // Grid
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '24px',
  },

  // Card
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
    padding: '24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  // Domain details
  domainInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  domainHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  domainTitle: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#0F172A',
    margin: 0,
  },
  activePill: {
    padding: '4px 10px',
    borderRadius: '999px',
    background: '#EFF6FF',
    border: '1px solid #BFDBFE',
    color: '#2563EB',
    fontSize: '0.74rem',
    fontWeight: '700',
  },
  domainTagline: {
    fontSize: '0.9rem',
    color: '#64748B',
    lineHeight: 1.5,
    margin: 0,
  },
  progressSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '6px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.82rem',
    color: '#475569',
  },
  actionButtonsRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: '12px',
    background: '#2563EB',
    color: '#FFFFFF',
    fontSize: '0.88rem',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.22)',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '12px',
    background: '#FFFFFF',
    color: '#0F172A',
    fontSize: '0.88rem',
    fontWeight: '600',
    border: '1px solid #E2E8F0',
    cursor: 'pointer',
  },

  // Skills
  skillList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  skillRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  skillHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontSize: '0.88rem',
    fontWeight: '700',
    color: '#1E293B',
  },
  skillPercent: {
    fontSize: '0.84rem',
    fontWeight: '700',
    color: '#2563EB',
  },
  progressTrack: {
    width: '100%',
    height: '8px',
    borderRadius: '999px',
    background: '#F1F5F9',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '999px',
    background: 'linear-gradient(90deg, #2563EB, #6366F1)',
    transition: 'width 0.4s ease',
  },

  // Empty state
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '32px 16px',
    gap: '8px',
  },
  emptyIconCircle: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    background: '#EEF2FF',
    display: 'grid',
    placeItems: 'center',
    marginBottom: '4px',
  },
  emptyTitle: {
    fontSize: '0.98rem',
    fontWeight: '700',
    color: '#0F172A',
    margin: 0,
  },
  emptySubtitle: {
    fontSize: '0.86rem',
    color: '#64748B',
    maxWidth: '300px',
    lineHeight: 1.4,
    margin: 0,
  },

  // Footer
  footerRow: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: '12px',
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#475569',
    fontSize: '0.88rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
};
