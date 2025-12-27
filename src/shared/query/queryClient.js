import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창 포커스 시 자동 새로고침 비활성화
      retry: 1, // 실패 시 1번 재시도
    },
  },
});

export default queryClient;
