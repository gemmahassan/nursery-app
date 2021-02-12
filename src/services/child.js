import http from '../shared/http-common';

class ChildDataService {
  getAll() {
    return http.get('/children');
  }

  get(id) {
    return http.get(`/children/${id}`);
  }

  getJournal(date, id) {
    return http.get(`/child/${id}/journal/${date}`);
  }

  create(data) {
    return http.post('/children', data);
  }

  update(id, data) {
    return http.put(`/children/${id}`, data);
  }

  delete(id) {
    return http.delete(`/children/${id}`);
  }
}

export default new ChildDataService();