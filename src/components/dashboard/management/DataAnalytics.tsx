import React, { useState } from 'react';
import { LineChart, Clock, AlertTriangle, Bus } from 'lucide-react';
import BusPerformanceTable from './tables/BusPerformanceTable';

const busData = [
  {
    busNumber: "Bus 1",
    yesterday: { arrival: "8:32 AM", delay: 12 },
    today: { arrival: "8:25 AM", delay: 5 }
  },
  {
    busNumber: "Bus 2",
    yesterday: { arrival: "8:45 AM", delay: 15 },
    today: { arrival: "8:40 AM", delay: 10 }
  },
  {
    busNumber: "Bus 3",
    yesterday: { arrival: "8:15 AM", delay: 0 },
    today: { arrival: "8:22 AM", delay: 7 }
  },
  {
    busNumber: "Bus 4",
    yesterday: { arrival: "8:55 AM", delay: 25 },
    today: { arrival: "8:35 AM", delay: 5 }
  },
  {
    busNumber: "Bus 5",
    yesterday: { arrival: "8:28 AM", delay: 8 },
    today: { arrival: "8:30 AM", delay: 10 }
  }
];

export default function DataAnalytics() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <LineChart className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Bus Performance Analytics</h2>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <BusPerformanceTable data={busData} />
    </div>
  );
}