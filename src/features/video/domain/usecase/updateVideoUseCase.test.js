import { describe, it, expect, vi } from "vitest";
import { updateVideoUseCase } from "./updateVideoUseCase";

describe("updateVideoUseCase", () => {
  it("should call VideoRepository.updateVideo with correct arguments", async () => {
    // 1. Arrange
    const mockVideoRepository = {
      updateVideo: vi.fn(),
    };
    const mockResponse = { id: 1, title: "Updated Video" };
    mockVideoRepository.updateVideo.mockResolvedValue(mockResponse);

    const updateVideo = updateVideoUseCase(mockVideoRepository);

    // 2. Act
    const videoId = 1;
    const videoData = { title: "Updated Video" };
    const result = await updateVideo(videoId, videoData);

    // 3. Assert
    expect(mockVideoRepository.updateVideo).toHaveBeenCalledWith(
      videoId,
      videoData,
    );
    expect(result).toEqual(mockResponse);
  });
});
