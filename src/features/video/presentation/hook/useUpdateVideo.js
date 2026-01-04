import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVideoUseCase } from "../../domain/usecase/updateVideoUseCase";
import { videoRepository } from "@/app/di";

/**
 * @description 비디오 수정 hook
 */
const useUpdateVideo = () => {
  const queryClient = useQueryClient();
  const updateVideoFn = updateVideoUseCase(videoRepository);

  return useMutation({
    mutationFn: ({ videoId, videoData }) => updateVideoFn(videoId, videoData),
    onSuccess: () => {
      // 비디오 목록 쿼리 무효화
      queryClient.invalidateQueries(["video"]);
    },
    onError: (error) => {
      // TODO: 에러 처리 추가
      console.error("비디오 수정 실패:", error);
    },
  });
};

export default useUpdateVideo;
