import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { useNotificationsStore } from '../../store/notifications.store';
import { FaBell } from 'react-icons/fa6';

export const NotificationsDropdown: React.FC = () => {
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { items, loading, unreadCount, fetchAll, markAllRead } = useNotificationsStore();

  useEffect(() => {
    if (isAuthenticated && token) {
      void fetchAll(token);
    }
  }, [isAuthenticated, token, fetchAll]);

  if (!isAuthenticated) return null;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={markAllRead}
        title="Notificaciones"
        style={{
          position: 'relative',
          background: 'transparent',
          border: '1px solid #333',
          color: 'white',
          padding: '0.4rem 0.6rem',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        <FaBell />
        {unreadCount() > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -6,
              right: -6,
              background: '#e11d48',
              color: 'white',
              borderRadius: 999,
              fontSize: 10,
              padding: '2px 6px',
            }}
          >
            {unreadCount()}
          </span>
        )}
      </button>

      {/* Lista simple al pasar el mouse (para simplificar aquí) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          marginTop: 8,
          width: 320,
          background: '#111',
          color: 'white',
          border: '1px solid #333',
          borderRadius: 8,
          padding: 8,
        }}
      >
        {loading ? (
          <div style={{ padding: 8 }}>Cargando…</div>
        ) : items.length === 0 ? (
          <div style={{ padding: 8, color: '#aaa' }}>Sin notificaciones</div>
        ) : (
          items.map((n) => (
            <div key={n.id} style={{ padding: 8, borderBottom: '1px solid #222' }}>
              <div style={{ fontWeight: 600 }}>{n.title}</div>
              {n.body && <div style={{ color: '#aaa', fontSize: 12 }}>{n.body}</div>}
              <div style={{ color: '#666', fontSize: 10 }}>{new Date(n.createdAt).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
