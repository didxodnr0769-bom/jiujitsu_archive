import { HttpCategoryRepository } from "@/features/category/infrastructure/http/HttpCategoryRepository";
import { HttpAuthRepository } from "../features/auth/infrastructure/http/HttpAuthRepository";
import { HttpVideoRepository } from "@/features/video/infrastructure/http/HttpVideoRepository";

export const authRepository = new HttpAuthRepository();
export const categoryRepository = new HttpCategoryRepository();
export const videoRepository = new HttpVideoRepository();
