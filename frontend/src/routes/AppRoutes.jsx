import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { useLearning } from '../context/LearningContext';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { DomainSelectionPage } from '../pages/DomainSelection/DomainSelectionPage';
import { RoadmapPage } from '../pages/Roadmap/RoadmapPage';
import { LevelPage } from '../pages/Level/LevelPage';
import { MissionPage } from '../pages/Mission/MissionPage';
import { LessonPage } from '../pages/Lesson/LessonPage';
import { ChallengePage } from '../pages/Challenge/ChallengePage';
import { CheckpointPage } from '../pages/Checkpoint/CheckpointPage';
import { BossTestPage } from '../pages/BossTest/BossTestPage';
import { ResultPage } from '../pages/Result/ResultPage';
import { ProfilePage } from '../pages/Profile/ProfilePage';
import { LoginPage } from '../pages/Login/LoginPage';
import { OnboardingPage } from '../pages/Onboarding/OnboardingPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAuthLoading } = useLearning();

  if (isAuthLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: '#64748B' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid #E2E8F0',
              borderTopColor: '#2563EB',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Authenticating session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Root launches directly to Login Page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Standalone Authentication & Onboarding Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Primary Application Shell Routes (Protected) */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/domains" element={<DomainSelectionPage />} />
          <Route path="/domain/:domainId" element={<RoadmapPage />} />
          <Route path="/level/:levelId" element={<LevelPage />} />
          <Route path="/mission/:missionId" element={<MissionPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/challenge/:challengeId" element={<ChallengePage />} />
          <Route path="/checkpoint/:checkpointId" element={<CheckpointPage />} />
          <Route path="/boss/:bossId" element={<BossTestPage />} />
          <Route path="/result/:attemptId" element={<ResultPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};
