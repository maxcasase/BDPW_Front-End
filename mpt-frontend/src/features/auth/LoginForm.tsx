// /src/features/auth/LoginForm.tsx

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // 1. Importamos useMutation
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import { loginUser, type ILoginCredentials } from '../../api/authApi'; // 2. Importamos nuestra función API
import { useAuthStore } from '../../store/auth.store'; // 3. Importamos el store

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
  backgroundColor: '#1a1a1a', // Negro
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

export const LoginForm = () => {
  // --- Estados del formulario (igual que antes) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  
  // 4. Nuevos estados para hooks y errores de API
  const navigate = useNavigate(); // Hook para redirigir
  const queryClient = useQueryClient(); // Para invalidar queries
  const [apiError, setApiError] = useState<string | null>(null); // Para errores del servidor

  // 5. Traemos las acciones del store
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  // 6. Configuración de la MUTACIÓN de React Query
  const mutation = useMutation({
    // 'loginUser' es la función API que creamos
    mutationFn: (credentials: ILoginCredentials) => loginUser(credentials),
    
    // 7. onSuccess: Qué hacer cuando la API responde OK
    onSuccess: (data) => {
      console.log('¡Inicio de sesión exitoso!', data);
      
      // Guardamos el token y el usuario en el estado global
      setToken(data.token);
      setUser(data.user);
      
      // (Opcional) Invalidamos queries para recargar datos del usuario
      queryClient.invalidateQueries({ queryKey: ['me'] }); 
      
      // Redirigimos al usuario al Home
      navigate('/');
    },
    
    // 8. onError: Qué hacer cuando la API falla (ej. contraseña incorrecta)
    onError: (error) => {
      console.error('Error de inicio de sesión:', error);
      // Aquí podrías poner un mensaje más amigable
      setApiError('Correo electrónico o contraseña incorrectos.');
    },
  });

  // --- Validación (igual que antes) ---
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'El correo electrónico es requerido';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Debe ser un correo electrónico válido';
    }
    if (!password) newErrors.password = 'La contraseña es requerida';
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 9. handleSubmit MODIFICADO
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setApiError(null); // Limpiamos errores antiguos
    
    if (!validateForm()) {
      return;
    }
    
    // ¡Aquí está la magia!
    // Llamamos a la mutación con los datos del formulario.
    // React Query se encarga de 'isSubmitting' (ahora 'mutation.isPending')
    // y de llamar a 'onSuccess' o 'onError'
    mutation.mutate({ email, password });
  };

  // 10. Renderizado (JSX)
  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {/* Mostramos el error de la API si existe */}
      {apiError && (
        <div style={{...errorStyle, padding: '1rem', backgroundColor: '#ffebeB'}}>
          {apiError}
        </div>
      )}
      
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
        // 11. Deshabilitamos el botón si la mutación está 'pending'
        disabled={mutation.isPending} 
      >
        {mutation.isPending ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};