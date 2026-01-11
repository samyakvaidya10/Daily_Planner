import { useEffect, useState } from "react";
import { loadProjects, createProject } from "../firebase/projects";

export default function Projects({ onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadProjects().then(setProjects);
  }, []);

  const addProject = async () => {
    if (!title.trim()) return;
    await createProject(title);
    setTitle("");
    setProjects(await loadProjects());
  };

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-3">Projects</h2>

      {/* Add project */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded p-2"
          placeholder="New project"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button
          onClick={addProject}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Project list */}
      <div className="space-y-2">
        {projects.map(project => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)} // 🔥 CRITICAL
            className="border p-3 rounded bg-white cursor-pointer hover:bg-gray-50"
          >
            <div className="font-medium">{project.title}</div>
            <div className="text-xs text-gray-500">
              {project.status || "active"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
