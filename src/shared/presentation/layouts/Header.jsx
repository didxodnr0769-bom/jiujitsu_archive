import useAuthStore from "@/features/auth/infrastructure/store/useAuthStore";
import useLayoutStore from "@/shared/infrastructure/store/useLayoutStore";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="메뉴 토글"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">BJJ</span>
            </div>
            <h1 className="text-white font-bold text-xl hidden sm:block">
              주짓수 비디오 아카이브
            </h1>
          </div>
        </div>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            관리자 로그인
          </button>
        )}
      </div>
    </header>
  );
}
