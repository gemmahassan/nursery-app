import http from '../shared/http-common';

class JournalDataService {
  create(data, nid) {
    return http.post(`/nurseries/${nid}/journal/add`, data);
  }

  edit(data, cid, jid) {
    return http.put(`/child/${cid}/journal/${jid}/edit`, data);
  }
}

export default new JournalDataService();