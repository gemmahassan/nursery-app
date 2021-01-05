import http from '../shared/http-common';

class NurseryDataService {
  getAll() {
    return http.get('/nurseries');
  }

  get(id) {
    return http.get(`nurseries/${id}`);
  }

  create(data) {
    return http.post('/nurseries', data);
  }

  update(id, data) {
    return http.put(`/nurseries/${id}`, data);
  }

  delete(id) {
    return http.delete(`nurseries/${id}`);
  }
}

export default new NurseryDataService();