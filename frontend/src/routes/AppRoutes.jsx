import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
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

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root launches directly to Login Page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Standalone Authentication & Onboarding Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Primary Application Shell Routes */}
      <Route element={<AppLayout />}>
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
  );
};
