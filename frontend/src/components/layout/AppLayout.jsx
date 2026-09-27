import React, { useState, useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { SidebarNav } from './SidebarNav';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && sidebarOpen) closeSidebar();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [sidebarOpen, closeSidebar]);

  return (
    <div className="bg-game-atmosphere" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNav onMenuClick={openSidebar} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(2px)',
            zIndex: 90,
            transition: 'opacity 0.25s ease',
          }}
        />
      )}

      <SidebarNav isOpen={sidebarOpen} onClose={closeSidebar} />

      <main
        style={{
          flex: 1,
          padding: '28px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
