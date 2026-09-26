import React from 'react';
import { useParams } from 'react-router-dom';
import { MissionPage } from '../Mission/MissionPage';

// LessonPage seamlessly renders generic lesson/mission experiences
export const LessonPage = () => {
  return <MissionPage />;
};
