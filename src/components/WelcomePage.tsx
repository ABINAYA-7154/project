import React from 'react';
import { Bus } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Bus className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-8">Welcome to BusBuddy</h1>
          <p className="text-xl text-white/90 mb-12">
            Your smart companion for efficient and sustainable campus transportation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => window.location.href = '/student-login'}
              className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-105"
            >
              Student Login
            </button>
            
            <button
              onClick={() => window.location.href = '/management-login'}
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-105"
            >
              Management Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}