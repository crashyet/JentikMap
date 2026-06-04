import api from './api';

const adminService = {
  // 1. Ambil daftar laporan yang menunggu verifikasi
  async getPendingReports() {
    try {
      const response = await api.get('/v1/admin/reports/pending');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching pending reports:', error);
      throw error;
    }
  },

  // 2. Verifikasi laporan (Terima/Tolak)
  async verifyReport(id, status, catatan = '') {
    try {
      const response = await api.put(`/v1/admin/reports/${id}/verify`, {
        status, // 'accepted' atau 'rejected'
        catatan
      });
      return response;
    } catch (error) {
      console.error('Error verifying report:', error);
      throw error;
    }
  },

  // 3. Catat Intervensi (Fogging, dll)
  async createIntervention(data) {
    try {
      const response = await api.post('/v1/admin/interventions', data);
      return response;
    } catch (error) {
      console.error('Error creating intervention:', error);
      throw error;
    }
  },

  async getKaders() {
    try {
      // Asumsi endpoint dari backend nantinya: /v1/admin/kaders
      // Jika backend belum siap, kita bisa me-return data dummy (mock) sementara
      // const response = await api.get('/v1/admin/kaders');
      // return response.data;
      
      // RETURN DATA DUMMY SEMENTARA SAMPAI API BACKEND JADI
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, nama: "Siti Aminah", wilayah: "RW 03 - Tambakreja", total_validasi: 124, is_active: true },
            { id: 2, nama: "Budi Santoso", wilayah: "RW 01 - Donan", total_validasi: 89, is_active: true },
            { id: 3, nama: "Ratna Sari", wilayah: "RW 05 - Sidanegara", total_validasi: 42, is_active: false },
          ]);
        }, 1000); // Simulasi loading 1 detik
      });
    } catch (error) {
      console.error('Error fetching kaders:', error);
      throw error;
    }
  },

  async deleteKader(id) {
    try {
      // Asumsi endpoint: DELETE /v1/admin/kaders/:id
      // await api.delete(`/v1/admin/kaders/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting kader:', error);
      throw error;
    }
  },

  // 6. Ambil daftar warga (API Real)
  async getWargas() {
    try {
      // Ganti URL ini sesuai dengan yang dibuat oleh Backend Developer Anda nanti
      const response = await api.get('/v1/admin/users');
      
      // Kembalikan data dari database
      return response.data;
      
    } catch (error) {
      console.error('Error fetching wargas:', error);
      throw error;
    }
  }
};

export default adminService;