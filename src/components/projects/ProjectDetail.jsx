import { useEffect, useState } from "react";
import Milestone from "./Milestone";
import { updateProject } from "../../firebase/projects";
import { calculateProjectProgress } from "../../utils/projectProgress";
import { deleteProject } from "../../firebase/projects";

export default function ProjectDetail({ project, onBack }) {
  const [localProject, setLocalProject] = useState(project);

  // 🔄 Keep local state in sync if project changes
  useEffect(() => {
    setLocalProject(project);
  }, [project]);

  // 📊 Calculate progress
  const progress = calculateProjectProgress(localProject);

  // 💾 Persist changes to Firestore
  const persistUpdate = async (updatedFields) => {
    const updated = {
      ...localProject,
      ...updatedFields
    };

    setLocalProject(updated);
    await updateProject(localProject.id, updatedFields);
  };

  // ➕ Add milestone
  const addMilestone = () => {
    const title = prompt("Milestone name");
    if (!title) return;

    persistUpdate({
      milestones: [
        ...localProject.milestones,
        {
          id: crypto.randomUUID(),
          title,
          tasks: []
        }
      ]
    });
  };
const handleDeleteProject = async () => {
  const ok = window.confirm(
    "Delete this project permanently? This cannot be undone."
  );
  if (!ok) return;

  await deleteProject(localProject.id);
  onBack(); // return to project list
};
  return (
    <div className="p-4 space-y-4">
      {/* 🔙 Back */}
      <button
        onClick={onBack}
        className="text-blue-600 text-sm"
      >
        ← Back to projects
      </button>

      {/* 🏷 Title */}
      <h2 className="text-lg font-semibold">
        {localProject.title}
      </h2>

      {/* 📊 Progress bar */}
      <div>
        <div className="text-sm text-gray-600 mb-1">
          Progress: {progress}%
        </div>
        <div className="w-full bg-gray-200 rounded h-2">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 🧱 Milestones */}
      {localProject.milestones.length === 0 && (
        <div className="text-sm text-gray-500">
          No milestones yet
        </div>
      )}

      {localProject.milestones.map(milestone => (
        <Milestone
          key={milestone.id}
          milestone={milestone}
          onChange={(updatedMilestone) => {
            persistUpdate({
              milestones: localProject.milestones.map(m =>
                m.id === milestone.id ? updatedMilestone : m
              )
            });
          }}
        />
      ))}

      {/* ➕ Add milestone */}
      <button
        onClick={addMilestone}
        className="text-blue-600 text-sm"
      >
        + Add milestone
      </button>
      <button
  onClick={handleDeleteProject}
  className="text-red-600 text-sm mt-6"
>
  🗑 Delete project
</button>
    </div>
  );
}
