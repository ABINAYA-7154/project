import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Sidebar from '../shared/Sidebar';
import BusTracking from '../shared/BusTracking';
import CarbonFootprint from '../shared/CarbonFootprint';  // Make sure this is imported
import StudentAttendance from './StudentAttendance';
import StudentFeedback from './StudentFeedback';
import StudentNotifications from './StudentNotifications';
import StudentReview from './StudentReview';

export default function StudentDashboard() {
  const { user } = useAuth();
  const student = user as Student;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        userType="student"
        userName={student.name}
      />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome {student.name} to BusBuddy
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BusTracking />
          <CarbonFootprint />  {/* Make sure this is included */}
          <StudentAttendance />
          <StudentNotifications />
          <StudentFeedback />
          <StudentReview />
        </div>
      </main>
    </div>
  );
}