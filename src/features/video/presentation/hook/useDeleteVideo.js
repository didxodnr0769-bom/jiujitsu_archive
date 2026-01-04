import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVideoUseCase } from "../../domain/usecase/deleteVideoUseCase";
import { videoRepository } from "@/app/di";

/**
 * @description 비디오 삭제 hook
 */
const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  const deleteVideoFn = deleteVideoUseCase(videoRepository);

  return useMutation({
    mutationFn: (videoId) => deleteVideoFn(videoId),
    onSuccess: () => {
      // 비디오 목록 쿼리 무효화
      queryClient.invalidateQueries(["video"]);
    },
    onError: (error) => {
      // TODO: 에러 처리 추가
      console.error("비디오 삭제 실패:", error);
    },
  });
};

export default useDeleteVideo;