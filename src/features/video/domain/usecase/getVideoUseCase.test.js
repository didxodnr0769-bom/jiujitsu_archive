import { describe, it, expect, vi } from "vitest";
import { getVideoUseCase } from "./getVideoUseCase";

describe("getVideoUseCase", () => {
  it("should call VideoRepository.getVideoList with correct arguments", async () => {
    // 1. Arrange
    const mockVideoRepository = {
      getVideoList: vi.fn(),
    };
    const mockResponse = [
      { id: 1, title: "Video 1" },
      { id: 2, title: "Video 2" },
    ];
    mockVideoRepository.getVideoList.mockResolvedValue(mockResponse);

    const getVideo = getVideoUseCase(mockVideoRepository);

    // 2. Act
    const categoryId = 5;
    const result = await getVideo(categoryId);

    // 3. Assert
    expect(mockVideoRepository.getVideoList).toHaveBeenCalledWith(categoryId);
    expect(result).toEqual(mockResponse);
  });
});
