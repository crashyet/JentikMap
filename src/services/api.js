const BASE_URL = import.meta.env.VITE_API_URL || 'https://gdgoc.skyibe.my.id/api';

const api = {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  async postForm(endpoint, formData) {
    const token = localStorage.getItem('user_token');
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
};

export default api;
