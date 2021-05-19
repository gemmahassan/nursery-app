import http from "../shared/http-common";
import authHeader from "./auth-header";

class ChildDataService {
  getByCarerId(carerId) {
    return http.get(`/children/${carerId}`, { headers: authHeader() });
  }

  getById(childId) {
    return http.get(`/children/${childId}`, { headers: authHeader() });
  }

  getJournal(date, id) {
    return http.get(`/children/${id}/journal/${date}`, {
      headers: authHeader(),
    });
  }

  create(data) {
    return http.post("/children/add", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/children/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/children/${id}`, { headers: authHeader() });
  }
}

export default new ChildDataService();
