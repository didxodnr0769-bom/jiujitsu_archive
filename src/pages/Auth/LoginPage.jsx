import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/axios/axios"; // Custom axios instance
import useLogin from "../../features/auth/presentation/hook/useLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  const idRef = useRef();
  const passwordRef = useRef();
  const { mutate } = useLogin();

  const handleLogin = async () => {
    const id = idRef.current.value;
    const password = passwordRef.current.value;

    mutate(
      { id, password },
      {
        onSuccess: (data) => {
          alert("Logged in successfully!");
          navigate("/");
        },
        onError: (error) => {
          alert(
            "Login failed: " + (error.response?.data?.message || error.message)
          );
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <p className="mb-6">
          Enter your credentials to access the admin dashboard.
        </p>
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
              defaultValue="admin"
              ref={idRef}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue="password"
              ref={passwordRef}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
