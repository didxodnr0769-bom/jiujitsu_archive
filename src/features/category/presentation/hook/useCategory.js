import { categoryRepository } from "@/app/di";
import { getCategoryUseCase } from "../../domain/usecase/getCategoryUseCase";
import { useQuery } from "@tanstack/react-query";

const useCategory = () => {
  const getCategory = getCategoryUseCase(categoryRepository);

  const { data, isPending, isError } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(),
  });

  console.log(data, isError);
  return { categoryList: data?.result?.categories || [], isPending, isError };
};
export default useCategory;
