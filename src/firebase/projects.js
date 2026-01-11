import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "./firestore";
import { auth } from "./firebase";

export async function loadProjects() {
  const user = auth.currentUser;
  if (!user) return [];

  const snap = await getDocs(
    collection(db, "users", user.uid, "projects")
  );

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function createProject(title, description = "") {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(
    collection(db, "users", user.uid, "projects"),
    {
      title,
      description,
      status: "active",
      createdAt: new Date().toISOString(),
      milestones: []
    }
  );
}

export async function updateProject(projectId, data) {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(
    doc(db, "users", user.uid, "projects", projectId),
    data
  );
}

export async function deleteProject(projectId) {
  const user = auth.currentUser;
  if (!user) return;

  await deleteDoc(
    doc(db, "users", user.uid, "projects", projectId)
  );
}