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

  // 4. Ambil daftar kader (API Real)
  async getKaders() {
    try {
      const response = await api.get('/v1/admin/users?role=kader');
      // Axios menyimpan response json di dalam .data
      // Dan format JSON dari backend Anda juga memiliki field "data" yang berisi array
      return response.data.data || []; 
    } catch (error) {
      console.error('Error fetching kaders:', error);
      throw error;
    }
  },

  // 5. Hapus Kader (API Real)
  async deleteKader(id) {
    try {
      await api.delete(`/v1/admin/users/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting kader:', error);
      throw error;
    }
  },

  // 6. Tambah Kader Baru (API Real)
  async createKader(kaderData) {
    try {
      // kaderData berisi { nama, email, password, role: 'kader' }
      const response = await api.post('/v1/admin/users', kaderData);
      return response.data;
    } catch (error) {
      console.error('Error creating kader:', error);
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
  },

  // 1. Ambil ringkasan wilayah (Untuk Kartu)
  async getDistrictSummary() {
    try {
      const response = await api.get('/v1/admin/districts/summary');
      return response.data.data; // Mengembalikan { rawan, waspada, aman }
    } catch (error) {
      console.error('Error fetching district summary:', error);
      throw error;
    }
  },

  // 2. Ambil daftar semua wilayah (Untuk Tabel)
  async getDistricts() {
    try {
      const response = await api.get('/v1/admin/districts');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching districts:', error);
      throw error;
    }
  },

  // 3. Hapus Wilayah
  async deleteDistrict(id) {
    try {
      const response = await api.delete(`/v1/admin/districts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting district:', error);
      throw error;
    }
  },

  // 4. Sinkronkan ulang (Re-assign) laporan ke wilayah masing-masing
  async reassignDistricts() {
    try {
      const response = await api.post('/v1/admin/districts/reassign');
      return response.data;
    } catch (error) {
      console.error('Error reassigning districts:', error);
      throw error;
    }
  }
};

export default adminService;