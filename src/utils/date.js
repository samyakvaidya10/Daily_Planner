export function getTodayId() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

export function getEffectiveDateId() {
  const now = new Date();
  if (now.getHours() < 3) {
    now.setDate(now.getDate() - 1);
  }
  return now.toISOString().split("T")[0];
}

export function getYesterdayId(dateId) {
  const d = new Date(dateId);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}
