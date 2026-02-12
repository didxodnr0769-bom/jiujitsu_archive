import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryRepository } from "@/app/di";
import { updateCategoryUseCase } from "../../domain/usecase/updateCategoryUseCase";

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const updateCategory = updateCategoryUseCase(categoryRepository);

  return useMutation({
    mutationFn: ({ categoryId, categoryData }) => updateCategory(categoryId, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export default useUpdateCategory;
