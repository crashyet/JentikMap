import api from './api';

// Gunakan URL dari .env atau fallback ke default server
const BASE_URL = import.meta.env.VITE_API_URL || 'https://gdgoc.skyibe.my.id';

const adminService = {
  // ==========================================
  // 1. DASHBOARD & NOTIFIKASI
  // ==========================================
  
  async getDashboardSummary() {
    try {
      const response = await api.get('/v1/admin/dashboard');
      // Sesuai API Docs: response.data.data berisi { total_warga, kader_aktif, laporan_pending... }
      return response.data.data; 
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      throw error;
    }
  },

  listenEmergencyNotifications(onMessageCallback, onErrorCallback) {
    const token = localStorage.getItem('user_token');
    if (!token) return null;

    // Bawaan browser EventSource tidak bisa kirim header Authorization, 
    // jadi kita selipkan token di URL parameter
    const streamUrl = `${BASE_URL}/api/v1/admin/notifications/stream?token=${token}`;
    const eventSource = new EventSource(streamUrl);
    
    eventSource.addEventListener('emergency', (event) => {
      const data = JSON.parse(event.data);
      if (onMessageCallback) onMessageCallback(data);
    });

    eventSource.onerror = (error) => {
      if (onErrorCallback) onErrorCallback(error);
      eventSource.close();
    };

    return eventSource;
  },

  // ==========================================
  // 2. MANAJEMEN LAPORAN (VERIFIKASI & INTERVENSI)
  // ==========================================

  async getPendingReports() {
    try {
      const response = await api.get('/v1/admin/reports/pending');
      // Sesuai API Docs: Array laporan ada di dalam properti 'data'
      return response.data.data || []; 
    } catch (error) {
      console.error('Error fetching pending reports:', error);
      throw error;
    }
  },

  async verifyReport(id, status, catatan = '') {
    try {
      const response = await api.put(`/v1/admin/reports/${id}/verify`, {
        status, // 'accepted' atau 'rejected'
        catatan
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying report:', error);
      throw error;
    }
  },

  async createIntervention(data) {
    try {
      const response = await api.post('/v1/admin/interventions', data);
      return response.data;
    } catch (error) {
      console.error('Error creating intervention:', error);
      throw error;
    }
  },

  // ==========================================
  // 3. MANAJEMEN USER (KADER & WARGA)
  // ==========================================

  async getKaders() {
    try {
      const response = await api.get('/v1/admin/users?role=kader');
      return response.data.data || []; 
    } catch (error) {
      console.error('Error fetching kaders:', error);
      throw error;
    }
  },

  async getWargas() {
    try {
      // Wajib memanggil role=user agar terpisah dari admin dan kader
      const response = await api.get('/v1/admin/users?role=user');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching wargas:', error);
      throw error;
    }
  },

  async createKader(kaderData) {
    try {
      const response = await api.post('/v1/admin/users', kaderData);
      return response.data;
    } catch (error) {
      console.error('Error creating kader:', error);
      throw error;
    }
  },

  async deleteKader(id) {
    try {
      const response = await api.delete(`/v1/admin/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting kader:', error);
      throw error;
    }
  },

  // ==========================================
  // 4. MANAJEMEN WILAYAH (DISTRICTS)
  // ==========================================

  async getDistrictSummary() {
    try {
      const response = await api.get('/v1/admin/districts/summary');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching district summary:', error);
      throw error;
    }
  },

  async getDistricts() {
    try {
      const response = await api.get('/v1/admin/districts');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching districts:', error);
      throw error;
    }
  },

  async createDistrict(districtData) {
    try {
      const response = await api.post('/v1/admin/districts', districtData);
      return response.data;
    } catch (error) {
      console.error('Error creating district:', error);
      throw error;
    }
  },

  async deleteDistrict(id) {
    try {
      const response = await api.delete(`/v1/admin/districts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting district:', error);
      throw error;
    }
  },

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