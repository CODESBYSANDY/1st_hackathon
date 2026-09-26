import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { SidebarNav } from './SidebarNav';

export const AppLayout = () => {
  return (
    <div className="bg-game-atmosphere" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <SidebarNav />
        <main
          style={{
            flex: 1,
            padding: '32px 36px',
            maxWidth: '1360px',
            margin: '0 auto',
            width: '100%',
            overflowY: 'auto'
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
