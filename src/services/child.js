import http from '../shared/http-common';
import authHeader from "./auth-header";

class ChildDataService {
  getAll() {
    return http.get('/children');
  }

  get(id) {
    return http.get(`/children/${id}`);
  }

  getByCarerId(carerId) {
    return http.get(`/children/${carerId}`)
  }
  getJournal(date, id) {
    return http.get(`/child/${id}/journal/${date}`);
  }

  create(data) {
    return http.post('/child/add', data, {headers: authHeader()});
  }

  update(id, data) {
    return http.put(`/children/${id}`, data);
  }

  delete(id) {
    return http.delete(`/children/${id}`);
  }
}

export default new ChildDataService();