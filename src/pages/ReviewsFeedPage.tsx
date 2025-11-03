// /src/pages/ReviewsFeedPage.tsx

import React, { useState } from 'react';
import { ReviewCard } from '../components/reviews/ReviewCard';

const ReviewsFeedPage = () => {
  const [filter, setFilter] = useState<'recientes' | 'populares' | 'siguiendo'>('recientes');

  // Datos simulados de reseñas
  const reviews = [
    {
      id_resena: 1,
      puntuacion: 9,
      titulo: 'Una obra maestra atemporal',
      contenido: 'Abbey Road es simplemente perfecto. Cada canción fluye naturalmente hacia la siguiente, y el medley del lado B es una de las piezas más ambiciosas y hermosas de la historia del rock. La producción es impecable y las armonías vocales son de otro mundo.',
      fecha_creacion: '2024-11-01T10:30:00',
      likes: 234,
      dislikes: 12,
      usuario: {
        username: 'musiclover92',
        avatar_url: 'https://via.placeholder.com/48'
      },
      album: {
        titulo: 'Abbey Road',
        artista: 'The Beatles'
      }
    },
    {
      id_resena: 2,
      puntuacion: 10,
      titulo: 'Perfección absoluta',
      contenido: 'No hay palabras para describir lo perfecto que es este álbum. Desde "Come Together" hasta "The End", cada momento es mágico. El trabajo de George Martin en la producción es sublime.',
      fecha_creacion: '2024-10-28T15:45:00',
      likes: 567,
      dislikes: 8,
      usuario: {
        username: 'beatlesfan',
        avatar_url: 'https://via.placeholder.com/48'
      },
      album: {
        titulo: 'Abbey Road',
        artista: 'The Beatles'
      }
    },
    {
      id_resena: 3,
      puntuacion: 7,
      titulo: 'Muy bueno pero sobrevalorado',
      contenido: 'Es un gran álbum, sin duda, pero no creo que sea el mejor de The Beatles. Algunas canciones son brillantes como "Something" y "Here Comes the Sun", pero otras no me conectan tanto. Aún así, es una pieza importante de la historia del rock.',
      fecha_creacion: '2024-10-25T09:20:00',
      likes: 89,
      dislikes: 156,
      usuario: {
        username: 'criticalear',
        avatar_url: 'https://via.placeholder.com/48'
      },
      album: {
        titulo: 'Abbey Road',
        artista: 'The Beatles'
      }
    }
  ];

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
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: 'white', marginBottom: '1rem' }}>
            Reseñas de la Comunidad
          </h1>
          
          {/* Filtros */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #333'
          }}>
            <button
              onClick={() => setFilter('recientes')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: filter === 'recientes' ? 'white' : '#888',
                border: 'none',
                borderBottom: filter === 'recientes' ? '2px solid #646cff' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: filter === 'recientes' ? 'bold' : 'normal',
                fontSize: '1rem'
              }}
            >
              Recientes
            </button>
            <button
              onClick={() => setFilter('populares')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: filter === 'populares' ? 'white' : '#888',
                border: 'none',
                borderBottom: filter === 'populares' ? '2px solid #646cff' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: filter === 'populares' ? 'bold' : 'normal',
                fontSize: '1rem'
              }}
            >
              Populares
            </button>
            <button
              onClick={() => setFilter('siguiendo')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: filter === 'siguiendo' ? 'white' : '#888',
                border: 'none',
                borderBottom: filter === 'siguiendo' ? '2px solid #646cff' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: filter === 'siguiendo' ? 'bold' : 'normal',
                fontSize: '1rem'
              }}
            >
              Siguiendo
            </button>
          </div>
        </div>

        {/* Lista de Reseñas */}
        <div>
          {reviews.map(review => (
            <ReviewCard 
              key={review.id_resena} 
              review={review}
              showAlbumInfo={true}
            />
          ))}
        </div>

        {/* Mensaje si no hay más reseñas */}
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#888'
        }}>
          <p>No hay más reseñas para mostrar</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsFeedPage;
