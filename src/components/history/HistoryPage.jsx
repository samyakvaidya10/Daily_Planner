export default function HistoryPage() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">History</h2>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["7D", "28D", "90D", "365D"].map(d => (
          <button key={d} className="px-4 py-2 bg-gray-200 rounded-full">
            {d}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg h-40 shadow flex items-center justify-center">
        Chart placeholder
      </div>
    </div>
  );
}
