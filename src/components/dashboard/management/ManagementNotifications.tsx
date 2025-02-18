import React from 'react';
import { Bell, Fuel, FileCheck, Bus, AlertTriangle } from 'lucide-react';
import type { Notification } from '../../../types';

export default function ManagementNotifications() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'speed',
      message: 'ALERT: Bus 4 exceeded speed limit (75 km/h in 60 km/h zone) and showing aggressive driving patterns on Ring Road',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'fuel',
      message: 'Bus 2 fuel level at 15% - Refuel required',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString()
    },
    {
      id: '3',
      type: 'license',
      message: 'Driver Rajesh Kumar (KA-DL-2024-65432) license renewal due in 15 days',
      timestamp: new Date(Date.now() - 25 * 60000).toISOString()
    },
    {
      id: '4',
      type: 'bus',
      message: 'Bus 5 scheduled maintenance: Break inspection due tomorrow',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString()
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'speed': return 'bg-red-100 text-red-800 border-l-4 border-red-500';
      case 'fuel': return 'bg-orange-100 text-orange-800 border-l-4 border-orange-500';
      case 'license': return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
      case 'bus': return 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500';
      default: return 'bg-gray-100 text-gray-800 border-l-4 border-gray-500';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'speed': return AlertTriangle;
      case 'fuel': return Fuel;
      case 'license': return FileCheck;
      case 'bus': return Bus;
      default: return Bell;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Real-Time Alerts</h2>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {notifications.length} New
        </span>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          return (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${getNotificationColor(notification.type)} transform transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm mt-1 opacity-75">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}