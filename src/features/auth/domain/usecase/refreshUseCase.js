export function refreshUseCase(AuthRepository) {
  return async function refresh(refreshToken) {
    const response = await AuthRepository.tokenRefresh(refreshToken);
    return response;
  };
}
