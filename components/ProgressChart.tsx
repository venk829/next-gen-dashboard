"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ProgressChart({
  courses,
}: {
  courses: any[];
}) {
  return (
    <div className="bg-white p-5 rounded-2xl">
      <h2 className="text-xl font-bold mb-4 text-black">
        Course Progress Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={courses}>
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="progress" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}