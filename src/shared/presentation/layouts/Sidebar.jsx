import useAuthStore from "@/features/auth/infrastructure/store/useAuthStore";
import useCategory from "@/features/category/presentation/hook/useCategory";
import useLayoutStore from "@/shared/infrastructure/store/useLayoutStore";
import { Plus, X } from "lucide-react";

export function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  onManageCategories,
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isSidebarOpen = useLayoutStore((state) => state.isSidebarOpen);
  const closeSidebar = useLayoutStore((state) => state.closeSidebar);

  const { categoryList, isPending } = useCategory();
  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-[#1a1a1a] border-r border-gray-800 
          w-64 flex flex-col z-50 transition-transform lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 border-b border-gray-800 lg:hidden flex justify-between items-center">
          <h2 className="text-white font-semibold">Categories</h2>
          <button
            onClick={closeSidebar}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-gray-400 uppercase text-sm font-semibold mb-4 hidden lg:block">
            Categories
          </h2>
          <div className="space-y-1">
            <button
              onClick={() => onSelectCategory(null)}
              className={`
                w-full text-left px-4 py-3 rounded-lg transition-colors
                ${
                  selectedCategory === null
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }
              `}
            >
              All Videos
            </button>
            {categoryList.map(({ categoryId, name }) => (
              <SideBarButton
                key={categoryId}
                onClick={() => onSelectCategory(categoryId)}
                isSelected={selectedCategory === categoryId}
              >
                {name}
              </SideBarButton>
            ))}
          </div>
        </div>

        {/* 관리자 메뉴 */}
        {isAuthenticated && (
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={() => {
                onManageCategories();
                closeSidebar();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Manage Categories
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

const SideBarButton = ({ isSelected, onClick, children }) => {
  const closeSidebar = useLayoutStore((state) => state.closeSidebar);
  return (
    <button
      onClick={() => {
        closeSidebar();
        onClick();
      }}
      className={`
        w-full text-left px-4 py-3 rounded-lg transition-colors
        ${
          isSelected
            ? "bg-purple-600 text-white"
            : "text-gray-300 hover:bg-gray-800"
        }
      `}
    >
      {children}
    </button>
  );
};
