import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import DailyProgress from "../components/progress/DailyProgress";
import TaskList from "../components/tasks/TaskList";
import AddTaskFAB from "../components/tasks/AddTaskFAB";
import TaskForm from "../components/tasks/TaskForm";
import {
  loadTasksForDate,
  saveTasksForDate
} from "../firebase/firestore";
import { getEffectiveDateId } from "../utils/date";

export default function Home() {
  const dateId = getEffectiveDateId();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  /* Load today's tasks */
  useEffect(() => {
    async function load() {
      const data = await loadTasksForDate(dateId);
      setTasks(data);
      setLoading(false);
    }
    load();
  }, [dateId]);

  /* Save whenever tasks change */
  useEffect(() => {
    if (!loading) {
      saveTasksForDate(dateId, tasks);
    }
  }, [tasks, loading, dateId]);

  const completedCount = tasks.filter(t => t.completed).length;
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="p-4">
      <Header title="Today" />
      <DailyProgress percent={progress} />

      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        onEditTask={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
      />

      {/* Floating add button */}
      <AddTaskFAB
        onClick={() => {
          setEditingTask(null);
          setShowForm(true);
        }}
      />

      {/* Add / Edit Task Form */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onSave={(updatedTask) => {
            setTasks((prev) => {
              const exists = prev.some(t => t.id === updatedTask.id);
              return exists
                ? prev.map(t =>
                    t.id === updatedTask.id ? updatedTask : t
                  )
                : [...prev, updatedTask];
            });
            setShowForm(false);
            setEditingTask(null);
          }}
          onDelete={() => {
            setTasks(prev =>
              prev.filter(t => t.id !== editingTask.id)
            );
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
