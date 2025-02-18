import React from 'react';
import { getNotificationColors } from '../../utils/colorScheme';

interface NotificationBadgeProps {
  type: string;
  children: React.ReactNode;
}

export default function NotificationBadge({ type, children }: NotificationBadgeProps) {
  const colors = getNotificationColors(type);
  
  return (
    <div className={`${colors.background} ${colors.text} px-3 py-1 rounded-full text-sm font-medium`}>
      {children}
    </div>
  );
}