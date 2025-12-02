// /src/pages/AlbumDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaEdit, FaClock, FaTrash } from 'react-icons/fa';
import { getReviewsByAlbum, deleteReview, type IReview } from '../api/reviewsApi';

// Mock de álbumes destacados (los mismos 3 que usas en HomePage)
const mockAlbums = [
  {
    id: 1,
    titulo: 'Abbey Road',
    artista: 'The Beatles',
    fecha_lanzamiento: '1969-09-26',
    genero_principal: 'Rock',
    duracion_total: 2869,
    portada_url:
      'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg',
    descripcion:
      'Undécimo álbum de estudio de The Beatles, considerado uno de los mejores álbumes de todos los tiempos.',
    sello_discografico: 'Apple Records',
    canciones: [
      { numero_pista: 1, titulo: 'Come Together', duracion: 259 },
      { numero_pista: 2, titulo: 'Something', duracion: 182 },
      { numero_pista: 3, titulo: "Maxwell's Silver Hammer", duracion: 207 },
      { numero_pista: 4, titulo: 'Oh! Darling', duracion: 206 },
      { numero_pista: 5, titulo: "Octopus's Garden", duracion: 171 },
    ],
  },
  {
    id: 2,
    titulo: 'The Dark Side of the Moon',
    artista: 'Pink Floyd',
    fecha_lanzamiento: '1973-03-01',
    genero_principal: 'Rock Progresivo',
    duracion_total: 2580,
    portada_url:
      'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png',
    descripcion: 'Álbum icónico de Pink Floyd.',
    sello_discografico: 'Harvest Records',
    canciones: [
      { numero_pista: 1, titulo: 'Speak to Me', duracion: 90 },
      { numero_pista: 2, titulo: 'Breathe', duracion: 163 },
      { numero_pista: 3, titulo: 'Time', duracion: 414 },
    ],
  },
  {
    id: 3,
    titulo: 'Thriller',
    artista: 'Michael Jackson',
    fecha_lanzamiento: '1982-11-30',
    genero_principal: 'Pop',
    duracion_total: 2580,
    portada_url:
      'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png',
    descripcion: 'Uno de los álbumes más vendidos de la historia.',
    sello_discografico: 'Epic',
    canciones: [
      { numero_pista: 1, titulo: 'Wanna Be Startin’ Somethin’', duracion: 362 },
      { numero_pista: 2, titulo: 'Thriller', duracion: 358 },
      { numero_pista: 3, titulo: 'Beat It', duracion: 258 },
    ],
  },
];

const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [userRating, setUserRating] = useState<number>(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  const numericId = id ? parseInt(id, 10) : 0;
  const album = mockAlbums.find((a) => a.id === numericId) || mockAlbums[0];

  // Obtener usuario actual del token (simplificado)
  const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { id: String(payload.id) };
    } catch {
      return null;
    }
  };

  const currentUser = getCurrentUser();

  // Cargar reviews al montar el componente
  useEffect(() => {
    const loadReviews = async () => {
      if (!numericId) return;

      try {
        setLoadingReviews(true);
        const response = await getReviewsByAlbum(numericId);
        setReviews(response.reviews);
      } catch (error) {
        console.error('Error cargando reviews:', error);
      } finally {
        setLoadingReviews(false);
      }
    };

    loadReviews();
  }, [numericId]);

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
      return;
    }

    try {
      setDeletingReviewId(reviewId);
      await deleteReview(reviewId);
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
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

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    setShowReviewForm(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Verificar si el usuario actual ya hizo una review
  const userReview = currentUser
    ? reviews.find(
        (review) => review.user_id && review.user_id._id === currentUser.id
      )
    : null;

  return (
    <div
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#2a2a2a',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
        }}
      >
        {/* Header del Álbum */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Portada */}
          <div>
            <img
              src={album.portada_url}
              alt={album.titulo}
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* Información del Álbum */}
          <div>
            <p
              style={{
                color: '#888',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
              }}
            >
              {album.genero_principal}
            </p>
            <h1
              style={{
                color: 'white',
                fontSize: '3rem',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
              }}
            >
              {album.titulo}
            </h1>
            <h2
              style={{
                color: '#b0b0b0',
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                fontWeight: 'normal',
              }}
            >
              {album.artista}
            </h2>

            <div
              style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '1.5rem',
                color: '#888',
                fontSize: '0.9rem',
              }}
            >
              <span>📅 {new Date(album.fecha_lanzamiento).getFullYear()}</span>
              <span>
                <FaClock style={{ marginRight: '0.5rem' }} />
                {formatTotalDuration(album.duracion_total)}
              </span>
              <span>🏢 {album.sello_discografico}</span>
            </div>

            {/* Calificación Promedio */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#ffd700',
                    lineHeight: 1,
                  }}
                >
                  {reviews.length > 0
                    ? (
                        reviews.reduce((sum, r) => sum + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : '0.0'}
                </div>
                <div
                  style={{ color: '#888', fontSize: '0.85rem' }}
                >{`${reviews.length} reseñas`}</div>
              </div>

              {/* Botón de escribir reseña */}
              <div style={{ flex: 1, textAlign: 'right' }}>
                {currentUser ? (
                  userReview ? (
                    <div style={{ color: '#888' }}>
                      Ya escribiste una reseña
                    </div>
                  ) : (
                    <Link
                      to={`/album/${numericId}/review`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#646cff',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
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
                      textDecoration: 'none',
                    }}
                  >
                    Inicia sesión para reseñar
                  </Link>
                )}
              </div>
            </div>

            <p style={{ color: '#b0b0b0', lineHeight: 1.6 }}>
              {album.descripcion}
            </p>
          </div>
        </div>

        {/* Lista de Canciones */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Canciones</h2>
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333',
            }}
          >
            {album.canciones.map((cancion, index) => (
              <div
                key={cancion.numero_pista}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 80px',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderBottom:
                    index < album.canciones.length - 1
                      ? '1px solid #333'
                      : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#2a2a2a')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
              >
                <span style={{ color: '#888', textAlign: 'center' }}>
                  {cancion.numero_pista}
                </span>
                <span style={{ color: 'white' }}>{cancion.titulo}</span>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                  {formatDuration(cancion.duracion)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Reseñas */}
        <section>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>
            Reseñas de la Comunidad
          </h2>

          {loadingReviews ? (
            <div
              style={{
                backgroundColor: '#1a1a1a',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #333',
                textAlign: 'center',
              }}
            >
              <p style={{ color: '#888' }}>Cargando reseñas...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div
              style={{
                backgroundColor: '#1a1a1a',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #333',
                textAlign: 'center',
              }}
            >
              <p style={{ color: '#888', marginBottom: '1rem' }}>
                Aún no hay reseñas para este álbum.
              </p>
              {currentUser && (
                <Link
                  to={`/album/${numericId}/review`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#646cff',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  <FaEdit /> ¡Sé el primero en reseñar!
                </Link>
              )}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {reviews.map((review) => {
                const displayName =
                  review.user_id?.profile_name ||
                  review.user_id?.username ||
                  'Usuario desconocido';
                const createdAt =
                  review.created_at || (review as any).createdAt;

                const isOwner =
                  currentUser &&
                  review.user_id &&
                  review.user_id._id === currentUser.id;

                return (
                  <div
                    key={review._id}
                    style={{
                      backgroundColor: '#1a1a1a',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: '1px solid #333',
                    }}
                  >
                    {/* Header de la reseña */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#646cff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        >
                          {displayName[0].toUpperCase()}
                        </div>
                        <div>
                          <div
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            {displayName}
                          </div>
                          <div
                            style={{
                              color: '#888',
                              fontSize: '0.85rem',
                            }}
                          >
                            {createdAt ? formatDate(createdAt) : ''}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        {/* Rating */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#ffd70033',
                            borderRadius: '20px',
                            border: '1px solid #ffd700',
                          }}
                        >
                          <FaStar color="#ffd700" size={12} />
                          <span
                            style={{
                              color: '#ffd700',
                              fontWeight: 'bold',
                            }}
                          >
                            {review.rating}/10
                          </span>
                        </div>

                        {/* Botón eliminar (solo para el autor) */}
                        {isOwner && (
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            disabled={deletingReviewId === review._id}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '4px',
                              border: '1px solid #ff4444',
                              backgroundColor: 'transparent',
                              color: '#ff4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {deletingReviewId === review._id ? (
                              '...'
                            ) : (
                              <FaTrash size={12} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Título de la reseña */}
                    {review.title && (
                      <h3
                        style={{
                          color: 'white',
                          marginBottom: '0.75rem',
                          fontSize: '1.2rem',
                        }}
                      >
                        {review.title}
                      </h3>
                    )}

                    {/* Contenido */}
                    <p
                      style={{
                        color: '#b0b0b0',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {review.content}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AlbumDetailPage;
