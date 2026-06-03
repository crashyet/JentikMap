import api from './api';

const mapService = {
  // 1. Ambil data Heatmap
  async getMarkers() {
    try {
      const response = await api.get('/v1/heatmap');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching heatmap markers:', error);
      throw error;
    }
  },

  // 2. Simpan/Update Lokasi User
  async updateUserLocation(lat, lng) {
    try {
      // Menggunakan fungsi api.put yang baru kita buat
      const response = await api.put('/v1/user/location', {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });
      return response;
    } catch (error) {
      console.error('Error updating user location:', error);
      throw error;
    }
  },

  // 3. Radar Warga: Cek Jarak Public (Berdasarkan koordinat saat ini)
  async checkDistancePublic(lat, lng) {
    try {
      const response = await api.get(`/v1/check-distance?lat=${lat}&lng=${lng}`);
      return response;
    } catch (error) {
      console.error('Error checking public distance:', error);
      throw error;
    }
  },

  // 4. Radar Warga: Cek Jarak User Terautentikasi (Berdasarkan lokasi akun)
  async checkDistanceUser() {
    try {
      const response = await api.get('/v1/user/check-distance');
      return response;
    } catch (error) {
      console.error('Error checking user distance:', error);
      throw error;
    }
  }
};

export default mapService;