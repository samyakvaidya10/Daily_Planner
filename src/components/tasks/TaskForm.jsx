import { useState } from "react";
import { createHabit } from "../../firebase/firestore";
export default function TaskForm({ task, onSave, onClose, onDelete }) {
  const [title, setTitle] = useState(task?.title || "");
  const [time, setTime] = useState(task?.time || "");
  const [priority, setPriority] = useState(task?.priority || "low");
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [subText, setSubText] = useState("");
  const [taskType, setTaskType] = useState(task?.taskType || "habit");
const [scheduledDate, setScheduledDate] = useState(task?.scheduledDate || "");
  const addSubtask = () => {
    if (!subText) return;
    setSubtasks([
      ...subtasks,
      { id: Date.now().toString(), title: subText, completed: false }
    ]);
    setSubText("");
  };

const save = () => {
  const id = task?.id || Date.now().toString();
  if (taskType === "habit") {
    createHabit({
      id,
      title,
      priority,
      time,
      active: true
    });
  }

  onSave({
    id,
    title,
    time,
    priority,
    subtasks,
    taskType,
    scheduledDate: taskType === "scheduled" ? scheduledDate : null,
    completed: subtasks.length
      ? subtasks.every(s => s.completed)
      : task?.completed || false
  });
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end z-50">
      <div className="bg-white w-full rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto">
        <h3 className="font-semibold mb-3">
          {task ? "Edit Task" : "Add Task"}
        </h3>

        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Task name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
  <div className="mb-2">
  <label className="text-sm font-medium">Task type</label>
  <select
    className="w-full border p-2 rounded mt-1"
    value={task?.taskType || "habit"}
    onChange={e => setTaskType(e.target.value)}
  >
    <option value="habit">Habit (Daily)</option>
    <option value="scheduled">Scheduled (One-time)</option>
  </select>
</div>
        <input
          type="time"
          className="w-full border p-2 mb-2 rounded"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
{taskType === "scheduled" && (
  <input
    type="date"
    className="w-full border p-2 mb-2 rounded"
    value={scheduledDate}
    onChange={e => setScheduledDate(e.target.value)}
  />
)}
        <select
          className="w-full border p-2 mb-3 rounded"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>

        <div className="mb-3">
          <div className="font-medium mb-1">Subtasks</div>

          {subtasks.map(st => (
            <div key={st.id} className="text-sm text-gray-600">
              • {st.title}
            </div>
          ))}

          <div className="flex mt-2">
            <input
              className="flex-1 border p-2 rounded"
              placeholder="Add subtask"
              value={subText}
              onChange={e => setSubText(e.target.value)}
            />
            <button
              onClick={addSubtask}
              className="ml-2 bg-blue-600 text-white px-3 rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          {task && (
            <button
              onClick={onDelete}
              className="flex-1 border border-red-400 text-red-500 p-2 rounded"
            >
              Delete
            </button>
          )}
          <button
            onClick={save}
            className="flex-1 bg-blue-600 text-white p-2 rounded"
          >
            Save
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-500 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
