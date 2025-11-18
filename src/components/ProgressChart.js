"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProgressChart({progress}) {
  const data = progress.skills.map(skill => ({
    name: skill.name,
    value: skill.value
  }));

  return (
    <div className="chart-container">
      <h2 className="chart-title">Your Career Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]}/>
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#004aad" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
