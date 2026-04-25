import api from './api';

const TOKEN_KEY = 'user_token';
const USER_KEY = 'user';
const LOGIN_PATHS = [
  '/auth/login',
  '/v1/auth/login',
  '/v1/user/login',
  '/auth/local',
  '/v1/auth/local',
  '/user/auth',
  '/v1/user/auth',
  '/login',
  '/v1/login',
  '/user/login',
];
const REGISTER_PATHS = [
  '/auth/register',
  '/v1/auth/register',
  '/v1/user/register',
  '/register',
  '/v1/register',
  '/user/register',
  '/auth/local/register',
  '/v1/auth/local/register',
];

const tryPostPaths = async (paths, payload) => {
  let lastError = null;
  for (const path of paths) {
    try {
      return await api.post(path, payload);
    } catch (error) {
      lastError = error;
      if (!error.message.includes('404')) {
        // If error is not file-not-found, stop and propagate it.
        throw error;
      }
    }
  }
  throw lastError;
};

const AuthService = {
  login: async (credentials) => {
    return tryPostPaths(LOGIN_PATHS, credentials);
  },

  register: async (userData) => {
    return tryPostPaths(REGISTER_PATHS, userData);
  },

  saveToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
};

export default AuthService;
