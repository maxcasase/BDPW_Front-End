// Production API client - forced URL to resolve deployment cache issues
export const API_BASE_URL = 'https://bd-y-pw.onrender.com';

export const authAPI = {
  async login(payload: { email: string; password: string }) {
    const url = `${API_BASE_URL}/api/v1/auth/login`;
    console.log('[authAPI.login] URL:', url);
    console.log('[authAPI.login] Method: POST');
    console.log('[authAPI.login] Payload:', payload);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('[authAPI.login] Status:', res.status);
    const data = await res.json().catch(() => null);
    console.log('[authAPI.login] Response JSON:', data);

    if (!res.ok) throw new Error(data?.message || 'Login inválido');
    return data;
  },
  async me(token: string) {
    const url = `${API_BASE_URL}/api/v1/auth/me`;
    console.log('[authAPI.me] URL:', url);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || 'Token inválido');
    return data;
  },
};

export const notificationsAPI = {
  async list(token: string) {
    const url = `${API_BASE_URL}/api/v1/notifications`;
    console.log('[notificationsAPI.list] URL:', url);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    return res.json();
  },
};

export const reviewsAPI = {
  async listByAlbum(albumId: string) {
    const url = `${API_BASE_URL}/api/v1/reviews?albumId=${encodeURIComponent(albumId)}`;
    console.log('[reviewsAPI.listByAlbum] URL:', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('No se pudieron obtener reseñas');
    return res.json();
  },
  async create(body: { albumId: string; rating: number; comment: string }, token: string) {
    const url = `${API_BASE_URL}/api/v1/reviews`;
    console.log('[reviewsAPI.create] URL:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || 'No se pudo crear la reseña');
    return data;
  },
};