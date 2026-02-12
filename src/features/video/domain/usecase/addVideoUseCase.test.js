import { describe, it, expect, vi } from "vitest";
import { addVideoUseCase } from "./addVideoUseCase";

describe("addVideoUseCase", () => {
  it("should call VideoRepository.addVideo with correct arguments", async () => {
    // 1. Arrange
    const mockVideoRepository = {
      addVideo: vi.fn(),
    };
    const mockResponse = { id: 1, title: "New Video" };
    mockVideoRepository.addVideo.mockResolvedValue(mockResponse);

    const addVideo = addVideoUseCase(mockVideoRepository);

    // 2. Act
    const videoData = { title: "New Video", url: "http://example.com" };
    const result = await addVideo(videoData);

    // 3. Assert
    expect(mockVideoRepository.addVideo).toHaveBeenCalledWith(videoData);
    expect(result).toEqual(mockResponse);
  });
});
