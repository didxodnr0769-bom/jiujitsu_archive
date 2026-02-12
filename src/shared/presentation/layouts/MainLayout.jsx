import React, { useState } from "react";
import { Header } from "./Header";
import { CategoryModal } from "../../../app/components/CategoryModal";
import { Sidebar } from "./Sidebar";
import useCategory from "@/features/category/presentation/hook/useCategory";
import useAddCategory from "@/features/category/presentation/hook/useAddCategory";
import useDeleteCategory from "@/features/category/presentation/hook/useDeleteCategory";

export function MainLayout({ children }) {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { categoryList } = useCategory();
  const { mutate: addCategory, isPending: isAddingCategory } = useAddCategory();
  const { mutate: deleteCategory, isPending: isDeletingCategory } = useDeleteCategory();

  const handleAddCategory = (name) => {
    addCategory({ name });
  };

  const handleDeleteCategory = (categoryId) => {
    if (confirm("카테고리를 삭제하시겠습니까? 해당 카테고리의 비디오는 분류되지 않은 상태로 남습니다.")) {
      deleteCategory(categoryId);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col lg:flex-row">
      <Sidebar
        onManageCategories={() => setCategoryModalOpen(true)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header />

        {/* Render the page content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>

      <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        categories={categoryList}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        isAdding={isAddingCategory}
        isDeleting={isDeletingCategory}
      />
    </div>
  );
}
