import React from 'react';

export default function ProjectProgress() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Project Progress Overview</h2>
        <a href="#" className="text-[#FFC700] text-sm font-medium hover:underline">View all</a>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative my-4">
        {/* SVG Donut Chart */}
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E5E7EB" strokeWidth="12" />
            
            {/* On Hold - Grey */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#9CA3AF" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="223.56" />
            
            {/* Planning - Light Yellow */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FEF08A" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="180.86" />
            
            {/* In Progress - Gold/Yellow */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FFC700" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="55.26" />
            
            {/* Completed - Green */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22C55E" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="195.93" className="transform origin-center -rotate-90" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">18</span>
            <span className="text-xs text-gray-500 font-medium">Total</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></span>
            <span className="text-gray-600">Completed</span>
          </div>
          <span className="font-medium text-gray-800">4 (22%)</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFC700] mr-2"></span>
            <span className="text-gray-600">In Progress</span>
          </div>
          <span className="font-medium text-gray-800">9 (50%)</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-200 mr-2"></span>
            <span className="text-gray-600">Planning</span>
          </div>
          <span className="font-medium text-gray-800">3 (17%)</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400 mr-2"></span>
            <span className="text-gray-600">On Hold</span>
          </div>
          <span className="font-medium text-gray-800">2 (11%)</span>
        </div>
      </div>
    </div>
  );
}
