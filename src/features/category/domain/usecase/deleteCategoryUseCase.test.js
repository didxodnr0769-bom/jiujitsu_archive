import { describe, it, expect, vi } from "vitest";
import { deleteCategoryUseCase } from "./deleteCategoryUseCase";

describe("deleteCategoryUseCase", () => {
  it("should call repository.deleteCategory with correct arguments", async () => {
    // 1. Arrange
    const mockRepository = {
      deleteCategory: vi.fn(),
    };
    const mockResponse = { success: true };
    mockRepository.deleteCategory.mockResolvedValue(mockResponse);

    const deleteCategory = deleteCategoryUseCase(mockRepository);

    // 2. Act
    const categoryId = 123;
    const result = await deleteCategory(categoryId);

    // 3. Assert
    expect(mockRepository.deleteCategory).toHaveBeenCalledWith(categoryId);
    expect(result).toEqual(mockResponse);
  });
});
