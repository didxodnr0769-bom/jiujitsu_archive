import { describe, it, expect, vi } from "vitest";
import { getCategoryUseCase } from "./getCategoryUseCase";

describe("getCategoryUseCase", () => {
  it("should call CategoryRepository.getCategoryList", async () => {
    // 1. Arrange
    const mockCategoryRepository = {
      getCategoryList: vi.fn(),
    };
    const mockResponse = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];
    mockCategoryRepository.getCategoryList.mockResolvedValue(mockResponse);

    const getCategory = getCategoryUseCase(mockCategoryRepository);

    // 2. Act
    const result = await getCategory();

    // 3. Assert
    expect(mockCategoryRepository.getCategoryList).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});
