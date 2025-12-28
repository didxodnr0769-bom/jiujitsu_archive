/**
 * @interface CategoryRepository
 * @description 카테고리 관련 데이터 접근을 위한 리포지토리 인터페이스
 */

export class CategoryRepository {
  async getCategoryList() {
    throw new Error("getCategoryList must be implemented");
  }

  async addCategory(categoryData) {
    throw new Error("addCategory must be implemented");
  }

  async updateCategory(categoryId, categoryData) {
    throw new Error("updateCategory must be implemented");
  }

  async deleteCategory(categoryId) {
    throw new Error("deleteCategory must be implemented");
  }
}
