import { useMutation } from "@tanstack/react-query";
import { loginUseCase } from "../../domain/usecase/loginUseCase";
import { authRepository } from "@/app/di.js";

const useLogin = () => {
  const loginFn = loginUseCase(authRepository);

  return useMutation({
    mutationFn: ({ id, pw }) => {
      // 실제 서버 요청 (Promise 반환 필수)
      return loginFn(id, pw);
    },
  });
};

export default useLogin;
