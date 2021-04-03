import http from '../shared/http-common';
import authHeader from "./auth-header";

class UserDataService {
  getPublicHomepage() {
    return http.get("/home", {headers: authHeader()});
  }

  getAdminDashboard() {
    return http.get("/admin", {headers: authHeader()});
  }

  getStaffDashboard() {
    return http.get("/staff", {headers: authHeader()});
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
}

export default new UserDataService();