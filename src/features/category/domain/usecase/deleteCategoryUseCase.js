export const deleteCategoryUseCase = (repository) => async (categoryId) => {
  return await repository.deleteCategory(categoryId);
};
