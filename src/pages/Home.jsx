import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import DailyProgress from "../components/progress/DailyProgress";
import TaskList from "../components/tasks/TaskList";
import AddTaskFAB from "../components/tasks/AddTaskFAB";
import TaskForm from "../components/tasks/TaskForm";
import {
  loadTasksForDate,
  saveTasksForDate,
  loadHabits
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
    const dayTasks = await loadTasksForDate(dateId);
    const habits = await loadHabits();

    const existingHabitIds = dayTasks
      .filter(t => t.taskType === "habit")
      .map(t => t.id);

    const missingHabits = habits
      .filter(h => h.active)
      .filter(h => !existingHabitIds.includes(h.id))
      .map(h => ({
        id: h.id,
        title: h.title,
        time: h.time,
        priority: h.priority,
        completed: false,
        subtasks: [],
        taskType: "habit"
      }));

    const merged = [...dayTasks, ...missingHabits];

    setTasks(merged);
    await saveTasksForDate(dateId, merged);
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

const habitTasks = tasks.filter(t => t.taskType === "habit");

const completedCount = habitTasks.filter(t => t.completed).length;
const progress =
  habitTasks.length === 0
    ? 0
    : Math.round((completedCount / habitTasks.length) * 100);

const visibleTasks = tasks.filter(task => {
  // Habits always visible
  if (task.taskType === "habit") return true;

  // Scheduled tasks only on their date
  if (task.taskType === "scheduled") {
    return task.scheduledDate === dateId;
  }

  return false;
});

  return (
    <div className="p-4">
      <Header title="Today" />
      <DailyProgress percent={progress} />

<TaskList
  tasks={visibleTasks}
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
