import { describe, it, expect, vi } from "vitest";
import { deleteVideoUseCase } from "./deleteVideoUseCase";

describe("deleteVideoUseCase", () => {
  it("should call VideoRepository.deleteVideo with correct arguments", async () => {
    // 1. Arrange
    const mockVideoRepository = {
      deleteVideo: vi.fn(),
    };
    const mockResponse = { success: true };
    mockVideoRepository.deleteVideo.mockResolvedValue(mockResponse);

    const deleteVideo = deleteVideoUseCase(mockVideoRepository);

    // 2. Act
    const videoId = 123;
    const result = await deleteVideo(videoId);

    // 3. Assert
    expect(mockVideoRepository.deleteVideo).toHaveBeenCalledWith(videoId);
    expect(result).toEqual(mockResponse);
  });
});
