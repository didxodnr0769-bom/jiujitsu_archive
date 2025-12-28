import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../../app/components/Sidebar";
import { Header } from "./Header";
import { CategoryModal } from "../../../app/components/CategoryModal";

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

  // Handlers lifted from MainPage
  const handleLogin = () => {
    // For now, just toggle the admin state for demonstration
    setIsAdmin(true);
    // In a real app, you'd navigate to the login page:
    // navigate("/auth");
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

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

  // Clone the children and pass the necessary props
  const childrenWithProps = React.cloneElement(children, {
    isAdmin,
    categories,
    selectedCategory,
    // Pass any other props the child page might need
  });

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col lg:flex-row">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isAdmin={isAdmin}
        onManageCategories={() => setCategoryModalOpen(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          isAdmin={isAdmin}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Render the page content */}
        <main className="flex-1 p-6 lg:p-8">{childrenWithProps}</main>
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
