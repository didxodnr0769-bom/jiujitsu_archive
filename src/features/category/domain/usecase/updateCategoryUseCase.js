export const updateCategoryUseCase = (repository) => async (categoryId, categoryData) => {
  return await repository.updateCategory(categoryId, categoryData);
};
