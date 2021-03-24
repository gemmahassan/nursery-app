import http from '../shared/http-common';

class NurseryDataService {
  getAllConfirmed() {
    return http.get('/nurseries/confirmed');
  }

  getAllPending() {
    return http.get('/nurseries/pending');
  }

  getAll() {
    return http.get('/nurseries');
  }

  get(id) {
    return http.get(`nurseries/${id}`);
  }

  getChildren(id) {
    return http.get(`nurseries/${id}/children`);
  }

  contact(data) {
    return http.post('/contact', data);
  }

  signup(id, data) {
    return http.put(`/signup/${id}`, data);
  }

  update(id, data) {
    return http.put(`/nurseries/${id}`, data);
  }

  approve(id) {
    return http.put(`/admin/${id}/approve`);
  }

  delete(id) {
    return http.delete(`admin/${id}/decline`);
  }
}

export default new NurseryDataService();
