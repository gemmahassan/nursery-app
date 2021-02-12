import http from '../shared/http-common';

class JournalDataService {
  create(data, id) {
    return http.post(`/nurseries/${id}/journal/add`, data);
  }
}

export default new JournalDataService();