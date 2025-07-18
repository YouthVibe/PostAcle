'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartDisplayProps {
  data: { name: string; value: number }[];
  titleChart: string;
  lableX: string;
  lableY: string;
}

export default function ChartDisplay({
  data,
  titleChart,
  lableX,
  lableY,
}: ChartDisplayProps) {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-2 text-blue-400">
        {titleChart}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
          <XAxis
            dataKey="name"
            stroke="#cbd5e0"
            label={{
              value: lableX,
              position: 'insideBottomRight',
              offset: -5,
            }}
          />
          <YAxis
            stroke="#cbd5e0"
            label={{
              value: lableY,
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip formatter={(value: any, name: any, props: any) => [`${value}`, name]} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}