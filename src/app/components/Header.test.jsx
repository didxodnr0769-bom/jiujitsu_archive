import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "./Header";

describe("Header Component", () => {
  it("should render correctly", () => {
    render(
      <Header
        isAdmin={false}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        onToggleSidebar={vi.fn()}
      />,
    );

    expect(screen.getByText("BJJ")).toBeInTheDocument();
    expect(screen.getByText("주짓수 비디오 아카이브")).toBeInTheDocument();
  });

  it("should display '관리자 로그인' button when isAdmin is false", () => {
    render(
      <Header
        isAdmin={false}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        onToggleSidebar={vi.fn()}
      />,
    );

    const loginButton = screen.getByRole("button", { name: "관리자 로그인" });
    expect(loginButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "로그아웃" }),
    ).not.toBeInTheDocument();
  });

  it("should display '로그아웃' button when isAdmin is true", () => {
    render(
      <Header
        isAdmin={true}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        onToggleSidebar={vi.fn()}
      />,
    );

    const logoutButton = screen.getByRole("button", { name: "로그아웃" });
    expect(logoutButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "관리자 로그인" }),
    ).not.toBeInTheDocument();
  });

  it("should call onLogin when login button is clicked", () => {
    const handleLogin = vi.fn();
    render(
      <Header
        isAdmin={false}
        onLogin={handleLogin}
        onLogout={vi.fn()}
        onToggleSidebar={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "관리자 로그인" }));
    expect(handleLogin).toHaveBeenCalledTimes(1);
  });

  it("should call onLogout when logout button is clicked", () => {
    const handleLogout = vi.fn();
    render(
      <Header
        isAdmin={true}
        onLogin={vi.fn()}
        onLogout={handleLogout}
        onToggleSidebar={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "로그아웃" }));
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });

  it("should call onToggleSidebar when menu button is clicked", () => {
    const handleToggle = vi.fn();
    render(
      <Header
        isAdmin={false}
        onLogin={vi.fn()}
        onLogout={vi.fn()}
        onToggleSidebar={handleToggle}
      />,
    );

    // Mobile menu button usually has an aria-label or specific icon
    // In the component: aria-label="메뉴 토글"
    const menuButton = screen.getByLabelText("메뉴 토글");
    fireEvent.click(menuButton);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
