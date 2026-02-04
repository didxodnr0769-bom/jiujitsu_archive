import { describe, it, expect, vi } from "vitest";
import { loginUseCase } from "./loginUseCase";

describe("loginUseCase", () => {
  it("should call AuthRepository.getTokenByIdPw with correct arguments", async () => {
    // 1. Arrange (준비)
    // 가짜 Repository 생성 (Mocking)
    const mockAuthRepository = {
      getTokenByIdPw: vi.fn(), // 호출 여부를 감시할 수 있는 함수
    };

    // 가짜 응답 데이터 설정
    const mockResponse = {
      token: "fake-token-123",
      user: { id: "test", name: "tester" },
    };
    mockAuthRepository.getTokenByIdPw.mockResolvedValue(mockResponse);

    // UseCase 초기화
    const login = loginUseCase(mockAuthRepository);

    // 2. Act (실행)
    const userId = "testuser";
    const password = "password123";
    const result = await login(userId, password);

    // 3. Assert (검증)
    // Repository 함수가 정확한 인자로 호출되었는지 확인
    expect(mockAuthRepository.getTokenByIdPw).toHaveBeenCalledWith(
      userId,
      password,
    );

    // 결과값이 예상한 대로인지 확인
    expect(result).toEqual(mockResponse);
  });
});
