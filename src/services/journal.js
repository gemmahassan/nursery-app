import http from "../shared/http-common";
import authHeader from "./auth-header";

class JournalDataService {
  create(data, nurseryId) {
    return http.post(`/journal/${nurseryId}`, data, { headers: authHeader() });
  }

  edit(data, journalId) {
    return http.put(`/journal/${journalId}`, data, { headers: authHeader() });
  }

  delete(journalId) {
    return http.put(`/journal/${journalId}/delete`, null, {
      headers: authHeader(),
    });
  }

  getTypes() {
    return http.get("/journal/types");
  }
}

export default new JournalDataService();
