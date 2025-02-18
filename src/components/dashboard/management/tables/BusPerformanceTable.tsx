import React from 'react';
import { Clock, AlertTriangle, Bus } from 'lucide-react';

interface BusPerformanceData {
  busNumber: string;
  yesterday: { arrival: string; delay: number };
  today: { arrival: string; delay: number };
}

interface Props {
  data: BusPerformanceData[];
}

export default function BusPerformanceTable({ data }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bus Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Yesterday
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delay
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Today
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delay
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((bus) => (
            <tr key={bus.busNumber} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <Bus className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{bus.busNumber}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{bus.yesterday.arrival}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`flex items-center space-x-1 ${bus.yesterday.delay > 10 ? 'text-red-600' : 'text-green-600'}`}>
                  <AlertTriangle className={`w-4 h-4 ${bus.yesterday.delay > 10 ? 'visible' : 'invisible'}`} />
                  <span>{bus.yesterday.delay} min</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{bus.today.arrival}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`flex items-center space-x-1 ${bus.today.delay > 10 ? 'text-red-600' : 'text-green-600'}`}>
                  <AlertTriangle className={`w-4 h-4 ${bus.today.delay > 10 ? 'visible' : 'invisible'}`} />
                  <span>{bus.today.delay} min</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}