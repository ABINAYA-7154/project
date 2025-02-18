import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Sidebar from '../shared/Sidebar';
import BusTracking from '../shared/BusTracking';
import CarbonFootprint from '../shared/CarbonFootprint';  // Make sure this is imported
import DataAnalytics from './DataAnalytics';
import RouteOptimization from './RouteOptimization';
import ManagementNotifications from './ManagementNotifications';
import FeedbackReview from './FeedbackReview';
import DriverPerformance from './DriverPerformance';

export default function ManagementDashboard() {
  const { user } = useAuth();
  const management = user as Management;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        userType="management"
        userName={management.collegeName}
      />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome {management.collegeName} to BusBuddy
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DataAnalytics />
          <RouteOptimization />
          <BusTracking />
          <CarbonFootprint />  {/* Make sure this is included */}
          <ManagementNotifications />
          <FeedbackReview />
          <DriverPerformance />
        </div>
      </main>
    </div>
  );
}