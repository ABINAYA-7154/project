import React from 'react';
import { useAuth } from './hooks/useAuth';
import WelcomePage from './components/WelcomePage';
import StudentLogin from './components/auth/StudentLogin';
import ManagementLogin from './components/auth/ManagementLogin';
import StudentDashboard from './components/dashboard/student/StudentDashboard';
import ManagementDashboard from './components/dashboard/management/ManagementDashboard';

function App() {
  const { isAuthenticated, userType } = useAuth();
  const path = window.location.pathname;

  // If authenticated, only show dashboard
  if (isAuthenticated) {
    if (userType === 'student') {
      return <StudentDashboard />;
    }
    if (userType === 'management') {
      return <ManagementDashboard />;
    }
  }

  // If not authenticated, show login pages or welcome page
  return (
    <div className="min-h-screen bg-gray-50">
      {path === '/' && <WelcomePage />}
      {path === '/student-login' && <StudentLogin />}
      {path === '/management-login' && <ManagementLogin />}
    </div>
  );
}

export default App;