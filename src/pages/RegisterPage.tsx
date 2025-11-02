
// /src/pages/RegisterPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../features/auth/RegisterForm'; // Esta línea debería estar bien ahora
import { FaMusic } from 'react-icons/fa6';

// --- Estilos (Copiados de LoginPage) ---
const pageStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f9f9f9',
};
const boxStyle: React.CSSProperties = {
  padding: '2.5rem',
  width: '100%',
  maxWidth: '400px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  textAlign: 'center',
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
const loginStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  fontSize: '0.9rem',
};
// --- Fin de Estilos ---

const RegisterPage = () => {
  return (
    <div style={pageStyle}>
      <div style={boxStyle}>
        {/* Encabezado */}
        <div style={logoStyle}>
          <FaMusic />
          <strong>MPT - Música Para Todos</strong>
        </div>
        <p style={{ marginBottom: '2rem', color: '#555' }}>
          Únete a nuestra comunidad musical
        </p>

        {/* --- Pestañas (Ahora 'Registrarse' está activa) --- */}
        <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
          <Link
            to="/login"
            style={{ flex: 1, textDecoration: 'none', color: '#777', paddingBottom: '0.5rem', borderBottom: '2px solid transparent' }}
          >
            Iniciar Sesión
          </Link>
          <div style={{ flex: 1, paddingBottom: '0.5rem', borderBottom: '2px solid #1a1a1a', fontWeight: 'bold' }}>
            Registrarse
          </div>
        </div>
        
        <h3 style={{ textAlign: 'left', fontSize: '1.25rem' }}>Crea tu cuenta</h3>
        
        {/* Insertamos el formulario de registro */}
        <RegisterForm />

        {/* Link a Iniciar Sesión */}
        <div style={loginStyle}>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;