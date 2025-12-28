import { create } from "zustand";

const DEFAULT_STATE = {
  isAuthenticated: false,
  userName: "",
  token: null,
};

const useAuthStore = create((set) => ({
  // 1. 상태 (State): 관리할 데이터
  ...DEFAULT_STATE,
  // 2. 액션 (Actions): 상태를 변경하는 함수
  login: (userName, token) =>
    set(() => ({
      isAuthenticated: true,
      userName,
      token,
    })),
  logout: () =>
    set(() => ({
      ...DEFAULT_STATE,
    })),
}));

export default useAuthStore;
