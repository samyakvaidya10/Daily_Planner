import { useState } from "react";
import CalendarGrid from "../components/calendar/CalendarGrid";
import DayTasksPanel from "../components/calendar/DayTasksPanel";
import { getEffectiveDateId } from "../utils/date";

export default function Calendar({ setPage }) {
  const todayId = getEffectiveDateId();
  const [selectedDate, setSelectedDate] = useState(todayId);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Calendar</h2>

      <CalendarGrid
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <DayTasksPanel
        dateId={selectedDate}
        isToday={selectedDate === todayId}
        onEditToday={() => setPage("home")}
      />
    </div>
  );
}
