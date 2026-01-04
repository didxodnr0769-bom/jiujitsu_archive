import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVideoUseCase } from "../../domain/usecase/addVideoUseCase";
import { videoRepository } from "@/app/di";

/**
 * @description 비디오 추가 hook
 */
const useAddVideo = () => {
  const queryClient = useQueryClient();
  const addVideoFn = addVideoUseCase(videoRepository);

  return useMutation({
    mutationFn: (videoData) => addVideoFn(videoData),
    onSuccess: () => {
      // 비디오 목록 쿼리 무효화
      queryClient.invalidateQueries(["video"]);
    },
    onError: (error) => {
      // TODO: 에러 처리 추가
      console.error("비디오 추가 실패:", error);
    },
  });
};

export default useAddVideo;
