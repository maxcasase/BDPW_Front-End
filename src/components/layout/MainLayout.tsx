// /src/components/layout/MainLayout.tsx

import React from 'react';
import { Navbar } from './Navbar'; // Importamos el Navbar

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const mainStyle: React.CSSProperties = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  return (
    <div>
      <Navbar />
      <main style={mainStyle}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;