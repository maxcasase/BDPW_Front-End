export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const authAPI = {
  async me(token: string) {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Token inválido');
    return res.json();
  },
};

export const notificationsAPI = {
  async list(token: string) {
    const res = await fetch(`${API_BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });
    if (!res.ok) throw new Error('No se pudieron obtener notificaciones');
    return res.json();
  },
};

export const reviewsAPI = {
  async listByAlbum(albumId: string) {
    const res = await fetch(`${API_BASE_URL}/albums/${albumId}/reviews`);
    if (!res.ok) throw new Error('No se pudieron obtener reseñas');
    return res.json();
  },
  async create(albumId: string, body: { rating: number; comment: string }, token: string) {
    const res = await fetch(`${API_BASE_URL}/albums/${albumId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('No se pudo crear la reseña');
    return res.json();
  },
};
