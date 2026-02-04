import { describe, it, expect, vi } from "vitest";
import { addCategoryUseCase } from "./addCategoryUseCase";

describe("addCategoryUseCase", () => {
  it("should call repository.addCategory with correct arguments", async () => {
    // 1. Arrange
    const mockRepository = {
      addCategory: vi.fn(),
    };
    const mockResponse = { id: 1, name: "New Category" };
    mockRepository.addCategory.mockResolvedValue(mockResponse);

    const addCategory = addCategoryUseCase(mockRepository);

    // 2. Act
    const categoryData = { name: "New Category" };
    const result = await addCategory(categoryData);

    // 3. Assert
    expect(mockRepository.addCategory).toHaveBeenCalledWith(categoryData);
    expect(result).toEqual(mockResponse);
  });
});
