import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "@/features/auth/presentation/hook/useLogin";

export default function LoginForm() {
  const navigate = useNavigate();
  const idRef = useRef();
  const passwordRef = useRef();
  const { mutate, isPending } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const id = idRef.current.value;
    const password = passwordRef.current.value;

    mutate(
      { id, password },
      {
        onError: (errorMessage) => {
          setErrorMessage(errorMessage);
        },
      },
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="아이디"
          className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          ref={idRef}
          disabled={isPending}
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          ref={passwordRef}
          disabled={isPending}
        />
      </div>
      <button
        type="submit"
        className={`w-full px-4 py-2 bg-purple-600 rounded-md transition-colors ${
          isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
        }`}
        disabled={isPending}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </form>
  );
}
