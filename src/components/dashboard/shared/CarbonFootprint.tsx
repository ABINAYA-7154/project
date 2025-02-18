import React from 'react';
import { Leaf, TreePine, Calendar } from 'lucide-react';
import CarbonMetricCard from './cards/CarbonMetricCard';
import type { CarbonData } from '../../../types';

export default function CarbonFootprint() {
  const carbonData: CarbonData = {
    todayReduction: 127.5,
    treesEquivalent: 12,
    lastMonthReduction: 3842.8
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Leaf className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold">Carbon Footprint Impact</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CarbonMetricCard
          icon={Leaf}
          title="Today's Reduction"
          value={`${carbonData.todayReduction.toFixed(1)} kg`}
          subtitle="CO₂ emissions saved"
        />
        <CarbonMetricCard
          icon={TreePine}
          title="Tree Equivalent"
          value={carbonData.treesEquivalent.toString()}
          subtitle="Trees worth of CO₂ absorbed"
        />
        <CarbonMetricCard
          icon={Calendar}
          title="Monthly Impact"
          value={`${carbonData.lastMonthReduction.toFixed(1)} kg`}
          subtitle="CO₂ reduced last month"
        />
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h3 className="font-medium text-green-700 mb-2">Environmental Impact</h3>
        <p className="text-sm text-green-600">
          Your bus commute has helped reduce carbon emissions equivalent to {carbonData.treesEquivalent} trees' annual CO₂ absorption. 
          Keep using sustainable transport to make a difference!
        </p>
      </div>
    </div>
  );
}