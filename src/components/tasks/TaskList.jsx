import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, setTasks, onEditTask }) {
  const [dragIndex, setDragIndex] = useState(null);

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const toggleSubtask = (taskId, subId) => {
    setTasks(tasks.map(task => {
      if (task.id !== taskId) return task;

      const subtasks = task.subtasks.map(st =>
        st.id === subId ? { ...st, completed: !st.completed } : st
      );

      return {
        ...task,
        subtasks,
        completed: subtasks.every(s => s.completed)
      };
    }));
  };

  const onDrop = (dropIndex) => {
    if (dragIndex === null) return;

    const updated = [...tasks];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, moved);

    setTasks(updated);
    setDragIndex(null);
  };

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => onEditTask(task)}
          onToggleTask={() => toggleTask(task.id)}
          onToggleSubtask={(subId) =>
            toggleSubtask(task.id, subId)
          }
          onDragStart={() => setDragIndex(index)}
          onDrop={() => onDrop(index)}
        />
      ))}
    </div>
  );
}