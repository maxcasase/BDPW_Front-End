// /src/pages/ProfilePage.tsx

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { FaEdit, FaUserPlus, FaUserCheck } from 'react-icons/fa';

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const currentUser = useAuthStore((state) => state.user);
  
  // Determinar si es el perfil propio
  const isMyProfile = currentUser?.username === username;
  
  // Estado para seguir/dejar de seguir (simulado)
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(42);

  // Datos del perfil (simulados)
  const profileData = {
    username: username || 'usuario',
    biografia: 'Amante de la música de todos los géneros. Rock, Jazz, Hip-Hop y más.',
    avatar_url: 'https://via.placeholder.com/150',
    pais: 'Chile',
    ciudad: 'Santiago',
    fecha_registro: '2024-01-15'
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
  };

  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 80px)', backgroundColor: '#2a2a2a' }}>
      {/* Header del Perfil */}
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderBottom: '1px solid #333'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Avatar */}
          <img 
            src={profileData.avatar_url} 
            alt="Avatar"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              border: '3px solid #646cff'
            }}
          />
          
          {/* Info del Usuario */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <h1 style={{ color: 'white', fontSize: '2rem', margin: 0 }}>
                {profileData.username}
              </h1>
              {isMyProfile ? (
                <Link 
                  to="/perfil/editar"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#333',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  <FaEdit /> Editar Perfil
                </Link>
              ) : (
                <button
                  onClick={handleFollowToggle}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: isFollowing ? '#333' : '#646cff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {isFollowing ? <><FaUserCheck /> Siguiendo</> : <><FaUserPlus /> Seguir</>}
                </button>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
              <span style={{ color: '#b0b0b0' }}>
                <strong style={{ color: 'white' }}>156</strong> Reseñas
              </span>
              <span style={{ color: '#b0b0b0' }}>
                <strong style={{ color: 'white' }}>23</strong> Listas
              </span>
              <span style={{ color: '#b0b0b0' }}>
                <strong style={{ color: 'white' }}>{followerCount}</strong> Seguidores
              </span>
              <span style={{ color: '#b0b0b0' }}>
                <strong style={{ color: 'white' }}>89</strong> Siguiendo
              </span>
            </div>
            
            <p style={{ color: '#b0b0b0', margin: 0 }}>
              {profileData.biografia}
            </p>
            
            <div style={{ marginTop: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
              📍 {profileData.ciudad}, {profileData.pais} • 
              Miembro desde {new Date(profileData.fecha_registro).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de Contenido */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          borderBottom: '1px solid #333',
          marginBottom: '2rem'
        }}>
          <button style={{
            padding: '1rem',
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            borderBottom: '2px solid #646cff',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Reseñas
          </button>
          <button style={{
            padding: '1rem',
            backgroundColor: 'transparent',
            color: '#888',
            border: 'none',
            cursor: 'pointer'
          }}>
            Listas
          </button>
          <button style={{
            padding: '1rem',
            backgroundColor: 'transparent',
            color: '#888',
            border: 'none',
            cursor: 'pointer'
          }}>
            Calificaciones
          </button>
        </div>

        {/* Contenido de Reseñas */}
        <div>
          <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Reseñas Recientes</h2>
          
          {/* Placeholder de Reseñas */}
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', fontSize: '1.1rem' }}>
              {isMyProfile 
                ? '¡Empieza a escribir reseñas para compartir tu opinión!' 
                : 'Este usuario aún no ha publicado reseñas.'}
            </p>
            {isMyProfile && (
              <Link 
                to="/discover"
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#646cff',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Explorar Música
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;