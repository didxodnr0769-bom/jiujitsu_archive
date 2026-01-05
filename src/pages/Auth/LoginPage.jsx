import LoginForm from "@/features/auth/presentation/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <p className="mb-6">
          Enter your credentials to access the admin dashboard.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
