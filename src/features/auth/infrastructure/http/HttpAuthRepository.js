import { UserRepository } from "../../domain/repository/UserRepository.js";
import api from "../../../../shared/axios/axios.js";

export class HttpAuthRepository extends UserRepository {
  async getTokenByIdPw(id, password) {
    const response = await api.post("/auth/login", { id, password });
    return response.data;
  }
  async tokenRefresh(refreshToken) {
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  }
}
