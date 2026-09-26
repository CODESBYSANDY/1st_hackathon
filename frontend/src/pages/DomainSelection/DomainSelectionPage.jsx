import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DOMAINS } from '../../data/domains/domainsData';
import { useLearning } from '../../context/LearningContext';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import { Globe, Smartphone, Sparkles, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export const DomainSelectionPage = () => {
  const navigate = useNavigate();
  const { selectDomain, activeDomain } = useLearning();

  const handleSelect = (domainId) => {
    selectDomain(domainId);
    navigate(`/domain/${domainId}`);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Top Banner with Mascot Guide */}
      <div
        className="glass-card"
        style={{
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,249,255,0.9) 100%)',
          borderLeft: '4px solid #2563EB'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: '800', fontSize: '0.82rem', textTransform: 'uppercase' }}>
            <Award size={18} />
            <span>Placement Preparation Tracks</span>
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
            Choose Your Learning World
          </h1>
          <p style={{ fontSize: '1rem', color: '#64748B', maxWidth: '620px', marginTop: '4px', lineHeight: 1.5 }}>
            NETRA adapts to your technical journey. Choose a core domain to begin leveling up through hands-on missions, checkpoints, and placement boss battles.
          </p>
        </div>

        <LynxCompanion
          mood="motivating"
          message="Choose your world. Every master started at Level 1!"
          size="md"
          showBubble={true}
        />
      </div>

      {/* ONLY TWO MVP DOMAIN CARDS: Web Development & App Development */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '28px' }}>
        {DOMAINS.map((domain) => {
          const isSelected = activeDomain === domain.id;
          const Icon = domain.id === 'web' ? Globe : Smartphone;

          return (
            <div
              key={domain.id}
              className="glass-card"
              style={{
                padding: '36px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '24px',
                border: isSelected ? `2px solid ${domain.primaryColor}` : '1px solid var(--border-subtle)',
                boxShadow: isSelected ? `0 12px 28px -4px ${domain.primaryColor}25` : 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Subtle Ambient Background Gradient */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '180px',
                  height: '180px',
                  background: domain.gradient,
                  filter: 'blur(70px)',
                  opacity: 0.12,
                  pointerEvents: 'none'
                }}
              />

              <div>
                {/* Header Badge & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: domain.gradient,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 16px ${domain.primaryColor}35`
                    }}
                  >
                    <Icon size={28} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      background: `${domain.primaryColor}15`,
                      color: domain.primaryColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    {domain.badge}
                  </span>
                </div>

                {/* Domain Title & Description */}
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
                  {domain.name}
                </h2>
                <div style={{ fontSize: '0.94rem', fontWeight: '600', color: domain.primaryColor, marginBottom: '10px' }}>
                  &ldquo;{domain.tagline}&rdquo;
                </div>
                <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5 }}>
                  {domain.description}
                </p>

                {/* Tech Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
                  {domain.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: '#F1F5F9',
                        color: '#334155'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Progress Overview */}
                <div style={{ marginTop: '24px', padding: '16px', background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                    <span>Domain Mastery</span>
                    <span>{domain.id === 'web' ? '42%' : '18%'}</span>
                  </div>
                  <div style={{ height: '8px', width: '100%', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: domain.id === 'web' ? '42%' : '18%',
                        background: domain.gradient,
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginTop: '8px' }}>
                    <span>{domain.totalLevels} Total Levels</span>
                    <span>Current: Level {domain.id === 'web' ? '2 (HTML)' : '2 (Dart)'}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelect(domain.id)}
                className="btn-game-primary"
                style={{
                  width: '100%',
                  background: domain.gradient,
                  fontSize: '1rem',
                  padding: '14px'
                }}
              >
                <span>Enter {domain.name} World</span>
                <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
