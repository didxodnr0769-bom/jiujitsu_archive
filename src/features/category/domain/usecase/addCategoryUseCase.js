export const addCategoryUseCase = (repository) => async (categoryData) => {
  return await repository.addCategory(categoryData);
};
