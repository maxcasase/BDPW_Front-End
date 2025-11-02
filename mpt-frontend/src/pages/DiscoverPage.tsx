// /src/pages/DiscoverPage.tsx

import React from 'react';
import { FeatureCard } from '../components/ui/FeatureCard';

// --- Estilos (podemos reutilizar los mismos) ---
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

const DiscoverPage = () => {
  return (
    <div style={pageContainerStyle}>
      <h1 style={headerStyle}>Descubrir Música</h1>
      <p style={subheaderStyle}>
        Explora nuevos artistas, álbumes y géneros musicales
      </p>

      <div style={gridStyle}>
        <FeatureCard
          title="Búsqueda Avanzada"
          description="Encuentra música por género, año, artista y más"
          buttonText="Buscar Música"
          to="/search"
        />
        <FeatureCard
          title="Recomendaciones"
          description="Descubre música basada en tus gustos"
          buttonText="Ver Recomendaciones"
          to="/recommendations"
        />
        <FeatureCard
          title="Géneros Populares"
          description="Explora los géneros más escuchados"
          buttonText="Explorar Géneros"
          to="/genres"
        />
      </div>
    </div>
  );
};

export default DiscoverPage;