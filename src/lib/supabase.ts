import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Real-time subscriptions
export const subscribeToNotifications = (callback: (payload: any) => void) => {
  return supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notifications' },
      callback
    )
    .subscribe();
};

export const subscribeToBusLocation = (busId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`bus-${busId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'buses',
        filter: `id=eq.${busId}`
      },
      callback
    )
    .subscribe();
};

export const subscribeToAttendance = (studentId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`attendance-${studentId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'attendance',
        filter: `student_id=eq.${studentId}`
      },
      callback
    )
    .subscribe();
};