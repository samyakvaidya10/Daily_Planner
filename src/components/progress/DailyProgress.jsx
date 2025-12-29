export default function DailyProgress({ percent }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-1">
        <span>Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
