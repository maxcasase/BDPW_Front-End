// /src/pages/ChartsPage.tsx

import React from 'react';
import { FeatureCard } from '../components/ui/FeatureCard';

// --- Estilos para la página ---
const pageContainerStyle: React.CSSProperties = {
  textAlign: 'center',
};

const headerStyle: React.CSSProperties = {
  marginBottom: '1rem',
  fontSize: '2.5rem',
};

const subheaderStyle: React.CSSProperties = {
  marginBottom: '3rem',
  fontSize: '1.25rem',
  color: '#555',
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  flexWrap: 'wrap',
};
// --- Fin de Estilos ---

const ChartsPage = () => {
  return (
    <div style={pageContainerStyle}>
      <h1 style={headerStyle}>Charts Musicales</h1>
      <p style={subheaderStyle}>
        Los álbumes y canciones más populares según nuestra comunidad
      </p>

      <div style={gridStyle}>
        <FeatureCard
          title="Top 100 Álbumes"
          description="Los álbumes mejor calificados de todos los tiempos"
          buttonText="Ver Rankings"
          to="/charts/top-100"
        />
        <FeatureCard
          title="Tendencias del Mes"
          description="Lo más escuchado este mes"
          buttonText="Ver Tendencias"
          to="/charts/trending"
        />
        <FeatureCard
          title="Charts por Género"
          description="Rankings específicos por género musical"
          buttonText="Explorar por Género"
          to="/genres"
        />
      </div>
    </div>
  );
};

export default ChartsPage;