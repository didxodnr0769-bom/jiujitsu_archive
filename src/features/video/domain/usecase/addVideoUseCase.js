/**
 * @param {} VideoRepository
 * @description 신규 비디오를 추가한다.
 */
export function addVideoUseCase(VideoRepository) {
  return async function addVideo(videoData) {
    const response = await VideoRepository.addVideo(videoData);
    return response;
  };
}
