import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import {
  Globe,
  Smartphone,
  ShieldCheck,
  Brain,
  BarChart3,
  Workflow,
  Database,
  Code,
  Layers,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Compass,
} from 'lucide-react';

// Icon map for backend domain keys
const DOMAIN_ICON_MAP = {
  Code,
  Globe,
  Smartphone,
  ShieldCheck,
  Brain,
  BarChart3,
  Workflow,
  Database,
  Layers,
};

export const DomainSelectionPage = () => {
  const navigate = useNavigate();
  const {
    domains = [],
    activeDomain,
    selectDomain,
    isLoadingData,
    fetchDomains,
  } = useLearning();

  useEffect(() => {
    if (!domains || domains.length === 0) {
      fetchDomains();
    }
  }, [domains, fetchDomains]);

  const handleSelect = async (domainId) => {
    if (!domainId) return;
    await selectDomain(domainId);
    navigate(`/domain/${domainId}`);
  };

  return (
    <div style={styles.container}>
      {/* ──────────────────────────────────────────
          HERO BANNER
         ────────────────────────────────────────── */}
      <section style={styles.bannerCard}>
        <div style={styles.bannerLayout}>
          <div style={styles.bannerContent}>
            <div style={styles.eyebrowBadge}>
              <Layers size={14} color="#2563EB" />
              <span>Placement Preparation Tracks</span>
            </div>
            <h1 style={styles.bannerTitle}>
              Choose Your Learning World
            </h1>
            <p style={styles.bannerSubtitle}>
              AVIRA adapts to your technical journey. Choose a core engineering domain to begin building your personalized path.
            </p>
          </div>

          <div style={styles.lynxWrapper}>
            <LynxCompanion
              mood="motivating"
              message="Choose your world. Every master started at Level 1!"
              size="sm"
              showBubble={true}
              bubblePosition="top"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          DOMAINS GRID
         ────────────────────────────────────────── */}
      {isLoadingData && (!domains || domains.length === 0) ? (
        <div style={styles.loadingBox}>
          <RefreshCw size={24} color="#2563EB" className="anim-spin" />
          <p style={styles.loadingText}>Loading available domains...</p>
        </div>
      ) : domains.length > 0 ? (
        <div style={styles.domainsGrid}>
          {domains.map((domain) => {
            const isSelected = activeDomain === domain.id;
            const primaryColor = domain.primary_color || domain.primaryColor || '#2563EB';

            // Pick appropriate icon
            let IconComponent = Globe;
            if (domain.icon && DOMAIN_ICON_MAP[domain.icon]) {
              IconComponent = DOMAIN_ICON_MAP[domain.icon];
            } else if (domain.id === 'app' || domain.id?.includes('mobile')) {
              IconComponent = Smartphone;
            } else if (domain.id === 'cybersecurity' || domain.id?.includes('security')) {
              IconComponent = ShieldCheck;
            } else if (domain.id === 'ai_ml' || domain.id?.includes('ai')) {
              IconComponent = Brain;
            } else if (domain.id === 'data_science' || domain.id?.includes('data')) {
              IconComponent = BarChart3;
            } else if (domain.id === 'devops') {
              IconComponent = Workflow;
            } else if (domain.id === 'database') {
              IconComponent = Database;
            } else {
              IconComponent = Code;
            }

            return (
              <div
                key={domain.id}
                style={{
                  ...styles.domainCard,
                  ...(isSelected ? { borderColor: primaryColor, boxShadow: `0 12px 30px rgba(37, 99, 235, 0.12)` } : {}),
                }}
              >
                <div style={styles.cardTop}>
                  <div style={styles.domainHeaderRow}>
                    <div
                      style={{
                        ...styles.iconCircle,
                        background: `${primaryColor}15`,
                        color: primaryColor,
                      }}
                    >
                      <IconComponent size={24} />
                    </div>

                    {isSelected && (
                      <span style={styles.activePill}>
                        <CheckCircle2 size={12} />
                        <span>Current Active</span>
                      </span>
                    )}
                  </div>

                  <h2 style={styles.domainTitle}>{domain.name || domain.title}</h2>
                  {domain.tagline && (
                    <p style={{ ...styles.domainTagline, color: primaryColor }}>
                      &ldquo;{domain.tagline}&rdquo;
                    </p>
                  )}
                  {domain.description && (
                    <p style={styles.domainDescription}>{domain.description}</p>
                  )}
                </div>

                <div style={styles.cardBottom}>
                  <button
                    type="button"
                    onClick={() => handleSelect(domain.id)}
                    style={{
                      ...styles.selectButton,
                      background: primaryColor,
                    }}
                  >
                    <span>{isSelected ? 'Continue in World' : `Enter ${domain.name || 'Domain'}`}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={styles.emptyCard}>
          <Compass size={32} color="#6366F1" />
          <h3 style={styles.emptyTitle}>No domains available at the moment</h3>
          <p style={styles.emptySubtitle}>
            Our curriculum catalog is synchronizing. Please check back shortly.
          </p>
          <button
            type="button"
            onClick={() => fetchDomains()}
            style={styles.retryButton}
          >
            <RefreshCw size={14} />
            <span>Refresh Catalog</span>
          </button>
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
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    color: '#0F172A',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },

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
    letterSpacing: '-0.025em',
    margin: 0,
    lineHeight: 1.25,
  },
  bannerSubtitle: {
    fontSize: '0.96rem',
    color: '#64748B',
    marginTop: '6px',
    maxWidth: '600px',
    lineHeight: 1.55,
  },
  lynxWrapper: {
    flexShrink: 0,
  },

  // Grid
  domainsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  domainCard: {
    background: '#FFFFFF',
    borderRadius: '20px',
    border: '1px solid #E2E8F0',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardTop: {
    display: 'flex',
    flexDirection: 'column',
  },
  domainHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  iconCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'grid',
    placeItems: 'center',
  },
  activePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    borderRadius: '999px',
    background: '#ECFDF5',
    border: '1px solid #A7F3D0',
    color: '#065F46',
    fontSize: '0.72rem',
    fontWeight: '800',
  },
  domainTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#0F172A',
    margin: 0,
  },
  domainTagline: {
    fontSize: '0.86rem',
    fontWeight: '600',
    marginTop: '4px',
    marginBottom: '8px',
  },
  domainDescription: {
    fontSize: '0.88rem',
    color: '#64748B',
    lineHeight: 1.5,
    margin: 0,
  },
  cardBottom: {
    marginTop: 'auto',
  },
  selectButton: {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    borderRadius: '12px',
    color: '#FFFFFF',
    fontSize: '0.9rem',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
    transition: 'all 0.15s ease',
  },

  // Loading & Empty
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '60px 20px',
    color: '#64748B',
  },
  loadingText: {
    fontSize: '0.94rem',
    fontWeight: '600',
    margin: 0,
  },
  emptyCard: {
    background: '#FFFFFF',
    borderRadius: '20px',
    border: '1px dashed #CBD5E1',
    padding: '48px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '10px',
  },
  emptyTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0F172A',
    margin: 0,
  },
  emptySubtitle: {
    fontSize: '0.88rem',
    color: '#64748B',
    maxWidth: '360px',
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
    fontSize: '0.82rem',
    fontWeight: '700',
    border: '1px solid #BFDBFE',
    cursor: 'pointer',
    marginTop: '6px',
  },
};
