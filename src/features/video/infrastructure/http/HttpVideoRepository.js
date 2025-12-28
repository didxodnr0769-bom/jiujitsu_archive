import api from "@/shared/axios/axios.js";
import { VideoRepository } from "../../domain/repository/VideoRepository";

export class HttpVideoRepository extends VideoRepository {
  async getVideoList(categoryId) {
    const response = await api.get(`/api/videos/${categoryId}`);
    return response.data;
  }

  async addVideo(videoData) {
    const response = await api.post("/api/videos", videoData);
    return response.data;
  }

  async updateVideo(videoId, videoData) {
    const response = await api.put(`/api/videos/${videoId}`, videoData);
    return response.data;
  }

  async deleteVideo(videoId) {
    const response = await api.delete(`/api/videos/${videoId}`);
    return response.data;
  }
}
