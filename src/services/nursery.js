import http from "../shared/http-common";
import authHeader from "./auth-header";

class NurseryDataService {
  getAllConfirmed() {
    return http.get("/nurseries/confirmed");
  }

  addJournalEntry(data, nurseryId) {
    return http.post(`/nurseries/${nurseryId}/journal/add`, data, {
      headers: authHeader(),
    });
  }

  getAllPending() {
    return http.get("/nurseries/pending", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/nurseries/${id}`, { headers: authHeader() });
  }

  getChildren(id) {
    return http.get(`/nurseries/${id}/children`, { headers: authHeader() });
  }

  contact(data) {
    return http.post("nurseries/contact", data);
  }

  signup(id, data) {
    return http.put(`/nurseries/signup/${id}`, data);
  }

  update(id, data) {
    return http.put(`/nurseries/${id}`, data, { headers: authHeader() });
  }

  approve(id, data) {
    return http.put(`/nurseries/${id}/approve`, data, {
      headers: authHeader(),
    });
  }

  delete(id) {
    return http.delete(`/nurseries/${id}/decline`, { headers: authHeader() });
  }

  purge() {
    return http.delete(`/nurseries/purge`, { headers: authHeader() });
  }

  deactivate(id) {
    return http.put(
      `/nurseries/${id}/deactivate`,
      {},
      { headers: authHeader() }
    );
  }
}

export default new NurseryDataService();
