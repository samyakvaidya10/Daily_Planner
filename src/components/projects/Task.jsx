import { useState } from "react";

export default function Task({ task, onChange }) {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const saveTitle = () => {
    setEditing(false);
    if (title.trim() && title !== task.title) {
      onChange({ ...task, title });
    } else {
      setTitle(task.title);
    }
  };

  const addSubtask = () => {
    onChange({
      ...task,
      subtasks: [
        ...task.subtasks,
        {
          id: crypto.randomUUID(),
          title: "New subtask",
          completed: false
        }
      ]
    });
  };

  return (
    <div className="border-l pl-3 ml-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
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
            className="font-medium border-b outline-none flex-1 text-sm"
            value={title}
            autoFocus
            onChange={e => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={e => e.key === "Enter" && saveTitle()}
          />
        ) : (
          <div className="font-medium text-sm flex-1">
            {task.title}
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

      {/* Subtasks */}
      {open && (
        <div className="space-y-1 ml-4">
          {task.subtasks.map(st => (
            <div
              key={st.id}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={st.completed}
                onChange={() =>
                  onChange({
                    ...task,
                    subtasks: task.subtasks.map(x =>
                      x.id === st.id
                        ? { ...x, completed: !x.completed }
                        : x
                    )
                  })
                }
              />

              <input
                className="flex-1 border-b outline-none text-sm"
                value={st.title}
                onChange={e =>
                  onChange({
                    ...task,
                    subtasks: task.subtasks.map(x =>
                      x.id === st.id
                        ? { ...x, title: e.target.value }
                        : x
                    )
                  })
                }
              />
            </div>
          ))}

          <button
            onClick={addSubtask}
            className="text-xs text-blue-600 mt-1"
          >
            + Add subtask
          </button>
        </div>
      )}
    </div>
  );
}
