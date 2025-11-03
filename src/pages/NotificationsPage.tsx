// /src/pages/NotificationsPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaComment, FaReply, FaThumbsUp, FaUserPlus, FaStar, FaTimes, FaCheck, FaTrash } from 'react-icons/fa';
import { useNotificationsStore } from '../store/notifications.store';

const NotificationsPage = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  const notifications = useNotificationsStore((state) => state.notifications);
  const unreadCount = useNotificationsStore((state) => state.unreadCount);
  const markAsRead = useNotificationsStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationsStore((state) => state.markAllAsRead);
  const deleteNotification = useNotificationsStore((state) => state.deleteNotification);
  const clearAll = useNotificationsStore((state) => state.clearAll);

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.leida)
    : notifications;

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'comment':
        return <FaComment size={24} color="#646cff" />;
      case 'reply':
        return <FaReply size={24} color="#646cff" />;
      case 'like':
        return <FaThumbsUp size={24} color="#00ff00" />;
      case 'follow':
        return <FaUserPlus size={24} color="#ff9000" />;
      case 'review':
        return <FaStar size={24} color="#ffd700" />;
      default:
        return <FaBell size={24} color="#888" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 80px)',
      backgroundColor: '#2a2a2a'
    }}>
      <div style={{
        maxWidth: '900px',
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
          <div>
            <h1 style={{ color: 'white', margin: 0, marginBottom: '0.5rem' }}>
              Notificaciones
            </h1>
            <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>
              {unreadCount > 0 ? `${unreadCount} sin leer` : 'Todo al día'}
            </p>
          </div>
          
          {notifications.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#646cff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}
                >
                  <FaCheck /> Marcar todas como leídas
                </button>
              )}
              <button
                onClick={clearAll}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}
              >
                <FaTrash /> Eliminar todas
              </button>
            </div>
          )}
        </div>

        {/* Filtros */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #333'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: filter === 'all' ? 'white' : '#888',
              border: 'none',
              borderBottom: filter === 'all' ? '2px solid #646cff' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: filter === 'all' ? 'bold' : 'normal',
              fontSize: '1rem'
            }}
          >
            Todas ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: filter === 'unread' ? 'white' : '#888',
              border: 'none',
              borderBottom: filter === 'unread' ? '2px solid #646cff' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: filter === 'unread' ? 'bold' : 'normal',
              fontSize: '1rem'
            }}
          >
            Sin leer ({unreadCount})
          </button>
        </div>

        {/* Lista de Notificaciones */}
        {filteredNotifications.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  position: 'relative',
                  backgroundColor: notification.leida ? '#1a1a1a' : '#2a2a2a',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: notification.leida ? '1px solid #333' : '2px solid #646cff',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'start'
                }}>
                  {/* Avatar o Icono */}
                  {notification.usuario_origen ? (
                    <Link to={`/perfil/${notification.usuario_origen.username}`}>
                      <img
                        src={notification.usuario_origen.avatar_url || 'https://via.placeholder.com/56'}
                        alt={notification.usuario_origen.username}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          border: '3px solid #646cff'
                        }}
                      />
                    </Link>
                  ) : (
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #444'
                    }}>
                      {getNotificationIcon(notification.tipo)}
                    </div>
                  )}

                  {/* Contenido */}
                  <div style={{ flex: 1 }}>
                    {notification.url ? (
                      <Link
                        to={notification.url}
                        onClick={() => !notification.leida && markAsRead(notification.id)}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                      >
                        <h3 style={{
                          color: 'white',
                          margin: 0,
                          marginBottom: '0.5rem',
                          fontSize: '1.1rem',
                          fontWeight: notification.leida ? 'normal' : 'bold'
                        }}>
                          {notification.titulo}
                        </h3>
                        <p style={{
                          color: '#b0b0b0',
                          margin: 0,
                          marginBottom: '0.5rem',
                          lineHeight: 1.5
                        }}>
                          {notification.mensaje}
                        </p>
                      </Link>
                    ) : (
                      <>
                        <h3 style={{
                          color: 'white',
                          margin: 0,
                          marginBottom: '0.5rem',
                          fontSize: '1.1rem',
                          fontWeight: notification.leida ? 'normal' : 'bold'
                        }}>
                          {notification.titulo}
                        </h3>
                        <p style={{
                          color: '#b0b0b0',
                          margin: 0,
                          marginBottom: '0.5rem',
                          lineHeight: 1.5
                        }}>
                          {notification.mensaje}
                        </p>
                      </>
                    )}
                    <span style={{
                      color: '#666',
                      fontSize: '0.85rem'
                    }}>
                      {formatDate(notification.fecha_creacion)}
                    </span>
                  </div>

                  {/* Acciones */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {!notification.leida && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        title="Marcar como leída"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          border: '1px solid #333',
                          backgroundColor: 'transparent',
                          color: '#646cff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      title="Eliminar"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        border: '1px solid #333',
                        backgroundColor: 'transparent',
                        color: '#ff4444',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '4rem 2rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <FaBell size={64} color="#333" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>
              {filter === 'unread' ? 'No tienes notificaciones sin leer' : 'No tienes notificaciones'}
            </h2>
            <p style={{ color: '#888' }}>
              {filter === 'unread' 
                ? 'Todas tus notificaciones están al día' 
                : 'Cuando recibas notificaciones, aparecerán aquí'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
