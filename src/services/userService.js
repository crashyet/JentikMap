import api from './api';

const userService = {
  // Mengambil riwayat laporan milik user yang sedang login
  async getHistory() {
    try {
      const response = await api.get('/v1/user/history');
      // Sesuai standar response API di dokumen Anda: { status, data: [...] }
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching user history:', error);
      throw error;
    }
  }
};

export default userService;