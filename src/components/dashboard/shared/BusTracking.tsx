import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin } from 'lucide-react';
import type { BusData } from '../../../types';

export default function BusTracking() {
  const [busNumber, setBusNumber] = useState('');
  const [busData, setBusData] = useState<BusData | null>(null);
  const [timeAway, setTimeAway] = useState<number>(5);

  useEffect(() => {
    if (busData) {
      const interval = setInterval(() => {
        setTimeAway(prev => {
          const newTime = prev - 1;
          return newTime > 0 ? newTime : 5;
        });
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [busData]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setBusData({
      busNumber,
      location: { lat: 40.7128, lng: -74.0060 },
      estimatedArrival: new Date(Date.now() + timeAway * 60000).toLocaleTimeString(),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <Bus className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Real-Time Bus Tracking</h2>
      </div>

      <form onSubmit={handleTrack} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            placeholder="Enter Bus Number (1-45)"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            pattern="^([1-9]|[1-3][0-9]|4[0-5])$"
            title="Please enter a number between 1 and 45"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Track
          </button>
        </div>
      </form>

      {busData && (
        <div className="space-y-4">
          <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
            <MapPin className="w-8 h-8 text-blue-600 animate-bounce" />
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-700">
              <Clock className="w-5 h-5" />
              <div>
                <p className="font-medium">Bus {busNumber} is {timeAway} minutes away</p>
                <p className="text-sm">Estimated arrival: {busData.estimatedArrival}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}