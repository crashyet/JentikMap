import api from './api';

const mapService = {
  async getMarkers() {
    try {
      return await api.get('/map');
    } catch (error) {
      console.error('Error fetching map markers:', error);
      throw error;
    }
  },
};

export default mapService;
