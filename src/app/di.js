// import { HttpUserRepository } from "../infrastructure/http/user/HttpUserRepository.js";
// import { createGetUserUseCase } from "../domain/user/usecase/getUserUseCase.js";
// import { createUpdateUserProfileUseCase } from "../domain/user/usecase/updateUserProfileUseCase.js";

// // 1) 레포 구현체 인스턴스 생성
// const userRepository = new HttpUserRepository();

// // 2) 레포를 주입해서 유즈케이스 생성
// export const getUserUseCase = createGetUserUseCase(userRepository);
// export const updateUserProfileUseCase =
//   createUpdateUserProfileUseCase(userRepository);

import { HttpCategoryRepository } from "@/features/category/infrastructure/http/HttpCategoryRepository";
import { HttpAuthRepository } from "../features/auth/infrastructure/http/HttpAuthRepository";

export const authRepository = new HttpAuthRepository();
export const categoryRepository = new HttpCategoryRepository();
