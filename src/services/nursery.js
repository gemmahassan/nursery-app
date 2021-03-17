import http from '../shared/http-common';

class NurseryDataService {
  getAll() {
    return http.get('/nurseries');
  }

  get(id) {
    return http.get(`nurseries/${id}`);
  }

  getChildren(id) {
    return http.get(`nurseries/${id}/children`);
  }

  signup(formData) {
    return http.post('/nursery/signup', (formData));
  }

  update(id, data) {
    return http.put(`/nurseries/${id}`, data);
  }

  delete(id) {
    return http.delete(`nurseries/${id}`);
  }
}

export default new NurseryDataService();
