// /src/components/layout/MainLayout.tsx

import React from 'react';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <main style={{
        padding: '2rem',
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        flex: 1
      }}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;