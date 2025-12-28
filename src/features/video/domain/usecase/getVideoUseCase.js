/**
 * @param {} VideoRepository
 * @description 카테고리 ID를 이용하여 비디오 목록 조회한다.
 */
export function getVideoUseCase(VideoRepository) {
  return async function getVideo(categoryId) {
    const response = await VideoRepository.getVideoList(categoryId);
    return response;
  };
}
