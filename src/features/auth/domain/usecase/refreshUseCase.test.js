import { describe, it, expect, vi } from "vitest";
import { refreshUseCase } from "./refreshUseCase";

describe("refreshUseCase", () => {
  it("should call AuthRepository.tokenRefresh with correct arguments", async () => {
    // 1. Arrange
    const mockAuthRepository = {
      tokenRefresh: vi.fn(),
    };
    const mockResponse = { accessToken: "new-access-token" };
    mockAuthRepository.tokenRefresh.mockResolvedValue(mockResponse);

    const refresh = refreshUseCase(mockAuthRepository);

    // 2. Act
    const refreshToken = "old-refresh-token";
    const result = await refresh(refreshToken);

    // 3. Assert
    expect(mockAuthRepository.tokenRefresh).toHaveBeenCalledWith(refreshToken);
    expect(result).toEqual(mockResponse);
  });
});
