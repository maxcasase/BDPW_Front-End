// /src/pages/WriteReviewPage.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { createReview } from '../api/reviewsApi';

const WriteReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Datos del álbum (simulados - en el futuro se cargarían de la API)
  const album = {
    id: id,
    titulo: 'Abbey Road',
    artista: 'The Beatles',
    portada_url: 'https://via.placeholder.com/150'
  };

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

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Llamada real a la API
      const reviewData = {
        album_id: parseInt(id || '1'),
        rating: formData.rating,
        title: formData.title.trim(),
        content: formData.content.trim()
      };

      console.log('Enviando reseña:', reviewData);
      const response = await createReview(reviewData);
      console.log('¡Reseña creada!', response);
      
      // Redirigir al álbum
      navigate(`/album/${id}`);
    } catch (err: any) {
      console.error('Error al crear reseña:', err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al publicar la reseña. Inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
            src={album.portada_url}
            alt={album.titulo}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '4px'
            }}
          />
          <div>
            <h3 style={{ color: 'white', margin: 0, marginBottom: '0.25rem' }}>
              {album.titulo}
            </h3>
            <p style={{ color: '#888', margin: 0 }}>
              {album.artista}
            </p>
          </div>
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#ff4444',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '1rem'
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
              marginBottom: '0.5rem'
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
                >
                  {rating}
                </button>
              ))}
            </div>
            
            {formData.rating > 0 && (
              <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
                {formData.rating >= 9 ? '¡Obra maestra!' :
                 formData.rating >= 7 ? 'Muy bueno' :
                 formData.rating >= 5 ? 'Decente' :
                 formData.rating >= 3 ? 'Flojo' : 'Malo'}
              </p>
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
              placeholder="Comparte tu opinión sobre este álbum. ¿Qué te gustó? ¿Qué no te gustó? ¿A quién se lo recomendarías?"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#2a2a2a',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <p style={{ 
              color: '#888', 
              fontSize: '0.85rem', 
              marginTop: '0.5rem',
              marginBottom: 0
            }}>
              {formData.content.length} caracteres (mínimo 10)
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
              disabled={isSubmitting || formData.rating === 0 || formData.title.trim().length < 3 || formData.content.trim().length < 10}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: (formData.rating > 0 && formData.title.trim().length >= 3 && formData.content.trim().length >= 10) ? '#646cff' : '#333',
                color: 'white',
                cursor: (formData.rating > 0 && formData.title.trim().length >= 3 && formData.content.trim().length >= 10) ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Reseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewPage;