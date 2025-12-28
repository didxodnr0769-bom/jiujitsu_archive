/**
 * @param {} VideoRepository
 * @description 비디오를 삭제한다.
 */
export function deleteVideoUseCase(VideoRepository) {
  return async function deleteVideo(videoId) {
    const response = await VideoRepository.deleteVideo(videoId);
    return response;
  };
}
