import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface OptimizationResult {
  totalStudents: number;
  recommendedRoutes: number;
  studentsPerRoute: number;
}

export default function RouteOptimization() {
  const [formData, setFormData] = useState({
    area: '',
    yearGroups: [] as string[],
    timing: ''
  });
  const [result, setResult] = useState<OptimizationResult | null>(null);

  const handleYearGroupChange = (year: string) => {
    setFormData(prev => ({
      ...prev,
      yearGroups: prev.yearGroups.includes(year)
        ? prev.yearGroups.filter(y => y !== year)
        : [...prev.yearGroups, year]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalStudents = formData.yearGroups.length * 50;
    const studentsPerBus = 30;
    const recommendedRoutes = Math.ceil(totalStudents / studentsPerBus);
    
    setResult({
      totalStudents,
      recommendedRoutes,
      studentsPerRoute: Math.ceil(totalStudents / recommendedRoutes)
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Area Name
          </label>
          <input
            type="text"
            value={formData.area}
            onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter area name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Groups
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((year) => (
              <label
                key={year}
                className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={formData.yearGroups.includes(year)}
                  onChange={() => handleYearGroupChange(year)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{year}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bus Timing
          </label>
          <select
            value={formData.timing}
            onChange={(e) => setFormData(prev => ({ ...prev, timing: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Time</option>
            <option value="13:00">1:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate Optimal Routes
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Optimization Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{result.totalStudents}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Recommended Routes</p>
              <p className="text-2xl font-bold text-blue-600">{result.recommendedRoutes}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Students per Route</p>
              <p className="text-2xl font-bold text-gray-900">{result.studentsPerRoute}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}