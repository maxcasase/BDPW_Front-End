// /src/pages/HomePage.tsx

import React from 'react';
import { FeatureCard } from '../components/ui/FeatureCard';

const HomePage = () => {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '3rem 0',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '1rem'
        }}>
          Página de Inicio
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#555',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Bienvenido a MPT - Música Para Todos. 
          Aquí verás la actividad reciente de tus amigos y recomendaciones.
        </p>
      </section>

      {/* Features Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        <FeatureCard
          title="Descubre Nueva Música"
          description="Explora álbumes, artistas y géneros de todo el mundo"
          buttonText="Explorar"
          to="/discover"
        />
        <FeatureCard
          title="Ve los Charts"
          description="Los álbumes y canciones más populares del momento"
          buttonText="Ver Rankings"
          to="/charts"
        />
        <FeatureCard
          title="Busca tu Música"
          description="Encuentra exactamente lo que estás buscando"
          buttonText="Buscar"
          to="/search"
        />
      </section>

      {/* Activity Section Placeholder */}
      <section style={{
        marginTop: '4rem',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          marginBottom: '1rem',
          color: '#1a1a1a'
        }}>
          Actividad Reciente
        </h2>
        <p style={{ color: '#777' }}>
          Aquí aparecerá la actividad de tus amigos (próximamente...)
        </p>
      </section>
    </div>
  );
};

export default HomePage;