import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaComment, FaReply, FaThumbsUp, FaUserPlus, FaCheck, FaTimes } from 'react-icons/fa';
import { useNotificationsStore, type INotification } from '../store/notifications.store';
import { useAuthStore } from '../store/auth.store';

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const { items, loading, fetchAll, markAllRead, unreadCount } = useNotificationsStore();
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated && token) void fetchAll(token);
  }, [isAuthenticated, token, fetchAll]);

  const count = useMemo(() => unreadCount(), [items, unreadCount]);

  const filtered: INotification[] = useMemo(() => {
    return filter === 'unread' ? items.filter((n) => !n.read) : items;
  }, [filter, items]);

  const getIcon = (type: INotification['type']) => {
    switch (type) {
      case 'review':
        return <FaComment size={20} color="#646cff" />;
      case 'like':
        return <FaThumbsUp size={20} color="#22c55e" />;
      case 'follow':
        return <FaUserPlus size={20} color="#f59e0b" />;
      default:
        return <FaBell size={20} color="#888" />;
    }
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h1 style={{ color: 'white', margin: 0 }}>Notificaciones</h1>
          <small style={{ color: '#aaa' }}>{count > 0 ? `${count} sin leer` : 'Todo al día'}</small>
        </div>
        {items.length > 0 && (
          <button onClick={markAllRead} className="btn btn--primary">
            <FaCheck style={{ marginRight: 8 }} /> Marcar todas como leídas
          </button>
        )}
      </header>

      <nav style={{ display: 'flex', gap: 12, borderBottom: '1px solid #333', marginBottom: 16 }}>
        <button onClick={() => setFilter('all')} className="btn btn--outline" style={{ borderBottom: filter === 'all' ? '2px solid #646cff' : '2px solid transparent' }}>Todas ({items.length})</button>
        <button onClick={() => setFilter('unread')} className="btn btn--outline" style={{ borderBottom: filter === 'unread' ? '2px solid #646cff' : '2px solid transparent' }}>Sin leer ({count})</button>
      </nav>

      {loading ? (
        <div style={{ color: 'white' }}>Cargando…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#aaa', padding: 24 }}>
          <FaBell size={48} color="#444" />
          <p>{filter === 'unread' ? 'No tienes notificaciones sin leer' : 'No tienes notificaciones'}</p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
          {filtered.map((n) => (
            <li key={n.id} style={{ padding: 12, border: '1px solid #333', borderRadius: 8, background: n.read ? '#171717' : 'rgba(33,128,141,0.12)' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', background: '#222', borderRadius: 8 }}>{getIcon(n.type)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: 600 }}>{n.title}</div>
                  {n.body && <div style={{ color: '#bbb', fontSize: 13 }}>{n.body}</div>}
                  <div style={{ color: '#666', fontSize: 12 }}>{formatDate(n.createdAt)}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
