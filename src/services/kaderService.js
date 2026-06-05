import api from './api';

const kaderService = {
  // 1. Kirim Laporan Darurat (Suspek DBD)
  // Membutuhkan FormData karena mengirim gambar
  async reportEmergency(formData) {
    try {
      const response = await api.post('/v1/kader/emergency', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error reporting emergency:', error);
      throw error;
    }
  },

  // 2. Ambil Riwayat Semua Laporan Kader
  async getHistory() {
    try {
      const response = await api.get('/v1/kader/history');
      // Berdasarkan struktur respons dari backend: { status, data: [...] }
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching kader history:', error);
      throw error;
    }
  },

  // 3. Ambil Titik Rawan (Blank Spots) untuk Peta
  async getBlankSpots() {
    try {
      const response = await api.get('/v1/kader/blank-spots');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching blank spots:', error);
      throw error;
    }
  },

  // 4. Submit Laporan Reguler Kader (Untuk form lapor jentik biasa)
  async submitReport(formData) {
    try {
      const response = await api.post('/v1/kader/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting kader report:', error);
      throw error;
    }
  }
};

export default kaderService;