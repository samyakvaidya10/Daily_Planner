export default function HistoryChart({ data, onSelect }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No history data available yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map(d => (
        <div
          key={d.date}
          onClick={() => onSelect(d)}
          className="cursor-pointer"
        >
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>{d.date}</span>
            <span>{d.percent}%</span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="bg-blue-600 h-3 rounded"
              style={{ width: `${d.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
