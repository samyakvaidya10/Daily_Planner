import { useEffect, useState } from "react";
import { loadHabitAnalytics } from "../utils/analytics";
import { formatDateFromObj } from "../utils/date";
import HabitLineChart from "../components/history/HabitLineChart";
import { loadTasksForDate } from "../firebase/firestore";

export default function History() {
  const [range, setRange] = useState(7);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
const [dayTasks, setDayTasks] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await loadHabitAnalytics(range, formatDateFromObj);
      setData(res);
    }
    load();
  }, [range]);
  
useEffect(() => {
  if (!selectedDate) return;

  async function loadDay() {
    const tasks = await loadTasksForDate(selectedDate);
    setDayTasks(tasks);
  }

  loadDay();
}, [selectedDate]);
  return (
    <div className="p-4">
      <h2 className="font-semibold mb-3">Habit Analytics</h2>

      <div className="flex gap-2 mb-4">
        {[7, 28, 90, 365].map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded text-sm ${
              range === r
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {r} days
          </button>
        ))}
      </div>

      <HabitLineChart
  data={data}
  onSelectDay={setSelectedDate}
/>
{selectedDate && (
  <div className="mt-4 border-t pt-3">
    <div className="font-medium mb-2">
      {selectedDate}
    </div>

    {/* Completed */}
    <div className="mb-2">
      <div className="text-sm text-green-600 font-medium">
        Completed
      </div>
      {dayTasks
        .filter(t => t.taskType === "habit" && t.completed)
        .map(t => (
          <div key={t.id} className="text-sm">
            ✔ {t.title}
          </div>
        ))}
    </div>

    {/* Missed */}
    <div>
      <div className="text-sm text-red-500 font-medium">
        Missed
      </div>
      {dayTasks
        .filter(t => t.taskType === "habit" && !t.completed)
        .map(t => (
          <div key={t.id} className="text-sm">
            ✖ {t.title}
          </div>
        ))}
    </div>
  </div>
)}


      <div className="mt-4 text-sm text-gray-600">
        Tap any day to inspect details (next step)
      </div>
    </div>
  );
}
