import http from '../shared/http-common';
import authHeader from "./auth-header";

class UserService {
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
}

export default new UserService();