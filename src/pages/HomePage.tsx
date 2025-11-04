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
  const { data: albums, isLoading: albumsLoading, error: albumsError } = useAlbums(1, 6);
  
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
            ⚠️ Error al conectar con el backend MongoDB. 
            <br />Verifica que tu API en Render esté funcionando.
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
                color: '#6c757d',
                animation: 'pulse 2s infinite'
              }}>
                📀 Cargando álbum...
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
                  src={album.cover_image || `https://via.placeholder.com/300x300?text=${encodeURIComponent(album.title)}`} 
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
                      {formatRating(album.average_rating)}/10 
                      <span style={{ opacity: 0.7 }}>
                        ({album.total_ratings || 0} reseña{(album.total_ratings || 0) !== 1 ? 's' : ''})
                      </span>
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
        
        {!albumsLoading && (!albums || albums.length === 0) && !albumsError && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
          }}>
            📀 No hay álbumes disponibles. 
            <br />¿Ejecutaste el seed en tu backend?
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
          marginBottom: '1.5rem',
          color: '#1a1a1a'
        }}>
          Actividad Reciente
        </h2>
        
        {reviewsLoading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#dee2e6',
                  borderRadius: '50%'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    height: '1rem',
                    backgroundColor: '#dee2e6',
                    borderRadius: '4px',
                    marginBottom: '0.5rem'
                  }} />
                  <div style={{
                    height: '0.75rem',
                    backgroundColor: '#e9ecef',
                    borderRadius: '4px',
                    width: '70%'
                  }} />
                </div>
              </div>
            ))}
          </div>
        ) : recentReviews && recentReviews.length > 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {recentReviews.map((review) => (
              <div key={review._id} style={{
                padding: '1.25rem',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#007bff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e9ecef';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <img 
                    src={review.avatar_url || `https://via.placeholder.com/40x40?text=${(review.username || 'U').charAt(0).toUpperCase()}`} 
                    alt={review.username || 'Usuario'}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #dee2e6'
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/40x40?text=${(review.username || 'U').charAt(0).toUpperCase()}`;
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <strong style={{ color: '#1a1a1a' }}>
                        {review.profile_name || review.username}
                      </strong>
                      <span style={{ color: '#666' }}>reseñó</span>
                      <strong 
                        style={{ 
                          color: '#007bff', 
                          cursor: 'pointer',
                          textDecoration: 'none'
                        }}
                        onClick={() => navigate(`/album/${review.album_id}`)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                      >
                        "{review.album_title}"
                      </strong>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginTop: '0.25rem'
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          style={{ 
                            color: i < Math.floor(review.rating / 2) ? '#ffc107' : '#dee2e6',
                            fontSize: '1rem'
                          }}
                        >
                          ★
                        </span>
                      ))}
                      <span style={{ color: '#888', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                        {review.rating}/10
                      </span>
                      <span style={{ color: '#ccc', fontSize: '0.8rem', marginLeft: 'auto' }}>
                        {new Date(review.created_at).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{
                  marginLeft: '3rem',
                  paddingLeft: '1rem',
                  borderLeft: '3px solid #007bff'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '0.5rem'
                  }}>
                    {review.title}
                  </h4>
                  <p style={{
                    color: '#666',
                    fontSize: '0.95rem',
                    lineHeight: '1.4',
                    margin: 0
                  }}>
                    {review.content.length > 150 
                      ? review.content.substring(0, 150) + '...' 
                      : review.content
                    }
                  </p>
                </div>
              </div>
            ))}
            <button
              onClick={() => navigate('/charts')}
              style={{
                alignSelf: 'center',
                padding: '0.75rem 2rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500',
                marginTop: '1.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0056b3';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#007bff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Ver todas las reseñas →
            </button>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            🎵 No hay reseñas recientes. 
            <br />¡Sé el primero en escribir una!
          </div>
        )}
        
        {!albumsLoading && (!albums || albums.length === 0) && !albumsError && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px'
          }}>
            📀 No hay álbumes disponibles en MongoDB. 
            <br />¿Ejecutaste <code>npm run seed-db</code> en tu backend?
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;