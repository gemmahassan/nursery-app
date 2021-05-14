import http from "../shared/http-common";
import authHeader from "./auth-header";

class CarerDataService {
  addCarer(userId, childId) {
    return http.post(
      "/carer/add",
      { userId, childId },
      { headers: authHeader() }
    );
  }
}

export default new CarerDataService();
