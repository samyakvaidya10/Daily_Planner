import { useState } from "react";
import Task from "./Task";

export default function Milestone({ milestone, onChange }) {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(milestone.title);

  const saveTitle = () => {
    setEditing(false);
    if (title.trim() && title !== milestone.title) {
      onChange({ ...milestone, title });
    } else {
      setTitle(milestone.title);
    }
  };

  const addTask = () => {
    const name = prompt("Task name");
    if (!name) return;

    onChange({
      ...milestone,
      tasks: [
        ...milestone.tasks,
        {
          id: crypto.randomUUID(),
          title: name,
          subtasks: []
        }
      ]
    });
  };

  return (
    <div className="border rounded p-3 bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        {/* Collapse */}
        <button
          onClick={() => setOpen(!open)}
          className="text-xs text-gray-500"
        >
          {open ? "▾" : "▸"}
        </button>

        {/* Title */}
        {editing ? (
          <input
            className="font-medium border-b outline-none flex-1"
            value={title}
            autoFocus
            onChange={e => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={e => e.key === "Enter" && saveTitle()}
          />
        ) : (
          <div className="font-medium flex-1">
            {milestone.title}
          </div>
        )}

        {/* Edit */}
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-blue-600"
          >
            ✏️
          </button>
        )}
      </div>

      {/* Tasks */}
      {open && (
        <div className="space-y-2 ml-4">
          {milestone.tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onChange={(updatedTask) => {
                onChange({
                  ...milestone,
                  tasks: milestone.tasks.map(t =>
                    t.id === task.id ? updatedTask : t
                  )
                });
              }}
            />
          ))}

          <button
            onClick={addTask}
            className="text-sm text-blue-600 mt-2"
          >
            + Add task
          </button>
        </div>
      )}
    </div>
  );
}
