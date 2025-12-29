import { useState, useRef } from "react";

export default function TaskItem({
  task,
  onToggleTask,
  onToggleSubtask,
  onEdit,
  onDragStart,
  onDrop
}) {
  const [expanded, setExpanded] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(false);
  const pressTimer = useRef(null);

  if (!task) return null;

  const completedSubs =
    task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubs = task.subtasks?.length || 0;

  const progress =
    totalSubs === 0 ? 0 : Math.round((completedSubs / totalSubs) * 100);

  const priorityColor = {
    low: "border-green-400",
    medium: "border-yellow-400",
    high: "border-red-400"
  }[task.priority || "low"];

  /* -------- Long press logic -------- */
  const startPress = () => {
    pressTimer.current = setTimeout(() => {
      setDragEnabled(true);   // ✅ enable drag after 300ms
    }, 300);
  };

  const endPress = () => {
    clearTimeout(pressTimer.current);
    setDragEnabled(false);    // ✅ disable drag again
  };

  return (
    <div
      draggable={dragEnabled}           // 🔑 KEY FIX
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onClick={onEdit}
      className={`bg-white p-3 rounded-lg shadow border-l-4 ${priorityColor}`}
    >
      {/* Main row */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onClick={(e) => e.stopPropagation()}
          onChange={onToggleTask}
          className="mr-3 h-5 w-5"
        />

        <div className="flex-1">
          <div className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </div>
          <div className="text-xs text-gray-500">
            {task.time || "—"}
          </div>
        </div>

        {totalSubs > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="px-2 text-gray-500"
          >
            {expanded ? "⌃" : "⌄"}
          </button>
        )}
      </div>

      {/* Progress bar */}
      {totalSubs > 0 && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Subtasks */}
      {expanded && totalSubs > 0 && (
        <div className="mt-2 pl-6 space-y-1" onClick={e => e.stopPropagation()}>
          {task.subtasks.map(st => (
            <label key={st.id} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={st.completed}
                onChange={() => onToggleSubtask(st.id)}
                className="mr-2 h-4 w-4"
              />
              <span className={st.completed ? "line-through text-gray-400" : ""}>
                {st.title}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}