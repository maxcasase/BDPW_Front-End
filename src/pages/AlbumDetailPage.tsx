// /src/pages/AlbumDetailPage.tsx

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaEdit, FaThumbsUp, FaThumbsDown, FaPlay, FaClock } from 'react-icons/fa';

const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [userRating, setUserRating] = useState<number>(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Datos simulados del álbum
  const album = {
    id: id,
    titulo: 'Abbey Road',
    artista: 'The Beatles',
    fecha_lanzamiento: '1969-09-26',
    genero_principal: 'Rock',
    duracion_total: 2869, // segundos
    portada_url: 'https://via.placeholder.com/300',
    descripcion: 'Undécimo álbum de estudio de The Beatles, considerado uno de los mejores álbumes de todos los tiempos.',
    sello_discografico: 'Apple Records',
    puntuacion_promedio: 9.2,
    total_resenas: 1247,
    canciones: [
      { numero_pista: 1, titulo: 'Come Together', duracion: 259 },
      { numero_pista: 2, titulo: 'Something', duracion: 182 },
      { numero_pista: 3, titulo: 'Maxwell\'s Silver Hammer', duracion: 207 },
      { numero_pista: 4, titulo: 'Oh! Darling', duracion: 206 },
      { numero_pista: 5, titulo: 'Octopus\'s Garden', duracion: 171 },
    ]
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
              src={album.portada_url}
              alt={album.titulo}
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
              }}
            />
          </div>

          {/* Información del Álbum */}
          <div>
            <p style={{ color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              {album.genero_principal}
            </p>
            <h1 style={{ 
              color: 'white', 
              fontSize: '3rem', 
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              {album.titulo}
            </h1>
            <h2 style={{ 
              color: '#b0b0b0', 
              fontSize: '1.5rem', 
              marginBottom: '1.5rem',
              fontWeight: 'normal'
            }}>
              {album.artista}
            </h2>

            <div style={{ 
              display: 'flex', 
              gap: '2rem', 
              marginBottom: '1.5rem',
              color: '#888',
              fontSize: '0.9rem'
            }}>
              <span>📅 {new Date(album.fecha_lanzamiento).getFullYear()}</span>
              <span><FaClock style={{ marginRight: '0.5rem' }} />{formatTotalDuration(album.duracion_total)}</span>
              <span>🏢 {album.sello_discografico}</span>
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
                  {album.puntuacion_promedio}
                </div>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>
                  {album.total_resenas} reseñas
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>
                  Tu calificación:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingClick(rating)}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '4px',
                        border: userRating >= rating ? '2px solid #ffd700' : '1px solid #333',
                        backgroundColor: userRating >= rating ? '#ffd70022' : '#2a2a2a',
                        color: userRating >= rating ? '#ffd700' : '#666',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffd70033';
                        e.currentTarget.style.borderColor = '#ffd700';
                      }}
                      onMouseLeave={(e) => {
                        if (userRating < rating) {
                          e.currentTarget.style.backgroundColor = '#2a2a2a';
                          e.currentTarget.style.borderColor = '#333';
                        }
                      }}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
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
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            {album.canciones.map((cancion, index) => (
              <div
                key={cancion.numero_pista}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 80px 40px',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderBottom: index < album.canciones.length - 1 ? '1px solid #333' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span style={{ color: '#888', textAlign: 'center' }}>
                  {cancion.numero_pista}
                </span>
                <span style={{ color: 'white' }}>
                  {cancion.titulo}
                </span>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                  {formatDuration(cancion.duracion)}
                </span>
                <button style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid #646cff',
                  backgroundColor: 'transparent',
                  color: '#646cff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaPlay size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Formulario de Reseña */}
        {showReviewForm && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>
              Escribe tu reseña
            </h2>
            <div style={{
              backgroundColor: '#1a1a1a',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
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
                <FaEdit /> Escribir Reseña Completa
              </Link>
            </div>
          </section>
        )}

        {/* Sección de Reseñas */}
        <section>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>
            Reseñas de la Comunidad
          </h2>
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
        </section>
      </div>
    </div>
  );
};

export default AlbumDetailPage;
