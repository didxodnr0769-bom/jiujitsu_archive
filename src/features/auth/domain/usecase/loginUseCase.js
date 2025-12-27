export function loginUseCase(AuthRepository) {
  return async function login(id, password) {
    const response = await AuthRepository.getTokenByIdPw(id, password);
    return response;
  };
}
