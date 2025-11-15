import React from 'react';
import { FeatureCard } from '../components/ui/FeatureCard';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { useAlbums } from '../hooks/useAlbums';
import type { Album } from '../interfaces/api';

const HomePage = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const navigate = useNavigate();

  // Usa datos reales desde el backend
  const { data: albums, isLoading, error } = useAlbums(1, 6);

  const handleViewAlbum = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  const handleWriteReview = (albumId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/album/${albumId}/review`);
  };

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

      {/* Featured Albums Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          Álbumes Destacados
        </h2>
        {isLoading ? (
          <div>Cargando álbumes…</div>
        ) : error ? (
          <div style={{ color: 'red' }}>Ocurrió un error al cargar los álbumes.</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {(albums || []).map((album: Album) => (
              <div key={album._id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
              }}>
                <img 
                  src={album.cover_image || 'https://via.placeholder.com/300x300?text=No+Cover'} 
                  alt={album.title}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleViewAlbum(album._id)}
                />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: '#1a1a1a',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleViewAlbum(album._id)}>
                    {album.title}
                  </h3>
                  <p style={{
                    color: '#666',
                    marginBottom: '0.5rem'
                  }}>
                    {album.artist_name || album.artist_id} • {album.release_year}
                  </p>
                  <p style={{
                    color: '#888',
                    fontSize: '0.9rem',
                    marginBottom: '1rem'
                  }}>
                    Rating: {album.average_rating ?? 0}/10
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => handleViewAlbum(album._id)}
                      style={{
                        flex: '1',
                        minWidth: '120px',
                        padding: '0.75rem 1rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0056b3';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#007bff';
                      }}
                    >
                      Ver Álbum
                    </button>
                    <button
                      onClick={() => handleWriteReview(album._id)}
                      style={{
                        flex: '1',
                        minWidth: '120px',
                        padding: '0.75rem 1rem',
                        backgroundColor: isAuthenticated ? '#28a745' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isAuthenticated ? '#1e7e34' : '#5a6268';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isAuthenticated ? '#28a745' : '#6c757d';
                      }}
                    >
                      {isAuthenticated ? 'Escribir Reseña' : 'Inicia Sesión'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
