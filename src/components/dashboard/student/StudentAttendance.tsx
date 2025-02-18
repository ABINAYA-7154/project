import React, { useState } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

export default function StudentAttendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Simulated attendance data
  const attendanceData = {
    present: true,
    weeklyReport: Array(7).fill(null).map((_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: Math.random() > 0.2
    }))
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <CheckCircle className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Digital Attendance</h2>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-700 mb-2">Today's Status</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${attendanceData.present ? 'bg-green-500' : 'bg-red-500'}`} />
            <span>{attendanceData.present ? 'Present' : 'Absent'}</span>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">7-Day Report</h3>
          <div className="space-y-2">
            {attendanceData.weeklyReport.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>{day.date}</span>
                <div className={`px-2 py-1 rounded ${day.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {day.status ? 'Present' : 'Absent'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}