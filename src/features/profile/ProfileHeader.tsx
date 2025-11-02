// /src/features/profile/ProfileHeader.tsx

import React from 'react';
import { Link } from 'react-router-dom';

// --- Estilos ---
const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  padding: '2rem',
  borderBottom: '1px solid #eee',
};
const avatarStyle: React.CSSProperties = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  backgroundColor: '#ccc',
  objectFit: 'cover',
};
const infoStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};
const usernameStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: 0,
};
const bioStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#555',
  marginTop: '0.5rem',
};
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  marginTop: '1rem',
};
// --- Fin Estilos ---

// Esta es la única exportación.
export const ProfileHeader = () => {
  // 1. --- DATOS SIMULADOS (HARDCODED) ---
  const isLoading = false;
  const error = null;
  const profile = {
    username: 'usuario_ejemplo',
    biografia: 'Esta es una biografía de ejemplo.',
    avatar_url: 'https://via.placeholder.com/150',
    isFollowing: false,
  };
  
  // 2. Lógica de botones (simulada)
  const isMyProfile = false; 

  // --- Renderizado ---
  if (isLoading) {
    return <div>Cargando perfil...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!profile) {
    return <div>Perfil no encontrado.</div>;
  }

  return (
    <header style={headerStyle}>
      <img 
        src={profile.avatar_url} 
        alt="Avatar" 
        style={avatarStyle} 
      />
      <div style={infoStyle}>
        <h1 style={usernameStyle}>{profile.username}</h1>
        <p style={bioStyle}>{profile.biografia}</p>
        
        {isMyProfile ? (
          <Link to="/perfil/editar" style={buttonStyle}>
            Editar Perfil
          </Link>
        ) : (
          <button style={{...buttonStyle, backgroundColor: '#007bff'}}>
            Seguir
          </button>
        )}
      </div>
    </header>
  );
};

// NO HAY 'export default' AQUÍ.