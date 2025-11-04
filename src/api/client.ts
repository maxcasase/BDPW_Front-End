export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const authAPI = {
  async login(payload: { email: string; password: string }) {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Login inválido');
    return res.json();
  },
  async me(token: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Token inválido');
    return res.json();
  },
};

export const notificationsAPI = {
  async list(token: string) {
    // Si tienes una ruta real, cámbiala aquí
    const res = await fetch(`${API_BASE_URL}/api/v1/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });
    if (!res.ok) return [];
    return res.json();
  },
};

export const reviewsAPI = {
  async listByAlbum(albumId: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/reviews?albumId=${encodeURIComponent(albumId)}`);
    if (!res.ok) throw new Error('No se pudieron obtener reseñas');
    return res.json();
  },
  async create(body: { albumId: string; rating: number; comment: string }, token: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/reviews`, {
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
