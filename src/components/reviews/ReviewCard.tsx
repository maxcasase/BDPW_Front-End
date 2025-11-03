// /src/components/reviews/ReviewCard.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaComment, FaEllipsisV, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { ReviewComments } from './ReviewComments';

interface ReviewCardProps {
  review: {
    id_resena: number;
    puntuacion: number;
    titulo?: string;
    contenido: string;
    fecha_creacion: string;
    likes: number;
    dislikes: number;
    usuario: {
      username: string;
      avatar_url?: string;
    };
    album: {
      titulo: string;
      artista: string;
    };
  };
  showAlbumInfo?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, showAlbumInfo = false }) => {
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const handleVote = (type: 'like' | 'dislike') => {
    if (userVote === type) {
      // Quitar voto
      if (type === 'like') setLikes(likes - 1);
      else setDislikes(dislikes - 1);
      setUserVote(null);
    } else {
      // Cambiar voto
      if (userVote === 'like') setLikes(likes - 1);
      if (userVote === 'dislike') setDislikes(dislikes - 1);
      
      if (type === 'like') setLikes(likes + 1);
      else setDislikes(dislikes + 1);
      
      setUserVote(type);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return '#00ff00';
    if (rating >= 7) return '#90ff00';
    if (rating >= 5) return '#ffff00';
    if (rating >= 3) return '#ff9000';
    return '#ff0000';
  };

  // Comentarios simulados para demo
  const initialComments = showComments ? [
    {
      id: 1,
      contenido: 'Totalmente de acuerdo, gran reseña!',
      fecha_creacion: new Date(Date.now() - 3600000).toISOString(),
      usuario: {
        username: 'usuario1',
        avatar_url: 'https://via.placeholder.com/36'
      }
    }
  ] : [];

  return (
    <article style={{
      backgroundColor: '#1a1a1a',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #333',
      marginBottom: '1rem'
    }}>
      {/* Header de la Reseña */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Avatar del Usuario */}
          <Link to={`/perfil/${review.usuario.username}`}>
            <img
              src={review.usuario.avatar_url || 'https://via.placeholder.com/48'}
              alt={review.usuario.username}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '2px solid #646cff'
              }}
            />
          </Link>
          
          {/* Info del Usuario y Fecha */}
          <div>
            <Link 
              to={`/perfil/${review.usuario.username}`}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              {review.usuario.username}
            </Link>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>
              {formatDate(review.fecha_creacion)}
            </div>
          </div>

          {/* Calificación */}
          <div style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2a2a2a',
            borderRadius: '8px',
            border: `2px solid ${getRatingColor(review.puntuacion)}`,
            fontWeight: 'bold',
            fontSize: '1.25rem',
            color: getRatingColor(review.puntuacion)
          }}>
            {review.puntuacion}
          </div>
        </div>

        {/* Menú de Opciones */}
        <button style={{
          background: 'transparent',
          border: 'none',
          color: '#888',
          cursor: 'pointer',
          padding: '0.5rem'
        }}>
          <FaEllipsisV />
        </button>
      </div>

      {/* Info del Álbum (opcional) */}
      {showAlbumInfo && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#2a2a2a',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          <span style={{ color: '#888' }}>Reseña de: </span>
          <span style={{ color: 'white', fontWeight: 'bold' }}>
            {review.album.titulo}
          </span>
          <span style={{ color: '#888' }}> por {review.album.artista}</span>
        </div>
      )}

      {/* Título de la Reseña */}
      {review.titulo && (
        <h3 style={{
          color: 'white',
          fontSize: '1.25rem',
          marginBottom: '0.75rem',
          fontWeight: 'bold'
        }}>
          {review.titulo}
        </h3>
      )}

      {/* Contenido de la Reseña */}
      <p style={{
        color: '#b0b0b0',
        lineHeight: 1.6,
        marginBottom: '1rem'
      }}>
        {review.contenido}
      </p>

      {/* Acciones (Likes, Dislikes, Comentarios) */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #333'
      }}>
        <button
          onClick={() => handleVote('like')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: userVote === 'like' ? '#646cff22' : 'transparent',
            border: userVote === 'like' ? '1px solid #646cff' : '1px solid #333',
            borderRadius: '8px',
            color: userVote === 'like' ? '#646cff' : '#888',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          <FaThumbsUp /> {likes}
        </button>

        <button
          onClick={() => handleVote('dislike')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: userVote === 'dislike' ? '#ff444422' : 'transparent',
            border: userVote === 'dislike' ? '1px solid #ff4444' : '1px solid #333',
            borderRadius: '8px',
            color: userVote === 'dislike' ? '#ff4444' : '#888',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          <FaThumbsDown /> {dislikes}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: showComments ? '#646cff22' : 'transparent',
            border: showComments ? '1px solid #646cff' : '1px solid #333',
            borderRadius: '8px',
            color: showComments ? '#646cff' : '#888',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          <FaComment /> {commentCount > 0 ? commentCount : 'Comentar'}
          {showComments ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
      </div>

      {/* Sección de Comentarios */}
      {showComments && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #333'
        }}>
          <ReviewComments 
            reviewId={review.id_resena}
            initialComments={initialComments}
          />
        </div>
      )}
    </article>
  );
};
