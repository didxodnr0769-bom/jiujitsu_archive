export function getCategoryUseCase(CategoryRepository) {
  return async function getCategory() {
    const response = await CategoryRepository.getCategoryList();
    console.log(response);
    return response;
  };
}
