import http from '../shared/http-common';
import authHeader from "./auth-header";

class StaffDataService {
  getAll() {
    return http.get('/staff');
  }

  getStaffByNurseryId(id) {
    return http.get(`/staff/${id}`, {headers: authHeader()});
  }

  create(data) {
    return http.post('/staff/add', data, {headers: authHeader()});
  }

  update(data) {
    return http.put(`/staff/${data.staffId}/update`, data, {headers: authHeader()});
  }

  delete(id) {
    return http.delete(`/staff/${id}`);
  }
}

export default new StaffDataService();