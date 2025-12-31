export default function HistoryDetails({ day }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">
        {day.date} — {day.percent}% completed
      </h3>

      <div className="mb-3">
        <h4 className="text-sm font-medium text-green-600">
          Completed
        </h4>
        {day.completedTasks.map((t, i) => (
          <div key={i} className="text-sm">
            ✔ {t.title}
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-sm font-medium text-red-600">
          Pending
        </h4>
        {day.pendingTasks.map((t, i) => (
          <div key={i} className="text-sm">
            ⏳ {t.title}
          </div>
        ))}
      </div>
    </div>
  );
}
