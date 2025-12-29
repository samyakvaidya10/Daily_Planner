import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

// ✅ GOOGLE LOGIN
export async function googleLogin() {
  await signInWithPopup(auth, provider);
}

// ✅ LOGOUT
export async function logout() {
  await signOut(auth);
}
