import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { CategoryModal } from "../../../app/components/CategoryModal";
import { Sidebar } from "./Sidebar";

// Mock data - In a real app, this would come from an API
const initialCategories = [
  "Guard Pass",
  "Takedown",
  "Submission",
  "Escape",
  "Sweep",
  "Position",
];

export function MainLayout({ children }) {
  // State lifted from MainPage
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleAddCategory = (name) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  const handleDeleteCategory = (name) => {
    if (
      confirm(
        `Delete category "${name}"? Videos in this category will remain but be uncategorized.`
      )
    ) {
      setCategories(categories.filter((c) => c !== name));
      // Note: The logic to update videos is now in MainPage,
      // which will need to be handled via props or a global state manager.
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col lg:flex-row">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
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
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
}
