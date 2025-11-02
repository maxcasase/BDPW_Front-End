// /src/components/layout/Navbar.tsx

import React from 'react'; // Importamos React
import { Link } from 'react-router-dom';
import { FaMusic } from 'react-icons/fa6';
import { useAuthStore } from '../../store/auth.store'; // 1. Importamos el store

export const Navbar = () => {
  // 2. Leemos el estado y las acciones del store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // --- Estilos (los mismos de antes) ---
  const navStyle: React.CSSProperties = {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
  };
  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    textDecoration: 'none',
    color: 'white',
  };
  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'white',
    margin: '0 0.5rem',
  };
  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '0.9rem', // Ajustamos tamaño
  };
  // --- Fin de Estilos ---

  const handleLogout = () => {
    logout();
    // (Opcional) redirigir al home
    // navigate('/'); 
  };

  return (
    <nav style={navStyle}>
      {/* Lado Izquierdo: Logo y Links de Navegación */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={logoStyle}>
          <FaMusic />
          <strong>MPT</strong>
        </Link>
        
        <div style={{ marginLeft: '2rem' }}>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/discover" style={linkStyle}>Descubrir</Link>
          <Link to="/charts" style={linkStyle}>Charts</Link>
        </div>
      </div>

      {/* Lado Derecho: Lógica de Autenticación */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isAuthenticated && user ? (
          // 3. VISTA SI ESTÁ LOGUEADO
          <>
            <span style={{ fontSize: '0.9rem' }}>
              Hola, <Link to={`/perfil/${user.username}`} style={linkStyle}>{user.username}</Link>
            </span>
            <button onClick={handleLogout} style={buttonStyle}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          // 4. VISTA SI NO ESTÁ LOGUEADO
          <Link to="/login" style={buttonStyle}>
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
};