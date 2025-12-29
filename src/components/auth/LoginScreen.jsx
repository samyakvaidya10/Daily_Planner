
import { googleLogin } from "../../firebase/auth";

export default function LoginScreen() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white px-6">
      <h1 className="text-2xl font-semibold mb-2">
        Daily Planner
      </h1>

      <p className="text-gray-500 mb-8 text-center">
        Track your habits & daily progress
      </p>

      <button
        onClick={googleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full max-w-xs"
      >
        Sign in with Google
      </button>
    </div>
  );
}
