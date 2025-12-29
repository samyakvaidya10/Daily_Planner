export default function ProgressBar({ tasks }) {
  const done = tasks.filter(t => t.completed).length;
  const percent = tasks.length
    ? Math.round((done / tasks.length) * 100)
    : 0;

  return (
    <>
      <progress value={done} max={tasks.length || 1} />
      <div>{percent}% completed</div>
    </>
  );
}
