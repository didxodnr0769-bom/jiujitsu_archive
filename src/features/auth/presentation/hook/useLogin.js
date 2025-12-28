import { useMutation } from "@tanstack/react-query";
import { loginUseCase } from "../../domain/usecase/loginUseCase";
import { authRepository } from "@/app/di.js";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/features/auth/infrastructure/store/useAuthStore";

const useLogin = () => {
  const loginFn = loginUseCase(authRepository);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async ({ id, password }) => {
      try {
        const res = await loginFn(id, password);
        const { token, userName } = res.result;
        login(userName, token);
        navigate("/");
      } catch (error) {
        return Promise.reject("Login Failed", error.message);
      }
    },
  });
};

export default useLogin;
