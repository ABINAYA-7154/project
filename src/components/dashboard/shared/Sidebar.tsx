import React from 'react';
import { Bus, LineChart, Leaf, Bell, UserCheck, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

interface SidebarProps {
  userType: 'student' | 'management';
  userName: string;
}

export default function Sidebar({ userType, userName }: SidebarProps) {
  const { logout } = useAuth();
  
  const menuItems = userType === 'student' 
    ? [
        { icon: Bus, label: 'Bus Tracking' },
        { icon: Leaf, label: 'Carbon Footprint' },
        { icon: Bell, label: 'Notifications' },
        { icon: UserCheck, label: 'Attendance' },
        { icon: MessageSquare, label: 'Feedback' },
      ]
    : [
        { icon: Bus, label: 'Bus Tracking' },
        { icon: LineChart, label: 'Analytics' },
        { icon: Leaf, label: 'Carbon Footprint' },
        { icon: Bell, label: 'Notifications' },
        { icon: MessageSquare, label: 'Feedback Review' },
      ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <Bus className="w-10 h-10 text-blue-600" />
        </div>
        <div className="text-center mb-8">
          <h2 className="font-semibold text-gray-800">{userName}</h2>
          <p className="text-sm text-gray-500 capitalize">{userType}</p>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 w-64 p-4 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}