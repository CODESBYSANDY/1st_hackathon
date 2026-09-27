import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '../../context/LearningContext';
import { useLynx } from '../../context/LynxContext';
import { LynxCompanion } from '../../components/lynx/LynxCompanion';
import {
  ArrowRight,
  Compass,
  RefreshCw,
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const getLynxMessage = ({
  activeDomain,
  journey,
  isLoadingData,
  dataError,
}) => {
  if (dataError) return "I can't reach your learning data right now. Let's try again!";
  if (isLoadingData) return "I'm syncing your journey…";
  if (!activeDomain) return "Choose a learning path and I'll guide you!";
  if (journey && journey.completed_count > 0) return 'Ready for your next challenge?';
  return "Welcome! Let's build your path together.";
};

const getLynxMood = ({
  activeDomain,
  journey,
  isLoadingData,
  dataError,
}) => {
  if (dataError) return 'sad';
  if (isLoadingData) return 'thinking';
  if (!activeDomain) return 'motivating';
  if (journey && journey.completed_count > 0) return 'happy';
  return 'welcome';
};

export const DashboardPage = () => {
  const navigate = useNavigate();

  const {
    studentState,
    activeDomain,
    domains,
    journey,
    isLoadingData,
    dataError,
    retryBackendSync,
    backendHealth,
  } = useLearning();

  const { setLynxState } = useLynx();

  useEffect(() => {
    const mood = getLynxMood({
      activeDomain,
      journey,
      isLoadingData,
      dataError,
    });

    const message = getLynxMessage({
      activeDomain,
      journey,
      isLoadingData,
      dataError,
    });

    setLynxState(mood, message);
  }, [
    activeDomain,
    journey,
    isLoadingData,
    dataError,
    setLynxState,
  ]);

  const skillEntries = useMemo(() => {
    if (!studentState?.skills || typeof studentState.skills !== 'object') {
      return [];
    }

    return Object.entries(studentState.skills)
      .map(([name, value]) => ({
        name,
        percentage:
          typeof value === 'number'
            ? Math.max(0, Math.min(100, value))
            : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }, [studentState?.skills]);

  const journeyItems = journey?.journey || [];

  const currentLesson =
    journeyItems.find((item) => item.is_current) ||
    journeyItems.find((item) => !item.is_completed);

  const completedCount = journeyItems.filter(
    (item) => item.is_completed
  ).length;

  const currentDomainInfo = domains?.find(
    (domain) => domain.id === activeDomain
  );

  const lynxMood = getLynxMood({
    activeDomain,
    journey,
    isLoadingData,
    dataError,
  });

  const lynxMessage = getLynxMessage({
    activeDomain,
    journey,
    isLoadingData,
    dataError,
  });

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* HERO */}
        <section className="dashboard-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={15} />
              <span>PERSONALIZED LEARNING</span>
            </div>

            <h1 className="hero-title">
              {getGreeting()},{' '}
              <span>
                {studentState?.student?.name || 'Learner'}
              </span>
            </h1>

            <p className="hero-subtitle">
              {activeDomain && currentDomainInfo ? (
                <>
                  Continue your{' '}
                  <strong>{currentDomainInfo.name}</strong>{' '}
                  learning journey
                  {completedCount > 0 &&
                    ` · ${completedCount} lesson${completedCount !== 1 ? 's' : ''
                    } completed`}
                  .
                </>
              ) : (
                <>
                  Your personalized learning journey starts here.
                  Choose a domain and begin building your path.
                </>
              )}
            </p>

            <div className="hero-actions">
              {currentLesson ? (
                <button
                  type="button"
                  className="dashboard-primary-button"
                  onClick={() =>
                    navigate(`/lesson/${currentLesson.lesson_id}`)
                  }
                >
                  <span>
                    Continue: {currentLesson.title}
                  </span>
                  <ArrowRight size={18} />
                </button>
              ) : activeDomain ? (
                <button
                  type="button"
                  className="dashboard-primary-button"
                  onClick={() =>
                    navigate(`/domain/${activeDomain}`)
                  }
                >
                  <span>View Learning Journey</span>
                  <Compass size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  className="dashboard-primary-button"
                  onClick={() => navigate('/domains')}
                >
                  <span>Explore Domains</span>
                  <Compass size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="hero-lynx">
            <LynxCompanion
              mood={lynxMood}
              message={lynxMessage}
              size="md"
              showBubble
            />
          </div>
        </section>

        {/* BACKEND ERROR */}
        {dataError && !isLoadingData && (
          <section className="dashboard-alert">
            <div className="alert-icon">
              <AlertCircle size={19} />
            </div>

            <div className="alert-content">
              <strong>Unable to sync your learning profile</strong>
              <span>{dataError}</span>
            </div>

            <button
              type="button"
              className="alert-retry"
              onClick={retryBackendSync}
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </section>
        )}

        {/* BACKEND LOADING */}
        {isLoadingData && (
          <section className="dashboard-loading">
            <div className="loading-orbit">
              <Sparkles size={19} />
            </div>
            <div>
              <strong>Loading your learning journey...</strong>
              <span>Syncing your latest learning data.</span>
            </div>
          </section>
        )}

        {/* MAIN GRID */}
        <div className="dashboard-grid">

          {/* JOURNEY */}
          <section className="dashboard-card journey-card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon blue">
                  <BookOpen size={18} />
                </div>

                <div>
                  <h2>Your Learning Journey</h2>
                  <p>
                    {currentDomainInfo?.name ||
                      'Your personalized path'}
                  </p>
                </div>
              </div>

              {activeDomain && journeyItems.length > 0 && (
                <button
                  type="button"
                  className="card-link"
                  onClick={() =>
                    navigate(`/domain/${activeDomain}`)
                  }
                >
                  View path <ArrowRight size={14} />
                </button>
              )}
            </div>

            {journeyItems.length > 0 && !isLoadingData ? (
              <div className="journey-list">
                {journeyItems.slice(0, 6).map((item, index) => {
                  const clickable =
                    item.is_current || item.is_completed;

                  return (
                    <button
                      type="button"
                      key={item.lesson_id || index}
                      className={`journey-item ${item.is_current ? 'current' : ''
                        } ${item.is_completed ? 'completed' : ''
                        } ${!clickable ? 'locked' : ''}`}
                      onClick={() => {
                        if (clickable) {
                          navigate(`/lesson/${item.lesson_id}`);
                        }
                      }}
                      disabled={!clickable}
                    >
                      <div className="journey-status">
                        {item.is_completed ? (
                          <CheckCircle2 size={17} />
                        ) : item.is_current ? (
                          <Sparkles size={17} />
                        ) : (
                          <Lock size={15} />
                        )}
                      </div>

                      <div className="journey-item-text">
                        <strong>{item.title}</strong>

                        {item.is_current && (
                          <span>Continue this lesson</span>
                        )}

                        {item.is_completed && (
                          <span>Completed</span>
                        )}

                        {!item.is_current &&
                          !item.is_completed && (
                            <span>Upcoming</span>
                          )}
                      </div>

                      {item.is_current && (
                        <span className="journey-pill current-pill">
                          Current
                        </span>
                      )}

                      {item.is_completed && (
                        <span className="journey-pill done-pill">
                          Done
                        </span>
                      )}

                      {clickable && (
                        <ArrowRight
                          className="journey-arrow"
                          size={16}
                        />
                      )}
                    </button>
                  );
                })}

                {journeyItems.length > 6 && (
                  <button
                    type="button"
                    className="more-journey"
                    onClick={() =>
                      navigate(`/domain/${activeDomain}`)
                    }
                  >
                    View {journeyItems.length - 6} more lessons
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <BookOpen size={21} />
                </div>

                <strong>
                  {activeDomain
                    ? 'Your journey is being prepared'
                    : 'Choose a learning path'}
                </strong>

                <span>
                  {activeDomain
                    ? 'Complete your first lesson and your personalized path will appear here.'
                    : 'Select a domain to begin your personalized learning journey.'}
                </span>

                {!activeDomain && (
                  <button
                    type="button"
                    className="empty-action"
                    onClick={() => navigate('/domains')}
                  >
                    Explore Domains
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            )}
          </section>

          {/* SKILLS */}
          <section className="dashboard-card skills-card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon purple">
                  <Sparkles size={18} />
                </div>

                <div>
                  <h2>Skill Progress</h2>
                  <p>Based on your actual learning evidence</p>
                </div>
              </div>

              {skillEntries.length > 0 && (
                <button
                  type="button"
                  className="card-link"
                  onClick={() => navigate('/profile')}
                >
                  View all <ArrowRight size={14} />
                </button>
              )}
            </div>

            {skillEntries.length > 0 && !isLoadingData ? (
              <div className="skill-list">
                {skillEntries.slice(0, 6).map((skill) => (
                  <div className="skill-row" key={skill.name}>
                    <div className="skill-heading">
                      <span>
                        {skill.name.replace(/_/g, ' ')}
                      </span>
                      <strong>{skill.percentage}%</strong>
                    </div>

                    <div className="skill-track">
                      <div
                        className={`skill-fill ${skill.percentage >= 70
                            ? 'strong'
                            : skill.percentage >= 40
                              ? 'developing'
                              : 'needs-practice'
                          }`}
                        style={{
                          width: `${skill.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon purple-bg">
                  <Sparkles size={21} />
                </div>

                <strong>Your skill profile starts here</strong>

                <span>
                  Complete lessons and assessments. Your skills
                  will appear here from real learning activity.
                </span>
              </div>
            )}
          </section>
        </div>

        {/* BACKEND STATUS - subtle, no fake metrics */}
        <div className="dashboard-footer-status">
          <span
            className={`status-dot ${backendHealth ? 'online' : 'offline'
              }`}
          />
          <span>
            {backendHealth
              ? 'Learning profile synced'
              : 'Learning profile connection unavailable'}
          </span>
        </div>
      </div>

      <style>{`
        .dashboard-page {
          width: 100%;
          min-height: 100%;
          padding: 28px 28px 42px;
          box-sizing: border-box;
          background:
            radial-gradient(
              circle at 15% 5%,
              rgba(219, 234, 254, 0.55),
              transparent 34%
            ),
            radial-gradient(
              circle at 90% 10%,
              rgba(237, 233, 254, 0.6),
              transparent 34%
            ),
            #f7f9fc;
          color: #0f172a;
        }

        .dashboard-container {
          width: min(1180px, 100%);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dashboard-hero {
          position: relative;
          overflow: hidden;
          min-height: 290px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          padding: 38px 42px;
          border: 1px solid rgba(226, 232, 240, 0.95);
          border-radius: 26px;
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.98),
              rgba(246, 249, 255, 0.96)
            );
          box-shadow:
            0 18px 50px rgba(15, 23, 42, 0.07),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .dashboard-hero::before {
          content: '';
          position: absolute;
          width: 360px;
          height: 360px;
          right: 90px;
          top: -230px;
          border-radius: 50%;
          background: rgba(129, 140, 248, 0.12);
          filter: blur(5px);
          pointer-events: none;
        }

        .dashboard-hero::after {
          content: '';
          position: absolute;
          width: 260px;
          height: 260px;
          left: -150px;
          bottom: -180px;
          border-radius: 50%;
          background: rgba(56, 189, 248, 0.10);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          flex: 1;
          min-width: 0;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border: 1px solid #dbeafe;
          border-radius: 999px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .hero-title {
          margin: 17px 0 7px;
          max-width: 760px;
          font-size: clamp(2rem, 4vw, 3.05rem);
          line-height: 1.08;
          letter-spacing: -0.045em;
          font-weight: 850;
          color: #0f172a;
        }

        .hero-title span {
          color: #2563eb;
        }

        .hero-subtitle {
          max-width: 700px;
          margin: 0;
          color: #64748b;
          font-size: 0.98rem;
          line-height: 1.65;
        }

        .hero-subtitle strong {
          color: #334155;
        }

        .hero-actions {
          margin-top: 22px;
        }

        .dashboard-primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 48px;
          max-width: 100%;
          padding: 0 19px;
          border: 0;
          border-radius: 13px;
          background: linear-gradient(135deg, #2563eb, #6366f1);
          color: #fff;
          font-size: 0.87rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);
          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease;
        }

        .dashboard-primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(37, 99, 235, 0.28);
        }

        .hero-lynx {
          position: relative;
          z-index: 2;
          width: 210px;
          min-width: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: avira-dashboard-float 4.5s ease-in-out infinite;
        }

        @keyframes avira-dashboard-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .dashboard-alert {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 14px 16px;
          border: 1px solid #fed7aa;
          border-radius: 15px;
          background: #fffaf5;
          color: #9a3412;
        }

        .alert-icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #ffedd5;
          color: #ea580c;
        }

        .alert-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .alert-content strong {
          font-size: 0.84rem;
        }

        .alert-content span {
          overflow: hidden;
          color: #c2410c;
          font-size: 0.75rem;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .alert-retry {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 13px;
          border: 1px solid #fdba74;
          border-radius: 10px;
          background: #fff;
          color: #c2410c;
          font-size: 0.76rem;
          font-weight: 800;
          cursor: pointer;
        }

        .dashboard-loading {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 15px 18px;
          border: 1px solid #dbeafe;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.9);
        }

        .dashboard-loading > div:last-child {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .dashboard-loading strong {
          font-size: 0.82rem;
          color: #334155;
        }

        .dashboard-loading span {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .loading-orbit {
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #eff6ff;
          color: #2563eb;
          animation: avira-spin 2s linear infinite;
        }

        @keyframes avira-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 20px;
          align-items: stretch;
        }

        .dashboard-card {
          min-width: 0;
          padding: 24px;
          border: 1px solid #e2e8f0;
          border-radius: 21px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 10px 32px rgba(15, 23, 42, 0.055);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }

        .card-title-group {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 0;
        }

        .card-icon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 11px;
        }

        .card-icon.blue {
          color: #2563eb;
          background: #eff6ff;
        }

        .card-icon.purple {
          color: #7c3aed;
          background: #f5f3ff;
        }

        .card-title-group h2 {
          margin: 0;
          color: #172033;
          font-size: 0.98rem;
          font-weight: 800;
        }

        .card-title-group p {
          margin: 3px 0 0;
          color: #94a3b8;
          font-size: 0.71rem;
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          border: 0;
          background: transparent;
          color: #2563eb;
          font-size: 0.75rem;
          font-weight: 800;
          cursor: pointer;
        }

        .journey-list,
        .skill-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .journey-item {
          width: 100%;
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 11px 12px;
          border: 1px solid #e8edf3;
          border-radius: 13px;
          background: #fbfcfe;
          text-align: left;
          transition:
            transform 0.16s ease,
            border-color 0.16s ease,
            background 0.16s ease,
            box-shadow 0.16s ease;
        }

        .journey-item:not(:disabled) {
          cursor: pointer;
        }

        .journey-item:not(:disabled):hover {
          transform: translateY(-1px);
          border-color: #bfdbfe;
          background: #f8fbff;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.07);
        }

        .journey-item.current {
          border-color: #bfdbfe;
          background: #f5f9ff;
        }

        .journey-item.completed {
          border-color: #d1fae5;
          background: #f7fdf9;
        }

        .journey-status {
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: #94a3b8;
          background: #f1f5f9;
        }

        .journey-item.current .journey-status {
          color: #2563eb;
          background: #dbeafe;
        }

        .journey-item.completed .journey-status {
          color: #16a34a;
          background: #dcfce7;
        }

        .journey-item-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .journey-item-text strong {
          overflow: hidden;
          color: #334155;
          font-size: 0.78rem;
          font-weight: 750;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .journey-item.current .journey-item-text strong {
          color: #1d4ed8;
        }

        .journey-item.completed .journey-item-text strong {
          color: #166534;
        }

        .journey-item-text span {
          color: #94a3b8;
          font-size: 0.67rem;
        }

        .journey-pill {
          flex-shrink: 0;
          padding: 4px 7px;
          border-radius: 999px;
          font-size: 0.62rem;
          font-weight: 800;
        }

        .current-pill {
          color: #1d4ed8;
          background: #dbeafe;
        }

        .done-pill {
          color: #166534;
          background: #dcfce7;
        }

        .journey-arrow {
          flex-shrink: 0;
          color: #94a3b8;
        }

        .more-journey {
          align-self: center;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 3px;
          border: 0;
          background: transparent;
          color: #2563eb;
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
        }

        .skill-list {
          gap: 17px;
        }

        .skill-row {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .skill-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-transform: capitalize;
        }

        .skill-heading span {
          overflow: hidden;
          color: #334155;
          font-size: 0.78rem;
          font-weight: 700;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .skill-heading strong {
          flex-shrink: 0;
          font-size: 0.75rem;
        }

        .skill-track {
          width: 100%;
          height: 7px;
          overflow: hidden;
          border-radius: 999px;
          background: #eef2f7;
        }

        .skill-fill {
          height: 100%;
          border-radius: inherit;
          transition: width 0.5s ease;
        }

        .skill-fill.strong {
          background: linear-gradient(90deg, #10b981, #34d399);
        }

        .skill-fill.developing {
          background: linear-gradient(90deg, #2563eb, #60a5fa);
        }

        .skill-fill.needs-practice {
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }

        .empty-state {
          min-height: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 25px 18px;
          border: 1px dashed #d8e0ea;
          border-radius: 15px;
          background: #fbfcfe;
          text-align: center;
        }

        .empty-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          margin-bottom: 3px;
          border-radius: 13px;
          color: #2563eb;
          background: #eff6ff;
        }

        .empty-icon.purple-bg {
          color: #7c3aed;
          background: #f5f3ff;
        }

        .empty-state strong {
          color: #334155;
          font-size: 0.82rem;
        }

        .empty-state > span {
          max-width: 360px;
          color: #94a3b8;
          font-size: 0.72rem;
          line-height: 1.5;
        }

        .empty-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 7px;
          padding: 9px 13px;
          border: 0;
          border-radius: 10px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 0.73rem;
          font-weight: 800;
          cursor: pointer;
        }

        .dashboard-footer-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #94a3b8;
          font-size: 0.69rem;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .status-dot.online {
          background: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .status-dot.offline {
          background: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        @media (max-width: 900px) {
          .dashboard-page {
            padding: 20px 18px 32px;
          }

          .dashboard-hero {
            padding: 30px;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .hero-lynx {
            width: 170px;
            min-width: 150px;
          }
        }

        @media (max-width: 640px) {
          .dashboard-page {
            padding: 15px 12px 28px;
          }

          .dashboard-container {
            gap: 14px;
          }

          .dashboard-hero {
            min-height: 0;
            flex-direction: column;
            align-items: flex-start;
            padding: 25px 21px;
            border-radius: 19px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 0.87rem;
          }

          .hero-lynx {
            width: 100%;
            min-width: 0;
            justify-content: flex-end;
            margin-top: -18px;
          }

          .dashboard-card {
            padding: 18px;
            border-radius: 17px;
          }

          .card-header {
            align-items: flex-start;
          }

          .card-title-group p {
            display: none;
          }

          .journey-pill {
            display: none;
          }

          .dashboard-alert {
            align-items: flex-start;
          }

          .alert-content span {
            white-space: normal;
          }
        }
      `}</style>
    </div>
  );
};
