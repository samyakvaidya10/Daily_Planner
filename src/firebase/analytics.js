import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";

/**
 * Load all daily task documents for analytics
 */
export async function loadAllDays() {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = collection(db, "users", user.uid, "days");
  const snap = await getDocs(ref);

  return snap.docs.map(doc => doc.data());
}
