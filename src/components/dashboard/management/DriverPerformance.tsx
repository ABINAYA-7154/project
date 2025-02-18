import React, { useState } from 'react';
import { Star, TrendingUp, UserCheck, AlertTriangle } from 'lucide-react';

interface DriverData {
  id: string;
  name: string;
  busNumber: string;
  overallRating: number;
  punctualityScore: number;
  behaviorScore: number;
  speedingIncidents: number;
  totalTrips: number;
}

export default function DriverPerformance() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Simulated driver performance data
  const driversData: DriverData[] = [
    {
      id: 'DRV001',
      name: 'Rajesh Kumar',
      busNumber: 'Bus 1',
      overallRating: 4.8,
      punctualityScore: 95,
      behaviorScore: 98,
      speedingIncidents: 0,
      totalTrips: 42
    },
    {
      id: 'DRV002',
      name: 'Suresh Patel',
      busNumber: 'Bus 2',
      overallRating: 4.2,
      punctualityScore: 88,
      behaviorScore: 92,
      speedingIncidents: 2,
      totalTrips: 38
    },
    // Add more drivers as needed
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Driver Performance Metrics</h2>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>

      <div className="space-y-6">
        {driversData.map((driver) => (
          <div key={driver.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{driver.name}</h3>
                <p className="text-sm text-gray-500">{driver.busNumber}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{driver.overallRating.toFixed(1)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-600 mb-1">
                  <UserCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">Punctuality</span>
                </div>
                <p className="text-2xl font-bold">{driver.punctualityScore}%</p>
              </div>

              <div className="bg-white p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-green-600 mb-1">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Behavior</span>
                </div>
                <p className="text-2xl font-bold">{driver.behaviorScore}%</p>
              </div>

              <div className="bg-white p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-red-600 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">Speeding</span>
                </div>
                <p className="text-2xl font-bold">{driver.speedingIncidents}</p>
              </div>

              <div className="bg-white p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-purple-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Total Trips</span>
                </div>
                <p className="text-2xl font-bold">{driver.totalTrips}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}