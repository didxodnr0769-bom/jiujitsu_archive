import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 API URL
  timeout: 10000, // 요청 타임아웃 10초
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 작업
    // 예: JWT 토큰 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리하기 전에 수행할 작업
    return response;
  },
  (error) => {
    // 응답 오류 처리
    // 예: 인증 실패 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      // alert('인증 정보가 만료되었습니다. 다시 로그인해주세요.');
      // window.location.href = '/login'; // 실제 환경에서는 react-router-dom의 navigate를 사용
    }
    return Promise.reject(error);
  }
);

export default instance;