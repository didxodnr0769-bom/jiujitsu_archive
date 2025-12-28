/**
 * @interface VideoRepository
 * @description 비디오 관련 데이터 접근을 위한 리포지토리 인터페이스
 */
export class VideoRepository {
  async getVideoList(categoryId) {
    throw new Error("getVideoList must be implemented");
  }

  async addVideo(videoData) {
    throw new Error("addVideo must be implemented");
  }

  async updateVideo(videoId, videoData) {
    throw new Error("updateVideo must be implemented");
  }

  async deleteVideo(videoId) {
    throw new Error("deleteVideo must be implemented");
  }
}
