import http from "../shared/http-common";
import authHeader from "./auth-header";

class CarerDataService {
  addCarer(userId, childId, nurseryId) {
    return http.post(
      "/carer/add",
      { userId, childId, nurseryId },
      { headers: authHeader() }
    );
  }
}

export default new CarerDataService();
