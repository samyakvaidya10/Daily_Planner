// import TaskItem from "./TaskItem";

// export default function TaskList({ tasks, setTasks }) {
//   const toggleTask = (id) => {
//     setTasks(
//       tasks.map(task =>
//         task.id === id
//           ? { ...task, completed: !task.completed }
//           : task
//       )
//     );
//   };

//   return (
//     <div className="space-y-3">
//       {tasks.map(task => (
//         <TaskItem
//           key={task.id}
//           task={task}
//           onToggle={() => toggleTask(task.id)}
//         />
//       ))}

//       {tasks.length === 0 && (
//         <p className="text-gray-400 text-sm text-center">
//           No tasks added yet
//         </p>
//       )}
//     </div>
//   );
// }
