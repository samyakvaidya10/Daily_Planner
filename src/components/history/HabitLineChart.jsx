import { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function HabitLineChart({ data, onSelectDay }) {
  const lastDateRef = useRef(null);

  return (
    <div className="w-full" style={{ height: 200, minHeight: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis dataKey="dateId" hide />
          <YAxis allowDecimals={false} width={24} />

          <Tooltip
            formatter={(value) => [`Completed: ${value}`, ""]}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const dateId = payload[0].payload.dateId;

                // ✅ Store only, no state update here
                if (lastDateRef.current !== dateId) {
                  lastDateRef.current = dateId;
                  setTimeout(() => onSelectDay(dateId), 0);
                }
              }
              return null;
            }}
          />

          <Line
            type="monotone"
            dataKey="completed"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
