/**
 * @interface UserRepository
 * @description 사용자 관련 데이터 접근을 위한 리포지토리 인터페이스
 */
export class UserRepository {
  async getTokenByIdPw(id, password) {
    throw new Error("getTokenByIdPw must be implemented");
  }

  async tokenRefresh(refreshToken) {
    throw new Error("tokenRefresh must be implemented");
  }
}
