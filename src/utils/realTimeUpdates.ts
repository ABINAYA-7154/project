import { BusData, Notification } from '../types';

// Simulate real-time data updates
export const simulateRealTimeData = (busNumber: string): BusData => {
  const randomDelay = Math.floor(Math.random() * 10);
  const estimatedArrival = new Date(Date.now() + randomDelay * 60000);
  
  return {
    busNumber,
    location: {
      lat: 40.7128 + (Math.random() - 0.5) * 0.01,
      lng: -74.0060 + (Math.random() - 0.5) * 0.01
    },
    estimatedArrival: estimatedArrival.toLocaleTimeString()
  };
};

export const getSpeedingNotification = (busNumber: string, speed: number, limit: number): Notification => ({
  id: Date.now().toString(),
  type: 'speed',
  message: `ALERT: Bus ${busNumber} exceeded speed limit (${speed} km/h in ${limit} km/h zone)`,
  timestamp: new Date().toISOString()
});