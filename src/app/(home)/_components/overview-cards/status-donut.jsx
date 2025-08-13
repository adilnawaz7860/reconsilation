"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function StatusDonutChart({ progress }) {
  const data = [
    { name: "Success", value: progress?.completedCount || 0.00001 },
    { name: "Failed", value: progress?.failedCount || 0.00001 },
    { name: "Pending", value: progress?.pendingCount || 0.0001 },
  ];

  const COLORS = ["#00C49F", "#FF4D4F", "#FFBB28"]; // Green, Red, Yellow

  // Custom tooltip (smaller & cleaner)
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-sm shadow-md rounded-md px-2 py-1 border border-gray-200">
          <p className="font-medium" style={{ color: payload[0].color }}>
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend with small circles
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center mt-4 gap-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-sm">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend content={renderLegend} />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
