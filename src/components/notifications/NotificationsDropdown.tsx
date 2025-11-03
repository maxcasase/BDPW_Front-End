import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { useNotificationsStore } from '../../store/notifications.store';
import { FaBell } from 'react-icons/fa6';

export const NotificationsDropdown: React.FC = () => {
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { items, loading, unreadCount, fetchAll, markAllRead } = useNotificationsStore();

  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // cargar al autenticar
  useEffect(() => {
    if (isAuthenticated && token) void fetchAll(token);
  }, [isAuthenticated, token, fetchAll]);

  // cerrar al click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (open && panelRef.current && !panelRef.current.contains(t) && btnRef.current && !btnRef.current.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // auto refresh cada 60s si está autenticado
  useEffect(() => {
    if (!isAuthenticated || !token) return;
    const id = setInterval(() => { void fetchAll(token); }, 60000);
    return () => clearInterval(id);
  }, [isAuthenticated, token, fetchAll]);

  const count = useMemo(() => unreadCount(), [items, unreadCount]);

  if (!isAuthenticated) return null;

  return (
    <div style={{ position: 'relative' }}>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
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
        {count > 0 && (
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
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          style={{
            position: 'absolute',
            right: 0,
            marginTop: 8,
            width: 360,
            maxHeight: 420,
            overflow: 'auto',
            background: '#111',
            color: 'white',
            border: '1px solid #333',
            borderRadius: 8,
            padding: 8,
            boxShadow: '0 10px 20px rgba(0,0,0,0.4)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8 }}>
            <strong>Notificaciones</strong>
            <button onClick={markAllRead} style={{ background: '#222', color: 'white', border: '1px solid #333', padding: '4px 8px', borderRadius: 6, cursor: 'pointer' }}>Marcar todas como leídas</button>
          </div>

          {loading ? (
            <div style={{ padding: 12 }}>Cargando…</div>
          ) : items.length === 0 ? (
            <div style={{ padding: 12, color: '#aaa' }}>Sin notificaciones</div>
          ) : (
            items.map((n) => (
              <div key={n.id} style={{ padding: 12, borderTop: '1px solid #222', background: n.read ? 'transparent' : 'rgba(33, 128, 141, 0.12)' }}>
                <div style={{ fontWeight: 600 }}>{n.title}</div>
                {n.body && <div style={{ color: '#aaa', fontSize: 12 }}>{n.body}</div>}
                <div style={{ color: '#666', fontSize: 10 }}>{new Date(n.createdAt).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
