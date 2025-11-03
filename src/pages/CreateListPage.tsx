// /src/pages/CreateListPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaGlobe } from 'react-icons/fa';

const CreateListPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    publica: true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Llamada a la API
      console.log('Creando lista:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirigir a las listas del usuario
      navigate('/mis-listas');
    } catch (error) {
      console.error('Error al crear lista:', error);
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
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>Crear Nueva Lista</h1>
      
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
            Nombre de la lista *
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
            placeholder="Ej: Mis favoritos de 2024"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#2a2a2a',
              color: 'white',
              fontSize: '1rem'
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
            Descripción
          </label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            rows={4}
            placeholder="Describe tu lista..."
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#2a2a2a',
              color: 'white',
              fontFamily: 'inherit',
              resize: 'vertical',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            color: 'white', 
            marginBottom: '1rem',
            fontWeight: 'bold' 
          }}>
            Privacidad
          </label>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, publica: true })}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '8px',
                border: formData.publica ? '2px solid #646cff' : '1px solid #333',
                backgroundColor: formData.publica ? '#646cff22' : '#2a2a2a',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '1rem'
              }}
            >
              <FaGlobe /> Pública
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({ ...formData, publica: false })}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '8px',
                border: !formData.publica ? '2px solid #646cff' : '1px solid #333',
                backgroundColor: !formData.publica ? '#646cff22' : '#2a2a2a',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '1rem'
              }}
            >
              <FaLock /> Privada
            </button>
          </div>
          
          <p style={{ 
            color: '#888', 
            fontSize: '0.85rem', 
            marginTop: '0.5rem' 
          }}>
            {formData.publica 
              ? 'Cualquiera podrá ver esta lista' 
              : 'Solo tú podrás ver esta lista'}
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
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
            disabled={isSubmitting || !formData.nombre}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: formData.nombre ? '#646cff' : '#333',
              color: 'white',
              cursor: formData.nombre ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {isSubmitting ? 'Creando...' : 'Crear Lista'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListPage;
