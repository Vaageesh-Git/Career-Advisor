"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProgressChart() {
  const data = [
    { month: "Jan", progress: 20 },
    { month: "Feb", progress: 40 },
    { month: "Mar", progress: 60 },
    { month: "Apr", progress: 80 },
    { month: "May", progress: 100 },
  ];

  return (
    <div className="chart-container">
      <h2 className="chart-title">Your Career Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="progress" stroke="#004aad" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
