import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "@/features/auth/presentation/hook/useLogin";

export default function LoginForm() {
  const navigate = useNavigate();
  const idRef = useRef();
  const passwordRef = useRef();
  const { mutate } = useLogin();
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
      }
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
          placeholder="ID"
          className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          defaultValue="user"
          ref={idRef}
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          defaultValue="pass"
          ref={passwordRef}
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
      >
        Login
      </button>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </form>
  );
}
