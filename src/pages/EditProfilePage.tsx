// /src/pages/EditProfilePage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    biografia: user?.biografia || '',
    pais: user?.pais || '',
    ciudad: user?.ciudad || '',
    fecha_nacimiento: user?.fecha_nacimiento || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // TODO: Aquí irá la llamada a la API para actualizar el perfil
      console.log('Actualizando perfil:', formData);
      
      // Simulación de actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el usuario en el store
      if (user) {
        setUser({
          ...user,
          ...formData
        });
      }
      
      setSuccess(true);
      setTimeout(() => {
        navigate(`/perfil/${user?.username}`);
      }, 1500);
    } catch (err) {
      setError('Error al actualizar el perfil');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>Editar Perfil</h1>
      
      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#ff4444',
          color: 'white',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#44ff44',
          color: '#1a1a1a',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          ¡Perfil actualizado exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #333'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            color: 'white', 
            marginBottom: '0.5rem',
            fontWeight: 'bold' 
          }}>
            Nombre de usuario
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#2a2a2a',
              color: '#666',
              cursor: 'not-allowed'
            }}
          />
          <small style={{ color: '#666', fontSize: '0.85rem' }}>
            El nombre de usuario no puede ser modificado
          </small>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            color: 'white', 
            marginBottom: '0.5rem',
            fontWeight: 'bold' 
          }}>
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#2a2a2a',
              color: 'white'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            color: 'white', 
            marginBottom: '0.5rem',
            fontWeight: 'bold' 
          }}>
            Biografía
          </label>
          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#2a2a2a',
              color: 'white',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="Cuéntanos sobre ti y tus gustos musicales..."
          />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',
          marginBottom: '1.5rem' 
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              color: 'white', 
              marginBottom: '0.5rem',
              fontWeight: 'bold' 
            }}>
              País
            </label>
            <input
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#2a2a2a',
                color: 'white'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              color: 'white', 
              marginBottom: '0.5rem',
              fontWeight: 'bold' 
            }}>
              Ciudad
            </label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #333',
                backgroundColor: '#2a2a2a',
                color: 'white'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            color: 'white', 
            marginBottom: '0.5rem',
            fontWeight: 'bold' 
          }}>
            Fecha de nacimiento
          </label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#2a2a2a',
              color: 'white'
            }}
          />
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          justifyContent: 'flex-end',
          marginTop: '2rem'
        }}>
          <button
            type="button"
            onClick={() => navigate(`/perfil/${user?.username}`)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: 'transparent',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#646cff',
              color: 'white',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
