// /src/pages/AlbumDetailPage.tsx

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaEdit, FaPlay, FaClock, FaTrash } from 'react-icons/fa';
import { useAlbum } from '../hooks/useAlbums';
import { useAlbumReviews, useDeleteReview } from '../hooks/useReviews';
import { useAuthStore } from '../store/auth.store';
import type { Review } from '../interfaces/api';

const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  
  // Estado de autenticación
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const user = useAuthStore((state: any) => state.user);
  
  // Cargar datos del álbum
  const { data: album, isLoading: albumLoading, error: albumError } = useAlbum(id!);
  
  // Cargar reseñas del álbum
  const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useAlbumReviews(id!, { page: 1, limit: 20 });
  
  // Hook para eliminar reseña
  const deleteReviewMutation = useDeleteReview();

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
      return;
    }

    try {
      setDeletingReviewId(reviewId);
      await deleteReviewMutation.mutateAsync(reviewId);
    } catch (error: any) {
      console.error('Error eliminando review:', error);
      alert('Error al eliminar la reseña');
    } finally {
      setDeletingReviewId(null);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTotalDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRating = (rating?: number) => {
    return rating ? rating.toFixed(1) : '0.0';
  };

  // Verificar si el usuario actual ya hizo una review
  const userReview = user && reviews ? 
    reviews.find((review: Review) => review.user_id === user._id) : null;

  // Loading state
  if (albumLoading) {
    return (
      <div style={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>
          Cargando álbum...
        </div>
      </div>
    );
  }

  // Error state
  if (albumError || !album) {
    return (
      <div style={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', marginBottom: '1rem' }}>
            Álbum no encontrado
          </h1>
          <p style={{ color: '#888', marginBottom: '2rem' }}>
            El álbum que buscas no existe o no está disponible.
          </p>
          <Link 
            to="/"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#646cff',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 80px)',
      backgroundColor: '#2a2a2a'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Header del Álbum */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Portada */}
          <div>
            <img 
              src={album.cover_image || `https://via.placeholder.com/300x300?text=${encodeURIComponent(album.title)}`}
              alt={album.title}
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(album.title)}`;
              }}
            />
          </div>

          {/* Información del Álbum */}
          <div>
            <p style={{ color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              {album.genre_name || 'Género desconocido'}
            </p>
            <h1 style={{ 
              color: 'white', 
              fontSize: '3rem', 
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              {album.title}
            </h1>
            <h2 style={{ 
              color: '#b0b0b0', 
              fontSize: '1.5rem', 
              marginBottom: '1.5rem',
              fontWeight: 'normal'
            }}>
              {album.artist_name || 'Artista desconocido'}
            </h2>

            <div style={{ 
              display: 'flex', 
              gap: '2rem', 
              marginBottom: '1.5rem',
              color: '#888',
              fontSize: '0.9rem'
            }}>
              <span>📅 {album.release_year}</span>
              {album.duration && (
                <span><FaClock style={{ marginRight: '0.5rem' }} />{formatTotalDuration(album.duration)}</span>
              )}
              {album.total_tracks && (
                <span>🎵 {album.total_tracks} canciones</span>
              )}
            </div>

            {/* Calificación Promedio */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <div>
                <div style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold', 
                  color: '#ffd700',
                  lineHeight: 1
                }}>
                  {formatRating(album.average_rating)}
                </div>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>
                  {album.total_ratings || 0} reseñas
                </div>
              </div>
              
              {/* Botón de escribir reseña */}
              <div style={{ flex: 1, textAlign: 'right' }}>
                {isAuthenticated ? (
                  userReview ? (
                    <div style={{ color: '#888' }}>Ya escribiste una reseña</div>
                  ) : (
                    <Link 
                      to={`/album/${id}/review`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#646cff',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      <FaEdit /> Escribir Reseña
                    </Link>
                  )
                ) : (
                  <Link 
                    to="/login"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#333',
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none'
                    }}
                  >
                    Inicia sesión para reseñar
                  </Link>
                )}
              </div>
            </div>

            {/* Información adicional de Discogs si está disponible */}
            {album.discogs_release_id && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333',
                marginBottom: '1.5rem'
              }}>
                <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
                  💵 ID Discogs: {album.discogs_release_id}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Reseñas */}
        <section>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>
            Reseñas de la Comunidad
          </h2>
          
          {reviewsError && (
            <div style={{
              backgroundColor: '#d32f2f',
              color: 'white',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              Error al cargar reseñas. Verifica la conexión.
            </div>
          )}
          
          {reviewsLoading ? (
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #333',
              textAlign: 'center'
            }}>
              <p style={{ color: '#888' }}>
                Cargando reseñas...
              </p>
            </div>
          ) : !reviews || reviews.length === 0 ? (
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #333',
              textAlign: 'center'
            }}>
              <p style={{ color: '#888', marginBottom: '1rem' }}>
                Aún no hay reseñas para este álbum.
              </p>
              {isAuthenticated && !userReview && (
                <Link 
                  to={`/album/${id}/review`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#646cff',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  <FaEdit /> ¡Sé el primero en reseñar!
                </Link>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reviews.map((review: Review) => (
                <div
                  key={review._id}
                  style={{
                    backgroundColor: '#1a1a1a',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #333'
                  }}
                >
                  {/* Header de la reseña */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: review.avatar_url ? 'transparent' : '#646cff',
                        backgroundImage: review.avatar_url ? `url(${review.avatar_url})` : 'none',
                        backgroundSize: 'cover',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {!review.avatar_url && (review.profile_name || review.username || 'U')[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{ color: 'white', fontWeight: 'bold' }}>
                          {review.profile_name || review.username || 'Usuario anónimo'}
                        </div>
                        <div style={{ color: '#888', fontSize: '0.85rem' }}>
                          {formatDate(review.created_at)}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {/* Rating */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#ffd70033',
                        borderRadius: '20px',
                        border: '1px solid #ffd700'
                      }}>
                        <FaStar color="#ffd700" size={12} />
                        <span style={{ color: '#ffd700', fontWeight: 'bold' }}>
                          {review.rating}/10
                        </span>
                      </div>
                      
                      {/* Botón eliminar (solo para el autor) */}
                      {user && user._id === review.user_id && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          disabled={deletingReviewId === review._id}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ff4444',
                            backgroundColor: 'transparent',
                            color: '#ff4444',
                            cursor: deletingReviewId === review._id ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {deletingReviewId === review._id ? '...' : <FaTrash size={12} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Título de la reseña */}
                  {review.title && (
                    <h3 style={{
                      color: 'white',
                      marginBottom: '0.75rem',
                      fontSize: '1.2rem'
                    }}>
                      {review.title}
                    </h3>
                  )}

                  {/* Contenido */}
                  <p style={{
                    color: '#b0b0b0',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {review.content}
                  </p>

                  {/* Likes/Dislikes si están disponibles */}
                  {(review.likes_count || review.dislikes_count) && (
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #333'
                    }}>
                      {review.likes_count > 0 && (
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>
                          👍 {review.likes_count}
                        </span>
                      )}
                      {review.dislikes_count > 0 && (
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>
                          👎 {review.dislikes_count}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AlbumDetailPage;