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
  console.log(progress , "progress")
  // Extract values safely
  const completed = progress?.completedCount || 0;
  const failed = progress?.failedCount || 0;
  const pending = progress?.pendingCount || 0;

  const total = completed + failed + pending;

  // If total is 0, show a single "No Data" slice
  const data =
    total === 0
      ? [{ name: "No Data", value: 1 }]
      : [
          { name: "Success", value: completed },
          { name: "Failed", value: failed },
          { name: "Pending", value: pending },
        ];

  const COLORS = total === 0 ? ["#ccc"] : ["#00C49F", "#FF4D4F", "#FFBB28"];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, color } = payload[0];
      return (
        <div className="bg-white text-sm shadow-md rounded-md px-2 py-1 border border-gray-200">
          <p className="font-medium" style={{ color }}>
            {name}: {value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = ({ payload }) => (
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
            // paddingAngle={0}
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
