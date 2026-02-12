import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import LoginForm from "./LoginForm";
import useLogin from "@/features/auth/presentation/hook/useLogin";

// 1. 모킹 (Mocking)
// useLogin 훅이 실제 API를 호출하지 않도록 가짜 함수로 대체합니다.
vi.mock("@/features/auth/presentation/hook/useLogin", () => ({
  default: vi.fn(),
}));

// useNavigate 훅 모킹 (페이지 이동 방지)
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginForm UI Test", () => {
  it("화면 렌더링: 아이디/비밀번호 입력창과 로그인 버튼이 보여야 한다", () => {
    // 훅의 반환값 설정 (초기 상태)
    useLogin.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    render(<LoginForm />);

    // 화면 요소 확인
    expect(screen.getByPlaceholderText("아이디")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
  });

  it("사용자 상호작용: 입력 후 버튼 클릭 시 로그인 요청을 보내야 한다", async () => {
    // 요청 함수 모킹
    const mockMutate = vi.fn();
    useLogin.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    const idInput = screen.getByPlaceholderText("아이디");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const submitButton = screen.getByRole("button", { name: "로그인" });

    // 1. 아이디/비밀번호 입력
    await user.type(idInput, "testuser");
    await user.type(passwordInput, "password123");

    // 2. 로그인 버튼 클릭
    await user.click(submitButton);

    // 3. 검증: mutate 함수가 올바른 인자(입력된 값)와 함께 호출되었는지 확인
    expect(mockMutate).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledWith(
      { id: "testuser", password: "password123" },
      expect.objectContaining({ onError: expect.any(Function) }),
    );
  });

  it("상태 변화: 로그인 중(isPending)일 때는 로딩 표시가 되고 버튼이 비활성화되어야 한다", () => {
    // 로딩 중 상태로 설정
    useLogin.mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    });

    render(<LoginForm />);

    // 버튼 텍스트 변경 및 비활성화 확인
    const submitButton = screen.getByRole("button", { name: "로그인 중..." });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // 입력창 비활성화 확인
    expect(screen.getByPlaceholderText("아이디")).toBeDisabled();
    expect(screen.getByPlaceholderText("비밀번호")).toBeDisabled();
  });

  it("에러 처리: 로그인 실패 시 에러 메시지를 표시해야 한다", async () => {
    // 에러 발생 시나리오 모킹
    const mockMutate = vi.fn((data, options) => {
      // 강제로 onError 콜백 실행
      options.onError("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
    });

    useLogin.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    const idInput = screen.getByPlaceholderText("아이디");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const submitButton = screen.getByRole("button", { name: "로그인" });

    await user.type(idInput, "wronguser");
    await user.type(passwordInput, "wrongpass");
    await user.click(submitButton);

    expect(
      screen.getByText("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다."),
    ).toBeInTheDocument();
  });
});
