import { create } from "zustand";

const DEFAULT_STATE = {
  sidebarOpen: false,
};

const useLayoutStore = create((set) => ({
  // 1. 상태 (State): 관리할 데이터
  ...DEFAULT_STATE,
  // 2. 액션 (Actions): 상태를 변경하는 함수
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
}));

export default useLayoutStore;
