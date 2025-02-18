import React from 'react';
import { Bell } from 'lucide-react';
import type { Notification } from '../../../types';

export default function StudentNotifications() {
  // Simulated notifications
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'management',
      message: 'New schedule update for next week',
      timestamp: '2024-02-20T10:00:00Z'
    },
    {
      id: '2',
      type: 'driver',
      message: 'Bus 102 will be 5 minutes late',
      timestamp: '2024-02-20T09:30:00Z'
    },
    {
      id: '3',
      type: 'bus',
      message: 'Your bus is 5 minutes away',
      timestamp: '2024-02-20T09:00:00Z'
    },
    {
      id: '4',
      type: 'exam',
      message: 'New exam schedule posted',
      timestamp: '2024-02-20T08:00:00Z'
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'management': return 'bg-red-100 text-red-800';
      case 'driver': return 'bg-blue-100 text-blue-800';
      case 'bus': return 'bg-yellow-100 text-yellow-800';
      case 'exam': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg ${getNotificationColor(notification.type)}`}
          >
            <p className="font-medium">{notification.message}</p>
            <p className="text-sm mt-1 opacity-75">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}