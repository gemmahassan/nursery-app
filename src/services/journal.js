import http from '../shared/http-common';
import authHeader from "./auth-header";

class JournalDataService {
  create(data, nurseryId) {
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
    return http.post(`/nurseries/${nurseryId}/journal/add`, data, {headers: authHeader()});
  }

  edit(data, childId, journalId) {
    return http.put(`/child/${childId}/journal/${journalId}`, data);
  }

  delete(childId, journalId) {
    return http.delete(`/child/${childId}/journal/${journalId}`);
  }
}

export default new JournalDataService();