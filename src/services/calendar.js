import http from '../shared/http-common';
import authHeader from "./auth-header";

class CalendarDataService {
  getAllCalendarEntries(nurseryId) {
    return http.get(`/calendar/${nurseryId}`);
  }

  create(data) {
    return http.post('/calendar/add', data, {headers: authHeader()});
  }

  update(calendarId, data) {
    return http.put(`/calendar/${calendarId}`, data, {headers: authHeader()});
  }

  delete(calendarId) {
    return http.delete(`calendar/${calendarId}`, {headers: authHeader()});
  }
}

export default new CalendarDataService;