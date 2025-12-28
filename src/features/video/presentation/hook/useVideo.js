import { useQuery } from "@tanstack/react-query";
import { getVideoUseCase } from "../../domain/usecase/getVideoUseCase";
import { videoRepository } from "@/app/di";

const useVideo = (categoryId) => {
  const videoFn = getVideoUseCase(videoRepository);

  const category = categoryId ?? "";

  const { data, isPending, isError } = useQuery({
    queryKey: ["video", category],
    queryFn: async () => videoFn(category),
  });

  return { videoList: data?.videos || [], isPending, isError };
};

export default useVideo;
