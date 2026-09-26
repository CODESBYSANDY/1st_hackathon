import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LearningProvider } from './context/LearningContext';
import { LynxProvider } from './context/LynxContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <LearningProvider>
        <LynxProvider>
          <AppRoutes />
        </LynxProvider>
      </LearningProvider>
    </BrowserRouter>
  );
}

export default App;
