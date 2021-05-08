import http from '../shared/http-common';
import authHeader from "./auth-header";

class UserDataService {
  // stores jwt in localStorage on successful login
  login(username, password) {
    return http.post("/user/login", {
      username,
      password,
    })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  create(data) {
    return http.post('/users/add', data, {headers: authHeader()});
  }

  getStaff(nurseryId) {
    return http.get(`/users/staff/${nurseryId}`);
  }

  getCarers(nurseryId) {
    return http.get(`/users/carers/${nurseryId}`);
  }

  getChildrenOfCarer(userId) {
    return http.get(`/users/${userId}/children`);
  }

  delete(id) {
    return http.put(`/users/${id}/delete`, {headers: authHeader()});
  }

  getUserForSignup(token) {
    return http.get(`/users/${token}`);
  }

  completeRegistration(userId, password) {
    return http.put(`/users/${userId}`, {password}, {headers: authHeader()});
  }

  update(userId, firstName, surname) {
    console.log("!!!!!!!", firstName);
    return http.put(`/users/${userId}/edit`, {firstName, surname}, {headers: authHeader()});
  }
}

export default new UserDataService();