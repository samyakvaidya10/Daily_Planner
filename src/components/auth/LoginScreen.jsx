import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const provider = new GoogleAuthProvider();

export default function LoginScreen() {
  const login = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <button
      onClick={login}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Sign in with Google
    </button>
  );
}
