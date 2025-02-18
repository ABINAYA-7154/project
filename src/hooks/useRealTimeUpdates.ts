import { useState, useEffect } from 'react';
import { dummyDb } from '../lib/dummyDb';
import type { BusData } from '../types';

export function useRealTimeUpdates(busNumber: string | null) {
  const [data, setData] = useState<BusData | null>(null);

  useEffect(() => {
    if (!busNumber) return;

    // Initial fetch
    const initialData = dummyDb.getBusData(busNumber);
    if (initialData) {
      setData(initialData);
    }

    // Subscribe to real-time updates
    const unsubscribe = dummyDb.subscribe('bus-' + busNumber, (updatedData) => {
      setData(updatedData);
    });

    return () => {
      unsubscribe();
    };
  }, [busNumber]);

  return data;
}