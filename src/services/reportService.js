import api from './api';

const reportService = {
  async submitReport(formData) {
    try {
      // Ambil role dari localStorage untuk menentukan endpoint
      const role = localStorage.getItem('user_role') || 'user';
      
      // Jika role adalah kader, gunakan endpoint kader, selain itu gunakan endpoint user
      const endpoint = role === 'kader' ? '/v1/kader/reports' : '/v1/user/reports';

      // Gunakan api.postForm yang sudah kita buat sebelumnya untuk menangani multipart/form-data
      const response = await api.postForm(endpoint, formData);
      return response;
    } catch (error) {
      console.error('Error submitting report:', error);
      throw error;
    }
  }
};

export default reportService;