// /src/components/layout/Navbar.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMusic, FaChevronDown } from 'react-icons/fa6';
import { useAuthStore } from '../../store/auth.store';
import { NotificationsDropdown } from '../notifications/NotificationsDropdown';

interface Album {
  id: number;
  title: string;
  artist: string;
}

const albums: Album[] = [
  { id: 1, title: 'Abbey Road', artist: 'The Beatles' },
  { id: 2, title: 'The Dark Side of the Moon', artist: 'Pink Floyd' },
  { id: 3, title: 'Thriller', artist: 'Michael Jackson' }
];

export const Navbar = () => {
  const [showAlbumsMenu, setShowAlbumsMenu] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleAlbumClick = (albumId: number) => {
    navigate(`/album/${albumId}`);
    setShowAlbumsMenu(false);
  };

  const handleReviewClick = (albumId: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/album/${albumId}/review`);
    setShowAlbumsMenu(false);
  };

  return (
    <nav style={{
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #333',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
    }}>
      {/* Lado Izquierdo: Logo y Links de Navegación */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.25rem',
          textDecoration: 'none',
          color: 'white',
          fontWeight: 'bold'
        }}>
          <FaMusic />
          <span>MPT</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '1.5rem', marginLeft: '1rem' }}>
          <Link to="/" style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '0.95rem',
            transition: 'color 0.2s'
          }}>
            Inicio
          </Link>
          <Link to="/discover" style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '0.95rem',
            transition: 'color 0.2s'
          }}>
            Descubrir
          </Link>
          <Link to="/charts" style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '0.95rem',
            transition: 'color 0.2s'
          }}>
            Charts
          </Link>
          
          {/* Menú Álbumes con Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowAlbumsMenu(true)}
            onMouseLeave={() => setShowAlbumsMenu(false)}
          >
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'color 0.2s',
              padding: '0.25rem 0'
            }}>
              Álbumes
              <FaChevronDown style={{ fontSize: '0.7rem' }} />
            </button>
            
            {/* Dropdown Menu */}
            {showAlbumsMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                padding: '0.5rem 0',
                minWidth: '280px',
                zIndex: 1000,
                marginTop: '0.5rem'
              }}>
                {albums.map(album => (
                  <div key={album.id} style={{
                    padding: '0.75rem 1rem',
                    borderBottom: album.id < albums.length ? '1px solid #333' : 'none'
                  }}>
                    <div style={{
                      fontWeight: '500',
                      marginBottom: '0.25rem',
                      color: 'white',
                      fontSize: '0.9rem'
                    }}>
                      {album.title}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#ccc',
                      marginBottom: '0.5rem'
                    }}>
                      {album.artist}
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={() => handleAlbumClick(album.id)}
                        style={{
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#0056b3';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#007bff';
                        }}
                      >
                        Ver Álbum
                      </button>
                      <button
                        onClick={() => handleReviewClick(album.id)}
                        style={{
                          backgroundColor: isAuthenticated ? '#28a745' : '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isAuthenticated ? '#1e7e34' : '#5a6268';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = isAuthenticated ? '#28a745' : '#6c757d';
                        }}
                      >
                        {isAuthenticated ? 'Escribir Reseña' : 'Inicia Sesión'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lado Derecho: Autenticación y Notificaciones */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isAuthenticated && user ? (
          <>
            {/* Notificaciones */}
            <NotificationsDropdown />
            
            <span style={{ fontSize: '0.9rem' }}>
              Hola, <Link to={`/perfil/${user.username}`} style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>{user.username}</Link>
            </span>
            <button onClick={handleLogout} style={{
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'background-color 0.2s'
            }}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'background-color 0.2s',
            display: 'inline-block'
          }}>
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
};