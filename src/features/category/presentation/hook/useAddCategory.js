import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryRepository } from "@/app/di";
import { addCategoryUseCase } from "../../domain/usecase/addCategoryUseCase";

const useAddCategory = () => {
  const queryClient = useQueryClient();
  const addCategory = addCategoryUseCase(categoryRepository);

  return useMutation({
    mutationFn: (categoryData) => addCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export default useAddCategory;
