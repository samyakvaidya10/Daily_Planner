export function getEffectiveDateId() {
  const now = new Date();
  const hour = now.getHours();

  // Treat early morning as previous day
  if (hour < 5) {
    now.setDate(now.getDate() - 1);
  }

  return now.toISOString().split("T")[0];
}

export function formatLocalDate(year, month, day) {
  const y = year;
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDateFromObj(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}