/**
 * Convert Firestore day documents into analytics-friendly data
 */
import { loadTasksForDate } from "../firebase/firestore";

export async function loadHabitAnalytics(days, getDateId) {
  const results = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dateId = getDateId(date);
    const tasks = await loadTasksForDate(dateId);

    const habits = tasks.filter(t => t.taskType === "habit");
    const completed = habits.filter(t => t.completed).length;

    results.push({
      dateId,
      completed,
      total: habits.length
    });
  }

  return results;
}

export function calculateDailyCompletion(days) {
  return days.map(day => {
    const total = day.tasks?.length || 0;
    const completed = day.tasks?.filter(t => t.completed).length || 0;

    return {
      date: day.date,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
      completedTasks: day.tasks?.filter(t => t.completed) || [],
      pendingTasks: day.tasks?.filter(t => !t.completed) || []
    };
  });
}

/**
 * Filter analytics data by recent N days
 */
export function filterByRange(data, daysCount) {
  const sorted = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return sorted.slice(0, daysCount).reverse();
}
