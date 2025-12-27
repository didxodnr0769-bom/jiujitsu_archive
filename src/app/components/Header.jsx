import { Menu } from "lucide-react";

export function Header({ isAdmin, onLogin, onLogout, onToggleSidebar }) {
  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">BJJ</span>
            </div>
            <h1 className="text-white font-bold text-xl hidden sm:block">
              Jiu-Jitsu Video Archive
            </h1>
          </div>
        </div>

        {isAdmin ? (
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Admin Login
          </button>
        )}
      </div>
    </header>
  );
}
