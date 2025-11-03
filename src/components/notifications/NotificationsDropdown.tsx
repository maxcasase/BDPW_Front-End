// /src/components/notifications/NotificationsDropdown.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaComment, FaReply, FaThumbsUp, FaUserPlus, FaStar, FaTimes, FaCheck } from 'react-icons/fa';
import { useNotificationsStore } from '../../store/notifications.store';

export const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = useNotificationsStore((state) => state.notifications);
  const unreadCount = useNotificationsStore((state) => state.unreadCount);
  const markAsRead = useNotificationsStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationsStore((state) => state.markAllAsRead);
  const deleteNotification = useNotificationsStore((state) => state.deleteNotification);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'comment':
        return <FaComment color="#646cff" />;
      case 'reply':
        return <FaReply color="#646cff" />;
      case 'like':
        return <FaThumbsUp color="#00ff00" />;
      case 'follow':
        return <FaUserPlus color="#ff9000" />;
      case 'review':
        return <FaStar color="#ffd700" />;
      default:
        return <FaBell color="#888" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    
    if (diffMinutes < 1) return 'Ahora';
    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
    
    const diffHours = Math.ceil(diffMinutes / 60);
    if (diffHours < 24) return `Hace ${diffHours}h`;
    
    const diffDays = Math.ceil(diffHours / 24);
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.leida) {
      markAsRead(notification.id);
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Botón de Notificaciones */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <FaBell size={20} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            backgroundColor: '#ff4444',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            border: '2px solid #1a1a1a'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          right: 0,
          width: '400px',
          maxHeight: '500px',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ 
              color: 'white', 
              margin: 0,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Notificaciones
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'transparent',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: '#888',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                <FaCheck size={10} /> Marcar todas
              </button>
            )}
          </div>

          {/* Lista de Notificaciones */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            maxHeight: '400px'
          }}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    position: 'relative',
                    padding: '1rem',
                    borderBottom: '1px solid #333',
                    backgroundColor: notification.leida ? 'transparent' : '#2a2a2a',
                    cursor: notification.url ? 'pointer' : 'default',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (notification.url) {
                      e.currentTarget.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = notification.leida ? 'transparent' : '#2a2a2a';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'start'
                  }}>
                    {/* Avatar o Icono */}
                    {notification.usuario_origen ? (
                      <img
                        src={notification.usuario_origen.avatar_url || 'https://via.placeholder.com/40'}
                        alt={notification.usuario_origen.username}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '2px solid #646cff'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#2a2a2a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #333'
                      }}>
                        {getNotificationIcon(notification.tipo)}
                      </div>
                    )}

                    {/* Contenido */}
                    <div style={{ flex: 1 }}>
                      {notification.url ? (
                        <Link
                          to={notification.url}
                          onClick={() => handleNotificationClick(notification)}
                          style={{
                            textDecoration: 'none',
                            color: 'inherit'
                          }}
                        >
                          <p style={{
                            color: 'white',
                            margin: 0,
                            marginBottom: '0.25rem',
                            fontSize: '0.9rem',
                            fontWeight: notification.leida ? 'normal' : 'bold'
                          }}>
                            {notification.titulo}
                          </p>
                          <p style={{
                            color: '#b0b0b0',
                            margin: 0,
                            fontSize: '0.85rem',
                            lineHeight: 1.4
                          }}>
                            {notification.mensaje}
                          </p>
                        </Link>
                      ) : (
                        <>
                          <p style={{
                            color: 'white',
                            margin: 0,
                            marginBottom: '0.25rem',
                            fontSize: '0.9rem',
                            fontWeight: notification.leida ? 'normal' : 'bold'
                          }}>
                            {notification.titulo}
                          </p>
                          <p style={{
                            color: '#b0b0b0',
                            margin: 0,
                            fontSize: '0.85rem',
                            lineHeight: 1.4
                          }}>
                            {notification.mensaje}
                          </p>
                        </>
                      )}
                      <span style={{
                        color: '#666',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        display: 'block'
                      }}>
                        {formatDate(notification.fecha_creacion)}
                      </span>
                    </div>

                    {/* Botón Eliminar */}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '0.25rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ff4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>

                  {/* Indicador de no leída */}
                  {!notification.leida && (
                    <div style={{
                      position: 'absolute',
                      left: '0.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#646cff'
                    }} />
                  )}
                </div>
              ))
            ) : (
              <div style={{
                padding: '3rem 1rem',
                textAlign: 'center',
                color: '#666'
              }}>
                <FaBell size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <p>No tienes notificaciones</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: '0.75rem',
              borderTop: '1px solid #333',
              textAlign: 'center'
            }}>
              <Link
                to="/notifications"
                onClick={() => setIsOpen(false)}
                style={{
                  color: '#646cff',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                Ver todas las notificaciones
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
