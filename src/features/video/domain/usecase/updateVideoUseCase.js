/**
 * @param {} VideoRepository
 * @description 비디오 정보를 수정한다.
 */
export function updateVideoUseCase(VideoRepository) {
  return async function updateVideo(videoId, videoData) {
    const response = await VideoRepository.updateVideo(videoId, videoData);
    return response;
  };
}
