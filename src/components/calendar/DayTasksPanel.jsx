import { useEffect, useState } from "react";
import { loadTasksForDate } from "../../firebase/firestore";
import { getEffectiveDateId } from "../../utils/date";
import TaskForm from "../tasks/TaskForm";


export default function DayTasksPanel({ dateId, isToday }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const todayId = getEffectiveDateId();
  const isPast = dateId < todayId;
  const isFuture = dateId > todayId;

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await loadTasksForDate(dateId);
      setTasks(data || []);
      setLoading(false);
    }
    load();
  }, [dateId]);

  if (loading) return <div>Loading tasks…</div>;

  return (
    <div>
      <h3 className="font-medium mb-2">
        {dateId}
        {isToday && " (Today)"}
        {isPast && " (Past)"}
        {isFuture && " (Upcoming)"}
      </h3>
    {isFuture && (
  <button
    onClick={() => setShowForm(true)}
    className="mb-3 px-3 py-1 bg-blue-600 text-white rounded text-sm"
  >
    + Add task for this day
  </button>
)}
      {tasks.length === 0 && (
        <div className="text-sm text-gray-500">
          No tasks for this day
        </div>
      )}

      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`p-2 rounded border text-sm
              ${task.completed ? "bg-green-50" : "bg-white"}
            `}
          >
            <div className="flex justify-between">
              <span>{task.title}</span>
              <span className="text-xs text-gray-500">
                {task.taskType}
              </span>
            </div>

            {task.completed && (
              <div className="text-xs text-green-600">
                ✔ Completed
              </div>
            )}

            {!task.completed && isPast && (
              <div className="text-xs text-red-500">
                ✖ Missed
              </div>
            )}
          </div>
        ))}
      </div>
      {showForm && (
  <TaskForm
    task={{
      taskType: "scheduled",
      scheduledDate: dateId
    }}
    onClose={() => setShowForm(false)}
    onSave={(newTask) => {
      setTasks(prev => [...prev, newTask]);
      setShowForm(false);
    }}
  />
)}
    </div>
    
  );
}
