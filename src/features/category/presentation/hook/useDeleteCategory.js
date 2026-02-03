import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryRepository } from "@/app/di";
import { deleteCategoryUseCase } from "../../domain/usecase/deleteCategoryUseCase";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const deleteCategory = deleteCategoryUseCase(categoryRepository);

  return useMutation({
    mutationFn: (categoryId) => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export default useDeleteCategory;
