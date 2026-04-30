import api from './api';

const TOKEN_KEY = 'user_token';
const ROLE_KEY = 'user_role';
const NAME_KEY = 'user_name'; 

const AuthService = {
  // ── LOGIN ──────────────────────────────────────────────────
  login: async (credentials) => {
    const { email, password } = credentials;

    // Memanggil API login sesuai dokumentasi (POST /api/v1/auth/login)
    const response = await api.post('/v1/auth/login', { 
      email, 
      password 
    });

    // Sesuai dokumentasi, response sukses berisi: message, token, role
    if (response && response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(ROLE_KEY, response.role || 'user'); 
      
      // Catatan: Jika API backend tidak mengirimkan nama saat login, 
      // Anda bisa membiarkannya kosong atau mengatur default.
      // Jika backend mengirimkan nama, gunakan: response.nama (sesuaikan jika ada)
    }

    return response;
  },

  // ── REGISTER ───────────────────────────────────────────────
  register: async (userData) => {
    // Memetakan data dari form frontend ke format yang diminta API
    const payload = {
      nama: userData.namaLengkap, // Frontend mengirim namaLengkap, API meminta 'nama'
      email: userData.email,
      password: userData.password,
      // role tidak wajib dikirim, default API adalah "user"
    };

    // Memanggil API register sesuai dokumentasi (POST /api/v1/auth/register)
    const response = await api.post('/v1/auth/register', payload);

    // Register mengembalikan: message dan data (id, nama, role). Tidak ada token.
    // UI di AuthPage.jsx harus menangani redirect ke mode Login setelah sukses.
    return response;
  },

  saveToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  logout: () => {
    // Bersihkan semua data sesi pengguna saat logout
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem('user'); // berjaga-jaga jika masih ada sisa kode lama
  },

  getCurrentUser: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) return null;

    return {
      token: token,
      role: localStorage.getItem(ROLE_KEY),
      name: localStorage.getItem(NAME_KEY),
    };
  },
};

export default AuthService;