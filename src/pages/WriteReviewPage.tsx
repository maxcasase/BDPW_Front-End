// /src/pages/WriteReviewPage.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlbum } from '../hooks/useAlbums';
import { useCreateReview, useUserAlbumReview } from '../hooks/useReviews';
import { useAuthStore } from '../store/auth.store';
import type { CreateReviewRequest } from '../interfaces/api';

const WriteReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: ''
  });

  const [error, setError] = useState<string | null>(null);

  // Estado de autenticación
  const user = useAuthStore((state: any) => state.user);
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  // Cargar datos del álbum
  const { data: album, isLoading: albumLoading, error: albumError } = useAlbum(id!);

  // Verificar si ya existe reseña del usuario
  const { data: existingReview } = useUserAlbumReview(user?._id, id!);

  // Hook para crear reseña
  const createReviewMutation = useCreateReview();

  // Redirigir si no está autenticado
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Si ya tiene una reseña, redirigir al álbum
    if (existingReview) {
      navigate(`/album/${id}`);
      return;
    }
  }, [isAuthenticated, existingReview, navigate, id]);

  const validateForm = () => {
    if (formData.rating === 0) {
      setError('Debes seleccionar una calificación');
      return false;
    }
    if (formData.title.trim().length < 3) {
      setError('El título debe tener al menos 3 caracteres');
      return false;
    }
    if (formData.content.trim().length < 10) {
      setError('La reseña debe tener al menos 10 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm() || !id) {
      return;
    }

    try {
      const reviewData: CreateReviewRequest = {
        album_id: id,
        rating: formData.rating,
        title: formData.title.trim(),
        content: formData.content.trim()
      };

      await createReviewMutation.mutateAsync(reviewData);
      
      // Redirigir al álbum con éxito
      navigate(`/album/${id}`);
    } catch (err: any) {
      console.error('Error al crear reseña:', err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message?.includes('already reviewed')) {
        setError('Ya has escrito una reseña para este álbum');
      } else {
        setError('Error al publicar la reseña. Inténtalo de nuevo.');
      }
    }
  };

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
            No se puede escribir una reseña para un álbum que no existe.
          </p>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#646cff',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Volver al Inicio
          </button>
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
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <h1 style={{ color: 'white', marginBottom: '2rem' }}>
          Escribe tu reseña
        </h1>

        {/* Info del Álbum */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #333',
          marginBottom: '2rem'
        }}>
          <img 
            src={album.cover_image || `https://via.placeholder.com/80x80?text=${encodeURIComponent(album.title)}`}
            alt={album.title}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '4px',
              objectFit: 'cover'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/80x80?text=${encodeURIComponent(album.title)}`;
            }}
          />
          <div>
            <h3 style={{ color: 'white', margin: 0, marginBottom: '0.25rem' }}>
              {album.title}
            </h3>
            <p style={{ color: '#888', margin: 0, marginBottom: '0.25rem' }}>
              {album.artist_name || 'Artista desconocido'}
            </p>
            <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>
              {album.release_year} • {album.genre_name || 'Género desconocido'}
            </p>
          </div>
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #c82333'
          }}>
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Calificación */}
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #333',
            marginBottom: '1rem'
          }}>
            <label style={{
              display: 'block',
              color: 'white',
              marginBottom: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Tu calificación *
            </label>
            
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              marginBottom: '0.5rem',
              flexWrap: 'wrap'
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating })}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    border: formData.rating >= rating ? '2px solid #ffd700' : '1px solid #333',
                    backgroundColor: formData.rating >= rating ? '#ffd70033' : '#2a2a2a',
                    color: formData.rating >= rating ? '#ffd700' : '#666',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (formData.rating < rating) {
                      e.currentTarget.style.borderColor = '#ffd700';
                      e.currentTarget.style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.rating < rating) {
                      e.currentTarget.style.borderColor = '#333';
                      e.currentTarget.style.color = '#666';
                    }
                  }}
                >
                  {rating}
                </button>
              ))}
            </div>
            
            {formData.rating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#ffd700', fontSize: '1.1rem' }}>★</span>
                <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
                  {formData.rating}/10 - 
                  {formData.rating >= 9 ? ' ¡Obra maestra!' :
                   formData.rating >= 7 ? ' Muy bueno' :
                   formData.rating >= 5 ? ' Decente' :
                   formData.rating >= 3 ? ' Flojo' : ' Malo'}
                </p>
              </div>
            )}
          </div>

          {/* Título de la Reseña */}
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #333',
            marginBottom: '1rem'
          }}>
            <label style={{
              display: 'block',
              color: 'white',
              marginBottom: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Título de tu reseña *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Resume tu opinión en una línea..."
              maxLength={100}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#2a2a2a',
                color: 'white',
                fontSize: '1rem'
              }}
            />
            <p style={{ 
              color: '#888', 
              fontSize: '0.85rem', 
              marginTop: '0.5rem',
              marginBottom: 0
            }}>
              {formData.title.length}/100 caracteres (mínimo 3)
            </p>
          </div>

          {/* Contenido de la Reseña */}
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #333',
            marginBottom: '2rem'
          }}>
            <label style={{
              display: 'block',
              color: 'white',
              marginBottom: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Tu reseña *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              maxLength={2000}
              placeholder="Comparte tu opinión sobre este álbum. ¿Qué te gustó? ¿Qué no te gustó? ¿A quién se lo recomendarías?

Habla sobre:
- Las canciones que más te llamaron la atención
- La producción y calidad del sonido
- El estilo y género musical
- Cómo se compara con otros trabajos del artista
- Tu experiencia personal al escucharlo"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#2a2a2a',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical',
                lineHeight: '1.5'
              }}
            />
            <p style={{ 
              color: '#888', 
              fontSize: '0.85rem', 
              marginTop: '0.5rem',
              marginBottom: 0
            }}>
              {formData.content.length}/2000 caracteres (mínimo 10)
            </p>
          </div>

          {/* Botones */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={() => navigate(`/album/${id}`)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: 'transparent',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createReviewMutation.isPending || formData.rating === 0 || formData.title.trim().length < 3 || formData.content.trim().length < 10}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: (formData.rating > 0 && formData.title.trim().length >= 3 && formData.content.trim().length >= 10) ? '#646cff' : '#333',
                color: 'white',
                cursor: (formData.rating > 0 && formData.title.trim().length >= 3 && formData.content.trim().length >= 10) && !createReviewMutation.isPending ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: 'bold',
                opacity: createReviewMutation.isPending ? 0.7 : 1
              }}
            >
              {createReviewMutation.isPending ? 'Publicando...' : 'Publicar Reseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewPage;