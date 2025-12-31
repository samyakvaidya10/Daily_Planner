import { useState } from "react";
import { formatLocalDate } from "../../utils/date";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getMonthDays(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function CalendarGrid({ selectedDate, onSelectDate }) {
  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();
  const daysInMonth = getMonthDays(year, month);

  // ✅ FIXED: today in local format
  const today = formatLocalDate(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  // Weekday index of first day of the month (0 = Sunday)
  const firstDayIndex = new Date(year, month, 1).getDay();

  return (
    <div className="mb-4">
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className="px-2"
        >
          ◀
        </button>

        <div className="font-medium">
          {current.toLocaleString("default", {
            month: "long",
            year: "numeric"
          })}
        </div>

        <button
          onClick={() => setCurrent(new Date(year, month + 1, 1))}
          className="px-2"
        >
          ▶
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
        {WEEKDAYS.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {/* Empty cells before first day */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;

          // ✅ FIXED: local date ID
          const dateId = formatLocalDate(year, month, day);

          const isSelected = dateId === selectedDate;
          const isToday = dateId === today;

          return (
            <div
              key={dateId}
              onClick={() => onSelectDate(dateId)}
              className={`p-2 rounded cursor-pointer
                ${isSelected ? "bg-blue-600 text-white" : ""}
                ${!isSelected && isToday ? "border border-blue-500" : ""}
                ${!isSelected && !isToday ? "bg-gray-100" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}