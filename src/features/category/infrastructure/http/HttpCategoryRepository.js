import { CategoryRepository } from "@/features/category/domain/repository/CategoryRepository";
import api from "@/shared/axios/axios.js";

/**
 * Category Repository 구현체
 *
 */
export class HttpCategoryRepository extends CategoryRepository {
  async getCategoryList() {
    const response = await api.get("/api/category");
    return response.data;
  }

  async addCategory(categoryData) {
    const response = await this.httpClient.post("/categories", categoryData);
    return response.data;
  }

  async updateCategory(categoryId, categoryData) {
    const response = await this.httpClient.put(
      `/categories/${categoryId}`,
      categoryData
    );
    return response.data;
  }

  async deleteCategory(categoryId) {
    await this.httpClient.delete(`/categories/${categoryId}`);
  }
}
