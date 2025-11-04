// /src/pages/HomePage.tsx

import React from 'react';
import { FeatureCard } from '../components/ui/FeatureCard';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { useAlbums } from '../hooks/useAlbums';
import { useRecentReviews } from '../hooks/useReviews';
import type { Album } from '../interfaces/api';

const HomePage = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const navigate = useNavigate();
  
  // Cargar álbumes destacados (primeros 6)
  const { data: albums, isLoading: albumsLoading, error: albumsError } = useAlbums({ page: 1, limit: 6 });
  
  // Cargar reseñas recientes para actividad
  const { data: recentReviews, isLoading: reviewsLoading } = useRecentReviews(5);

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

  const formatRating = (rating?: number) => {
    return rating ? rating.toFixed(1) : '0.0';
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
          Música Para Todos
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#555',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Descubre, reseña y comparte tu música favorita. 
          Únete a la comunidad musical más activa.
        </p>
      </section>

      {/* Featured Albums Section */}
      <section style={{
        marginBottom: '4rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          Álbumes Destacados
        </h2>
        
        {albumsError && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            Error al cargar álbumes. Verifica que el backend esté funcionando.
          </div>
        )}
        
        {albumsLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6c757d'
              }}>
                Cargando...
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {albums?.map((album: Album) => (
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
                  src={album.cover_image || 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(album.title)} 
                  alt={album.title}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleViewAlbum(album._id)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(album.title)}`;
                  }}
                />
                <div style={{
                  padding: '1.5rem'
                }}>
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
                    {album.artist_name || 'Artista desconocido'} • {album.release_year}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      color: '#ffc107',
                      fontSize: '1.1rem'
                    }}>
                      ★
                    </span>
                    <span style={{
                      color: '#888',
                      fontSize: '0.9rem'
                    }}>
                      {formatRating(album.average_rating)}/10 ({album.total_ratings || 0} reseñas)
                    </span>
                  </div>
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
            )) || []}
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

      {/* Activity Section - Reseñas Recientes */}
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
        
        {reviewsLoading ? (
          <p style={{ color: '#777' }}>Cargando actividad reciente...</p>
        ) : recentReviews && recentReviews.length > 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {recentReviews.map((review) => (
              <div key={review._id} style={{
                padding: '1rem',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <img 
                    src={review.avatar_url || 'https://via.placeholder.com/40x40?text=U'} 
                    alt={review.username || 'Usuario'}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <strong style={{ color: '#1a1a1a' }}>
                      {review.profile_name || review.username}
                    </strong>
                    <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                      reseñó "{review.album_title}"
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginTop: '0.25rem'
                    }}>
                      {[...Array(Math.floor(review.rating))].map((_, i) => (
                        <span key={i} style={{ color: '#ffc107' }}>★</span>
                      ))}
                      <span style={{ color: '#888', fontSize: '0.9rem', marginLeft: '0.25rem' }}>
                        {review.rating}/10
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{
                  color: '#666',
                  fontSize: '0.95rem',
                  lineHeight: '1.4',
                  margin: '0.5rem 0 0 0'
                }}>
                  "{review.title}" - {review.content.length > 100 
                    ? review.content.substring(0, 100) + '...' 
                    : review.content
                  }
                </p>
              </div>
            ))}
            <button
              onClick={() => navigate('/charts')}
              style={{
                alignSelf: 'center',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginTop: '1rem'
              }}
            >
              Ver todas las reseñas
            </button>
          </div>
        ) : (
          <p style={{ color: '#777' }}>
            No hay reseñas recientes. ¡Sé el primero en escribir una!
          </p>
        )}
      </section>
    </div>
  );
};

export default HomePage;