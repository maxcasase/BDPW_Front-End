// /src/pages/LoginPage.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Para el link de "Registrarse"
import { LoginForm } from '../features/auth/LoginForm'; // Importamos el formulario
import { FaMusic } from 'react-icons/fa6'; // Importamos el ícono

// Estilos (los mismos de antes, más algunos nuevos)
const pageStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f9f9f9',
};

const boxStyle: React.CSSProperties = {
  padding: '2.5rem', // Más padding
  width: '100%',
  maxWidth: '400px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  textAlign: 'center', // Centramos el texto
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1.5rem',
  marginBottom: '0.5rem',
  color: '#1a1a1a',
};

const registerStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  fontSize: '0.9rem',
};

const LoginPage = () => {
  return (
    <div style={pageStyle}>
      <div style={boxStyle}>
        <div style={logoStyle}>
          <FaMusic />
          <strong>MPT - Música Para Todos</strong>
        </div>
        <p style={{ marginBottom: '2rem', color: '#555' }}>
          Únete a nuestra comunidad musical
        </p>

        {/* --- Pestañas (simuladas por ahora) --- */}
        <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, paddingBottom: '0.5rem', borderBottom: '2px solid #1a1a1a', fontWeight: 'bold' }}>
            Iniciar Sesión
          </div>
          <Link 
            to="/register" 
            style={{ flex: 1, textDecoration: 'none', color: '#777', paddingBottom: '0.5rem', borderBottom: '2px solid transparent' }}
          >
            Registrarse
          </Link>
        </div>
        
        <h3 style={{ textAlign: 'left', fontSize: '1.25rem' }}>Ingresa tus credenciales</h3>
        
        {/* 1. Insertamos el formulario */}
        <LoginForm />

        {/* 2. Link a Registrarse */}
        <div style={registerStyle}>
          ¿No tienes una cuenta?{' '}
          <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;
