import http from "../shared/http-common";
import authHeader from "./auth-header";

class UserDataService {
  // stores jwt in localStorage on successful login
  login(username, password) {
    return http
      .post("/user/login", {
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

  create(firstName, surname, email, nurseryId, userRole) {
    return http.post(
      "/users/add",
      { firstName, surname, email, nurseryId, userRole },
      { headers: authHeader() }
    );
  }

  getStaff(nurseryId) {
    return http.get(`/users/staff/${nurseryId}`, { headers: authHeader() });
  }

  getCarers(nurseryId) {
    return http.get(`/users/carers/${nurseryId}`, { headers: authHeader() });
  }

  getChildrenOfCarer(userId) {
    return http.get(`/users/${userId}/children`, { headers: authHeader() });
  }

  delete(id) {
    return http.put(`/users/${id}/delete`, {}, { headers: authHeader() });
  }

  getUserForSignup(token) {
    return http.get(`/users/${token}`);
  }

  completeRegistration(userId, password) {
    return http.put(
      `/users/${userId}`,
      { password },
      { headers: authHeader() }
    );
  }

  update(userId, firstName, surname) {
    return http.put(
      `/users/${userId}/edit`,
      { firstName, surname },
      { headers: authHeader() }
    );
  }
}

export default new UserDataService();
