// /src/pages/WriteReviewPage.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const WriteReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    puntuacion: 0,
    titulo: '',
    contenido: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Datos del álbum (simulados)
  const album = {
    id: id,
    titulo: 'Abbey Road',
    artista: 'The Beatles',
    portada_url: 'https://via.placeholder.com/150'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.puntuacion === 0) {
      setError('Debes seleccionar una calificación');
      return;
    }

    if (!formData.contenido.trim()) {
      setError('Debes escribir el contenido de tu reseña');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // TODO: Llamada a la API
      console.log('Enviando reseña:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirigir al álbum
      navigate(`/album/${id}`);
    } catch (err) {
      setError('Error al publicar la reseña');
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
                  onClick={() => setFormData({ ...formData, puntuacion: rating })}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    border: formData.puntuacion >= rating ? '2px solid #ffd700' : '1px solid #333',
                    backgroundColor: formData.puntuacion >= rating ? '#ffd70033' : '#2a2a2a',
                    color: formData.puntuacion >= rating ? '#ffd700' : '#666',
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
            
            {formData.puntuacion > 0 && (
              <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
                {formData.puntuacion >= 9 ? '¡Obra maestra!' :
                 formData.puntuacion >= 7 ? 'Muy bueno' :
                 formData.puntuacion >= 5 ? 'Decente' :
                 formData.puntuacion >= 3 ? 'Flojo' : 'Malo'}
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
              Título de tu reseña (opcional)
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
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
              value={formData.contenido}
              onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
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
              {formData.contenido.length} caracteres
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
              disabled={isSubmitting || formData.puntuacion === 0 || !formData.contenido.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: (formData.puntuacion > 0 && formData.contenido.trim()) ? '#646cff' : '#333',
                color: 'white',
                cursor: (formData.puntuacion > 0 && formData.contenido.trim()) ? 'pointer' : 'not-allowed',
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
