export interface Student {
  name: string;
  email: string;
  rollNumber: string;
  busNumber: string;
}

export interface Management {
  collegeName: string;
}

export interface BusData {
  busNumber: string;
  location: {
    lat: number;
    lng: number;
  };
  estimatedArrival: string;
}

export interface CarbonData {
  todayReduction: number;
  treesEquivalent: number;
  lastMonthReduction: number;
}

export interface Notification {
  id: string;
  type: 'management' | 'driver' | 'bus' | 'exam' | 'fuel' | 'license' | 'speed';
  message: string;
  timestamp: string;
}