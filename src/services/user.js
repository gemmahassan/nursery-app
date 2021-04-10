import http from '../shared/http-common';
import authHeader from "./auth-header";

class UserDataService {
  create(data) {
    return http.post('/users/add', data, {headers: authHeader()});
  }

  getStaff(nurseryId) {
    return http.get(`/users/staff/${nurseryId}`);
  }

  getChildren(userId) {
    return http.get(`/users/${userId}/children`);
  }

  getCarers(nurseryId) {
    return http.get(`/users/carers/${nurseryId}`);
  }

  delete(id) {
    return http.delete(`/users/${id}`, {headers: authHeader()});
  }

  getUser(token) {
    return http.get(`/users/${token}`);
  }

  register(userId, password) {
    return http.put(`/users/${userId}`, {password}, {headers: authHeader()});
  }

  update(userId, data) {
    return http.put(`/users/${userId}/edit`, data, {headers: authHeader()});
  }
}

export default new UserDataService();