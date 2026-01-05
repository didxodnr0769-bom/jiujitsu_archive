import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_STATE = {
  isAuthenticated: false,
  userName: "",
  accessToken: null,
  refreshToken: null,
};

const useAuthStore = create(
  persist(
    (set) => ({
      // 1. 상태 (State): 관리할 데이터
      ...DEFAULT_STATE,
      // 2. 액션 (Actions): 상태를 변경하는 함수
      login: (userName, accessToken, refreshToken) =>
        set(() => ({
          isAuthenticated: true,
          userName,
          accessToken,
          refreshToken,
        })),
      logout: () =>
        set(() => ({
          ...DEFAULT_STATE,
        })),
    }),
    {
      name: "auth-store", // 로컬 스토리지에 저장될 때 사용될 이름
      getStorage: () => localStorage, // 사용할 스토리지 (localStorage 또는 sessionStorage)
    }
  )
);

export default useAuthStore;
