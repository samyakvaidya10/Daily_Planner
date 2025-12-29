import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";
import { auth } from "./firebase";

export const db = getFirestore();

/* ---------------- DAILY TASKS ---------------- */

export async function saveTasksForDate(dateId, tasks) {
  const user = auth.currentUser;
  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid, "days", dateId),
    { date: dateId, tasks }
  );
}

export async function loadTasksForDate(dateId) {
  const user = auth.currentUser;
  if (!user) return [];

  const snap = await getDoc(
    doc(db, "users", user.uid, "days", dateId)
  );

  return snap.exists() ? snap.data().tasks || [] : [];
}

/* ---------------- HABITS ---------------- */

export async function createHabit(habit) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(
    collection(db, "users", user.uid, "habits"),
    habit
  );
}

export async function loadHabits() {
  const user = auth.currentUser;
  if (!user) return [];

  const snap = await getDocs(
    collection(db, "users", user.uid, "habits")
  );

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ---------------- PURCHASE LIST ---------------- */

export async function addPurchaseItem(name) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(
    collection(db, "users", user.uid, "purchases"),
    { name, completed: false }
  );
}

export async function loadPurchaseItems() {
  const user = auth.currentUser;
  if (!user) return [];

  const snap = await getDocs(
    collection(db, "users", user.uid, "purchases")
  );

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
