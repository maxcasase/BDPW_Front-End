// /src/features/auth/RegisterForm.tsx

import React, { useState } from 'react';
import { registerUser, type IRegisterCredentials } from '../../api/authApi';

// --- Estilos (los mismos de antes) ---
const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};
const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
};
const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: '0.9rem',
};
const inputStyle: React.CSSProperties = {
  padding: '0.75rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
};
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  color: 'white',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  marginTop: '1rem',
};
const errorStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '0.8rem',
};
// --- Fin de Estilos ---

export const RegisterForm = () => {
  // 1. Estados para los campos (añadimos username)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Estados para errores y carga
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string; username?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. Función de validación manual
  const validateForm = () => {
    const newErrors: { email?: string; password?: string; username?: string } = {};
    
    if (!username) {
      newErrors.username = 'El nombre de usuario es requerido';
    }
    if (!email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Debe ser un correo electrónico válido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. Función de envío real con API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Llamada real a la API del backend
      console.log('Enviando datos de registro:', { username, email, password });
      const response = await registerUser({ username, email, password });
      
      console.log('¡Registro exitoso!', response);
      
      // Guardar token en localStorage (opcional)
      localStorage.setItem('token', response.token);
      
      alert('¡Cuenta creada exitosamente!');
      
      // Limpiar formulario
      setUsername('');
      setEmail('');
      setPassword('');
      
    } catch (error: any) {
      console.error('Error en registro:', error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('Error en el registro. Inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Renderizado (JSX)
  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {/* Error de API */}
      {apiError && (
        <div style={{...errorStyle, padding: '1rem', backgroundColor: '#ffebeB'}}>
          {apiError}
        </div>
      )}
      
      {/* Campo Username */}
      <div style={inputGroupStyle}>
        <label htmlFor="username" style={labelStyle}>Nombre de usuario</label>
        <input
          id="username"
          type="text"
          style={inputStyle}
          placeholder="tu_usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {formErrors.username && (
          <span style={errorStyle}>{formErrors.username}</span>
        )}
      </div>

      {/* Campo Correo Electrónico */}
      <div style={inputGroupStyle}>
        <label htmlFor="email" style={labelStyle}>Correo electrónico</label>
        <input
          id="email"
          type="email"
          style={inputStyle}
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formErrors.email && (
          <span style={errorStyle}>{formErrors.email}</span>
        )}
      </div>

      {/* Campo Contraseña */}
      <div style={inputGroupStyle}>
        <label htmlFor="password" style={labelStyle}>Contraseña</label>
        <input
          id="password"
          type="password"
          style={inputStyle}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {formErrors.password && (
          <span style={errorStyle}>{formErrors.password}</span>
        )}
      </div>

      {/* Botón de Envío */}
      <button 
        type="submit" 
        style={buttonStyle} 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
      </button>
    </form>
  );
};