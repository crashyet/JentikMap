const BASE_URL = import.meta.env.VITE_API_URL || 'https://gdgoc.skyibe.my.id/api';
const TOKEN_KEY = 'user_token';

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} ${response.statusText}${errorText ? `: ${errorText}` : ''}`);
    }
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} ${response.statusText}${errorText ? `: ${errorText}` : ''}`);
    }
    return response.json();
  },

  async postForm(endpoint, formData) {
    const headers = getAuthHeaders();
    if (!headers.Authorization) {
      throw new Error('Token otentikasi tidak ditemukan. Silakan masuk terlebih dahulu.');
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} ${response.statusText}${errorText ? `: ${errorText}` : ''}`);
    }
    return response.json();
  },
};

export default api;
