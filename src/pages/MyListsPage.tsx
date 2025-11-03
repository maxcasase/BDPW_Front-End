// /src/pages/MyListsPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaLock, FaGlobe, FaMusic } from 'react-icons/fa';

const MyListsPage = () => {
  // Datos simulados de listas
  const lists = [
    {
      id: 1,
      nombre: 'Mis Favoritos de 2024',
      descripcion: 'Los mejores álbumes que he escuchado este año',
      publica: true,
      fecha_creacion: '2024-01-15',
      cantidad_items: 15
    },
    {
      id: 2,
      nombre: 'Rock Clásico Esencial',
      descripcion: 'Las piedras angulares del rock',
      publica: true,
      fecha_creacion: '2024-02-20',
      cantidad_items: 23
    },
    {
      id: 3,
      nombre: 'Para Escuchar Después',
      descripcion: '',
      publica: false,
      fecha_creacion: '2024-03-10',
      cantidad_items: 8
    }
  ];

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 80px)',
      backgroundColor: '#2a2a2a'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ color: 'white', margin: 0 }}>Mis Listas</h1>
          <Link
            to="/listas/crear"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#646cff',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            <FaPlus /> Nueva Lista
          </Link>
        </div>

        {/* Grid de Listas */}
        {lists.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {lists.map(list => (
              <div
                key={list.id}
                style={{
                  backgroundColor: '#1a1a1a',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #333',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, border-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#646cff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ 
                    color: 'white', 
                    margin: 0,
                    fontSize: '1.25rem'
                  }}>
                    {list.nombre}
                  </h3>
                  {list.publica ? (
                    <FaGlobe color="#646cff" title="Pública" />
                  ) : (
                    <FaLock color="#888" title="Privada" />
                  )}
                </div>

                {list.descripcion && (
                  <p style={{ 
                    color: '#b0b0b0', 
                    fontSize: '0.9rem',
                    marginBottom: '1rem'
                  }}>
                    {list.descripcion}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #333',
                  fontSize: '0.85rem',
                  color: '#888'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaMusic /> {list.cantidad_items} ítems
                  </span>
                  <span>
                    {new Date(list.fecha_creacion).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '3rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <FaMusic size={48} color="#646cff" style={{ marginBottom: '1rem' }} />
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>
              Aún no tienes listas
            </h2>
            <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
              Crea tu primera lista para organizar tus álbumes y canciones favoritas
            </p>
            <Link
              to="/listas/crear"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#646cff',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              <FaPlus /> Crear Mi Primera Lista
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListsPage;
