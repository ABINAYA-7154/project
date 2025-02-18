import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
}

export default function CarbonMetricCard({ icon: Icon, title, value, subtitle }: Props) {
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <div className="flex items-center space-x-2 text-green-700 mb-2">
        <Icon className="w-5 h-5" />
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-2xl font-bold text-green-800">{value}</p>
      <p className="text-sm text-green-600">{subtitle}</p>
    </div>
  );
}