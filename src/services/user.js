import http from '../shared/http-common';
import authHeader from "./auth-header";

class UserDataService {
  getPublicHomepage() {
    return http.get("/home", {headers: authHeader()});
  }

  getAdminDashboard() {
    return http.get("/admin", {headers: authHeader()});
  }

  getCarerHomepage() {
    return http.get("/carer", {headers: authHeader()});
  }

  create(data) {
    return http.post('/user/add', data, {headers: authHeader()});
  }

  getStaff(nurseryId) {
    return http.get(`user/staff/${nurseryId}`);
  }

  getChildren(userId) {
    return http.get(`user/${userId}/children`);
  }

  getCarers(nurseryId) {
    return http.get(`user/carers/${nurseryId}`);
  }

  delete(id) {
    return http.delete(`/user/${id}`, {headers: authHeader()});
  }

  getUser(token) {
    return http.get(`/user/${token}`);
  }

  register(userId, password) {
    return http.put(`/user/${userId}`, {password}, {headers: authHeader()});
  }

  update(userId, data) {
    return http.put(`/user/${userId}/edit`, data, {headers: authHeader()});
  }
}

export default new UserDataService();