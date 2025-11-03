// /src/components/layout/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaMusic } from 'react-icons/fa6';
import { useAuthStore } from '../../store/auth.store';

export const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
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
        </div>
      </div>

      {/* Lado Derecho: Autenticación */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isAuthenticated && user ? (
          <>
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