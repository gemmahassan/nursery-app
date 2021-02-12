import http from '../shared/http-common';

class JournalTypeDataService {
  getAll() {
    return http.get('/journal/types');
  }
}

export default new JournalTypeDataService();