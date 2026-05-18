import React from 'react';

export default function AttendanceSummary() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Attendance Summary</h2>
        <div className="flex items-center text-xs border border-gray-200 rounded px-2 py-1 cursor-pointer hover:bg-gray-50">
          Today
          <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        <div className="w-32 h-32 relative shrink-0 mx-auto sm:mx-0">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E5E7EB" strokeWidth="12" />
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FFC700" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="45.21" />
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22C55E" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="45.21" className="transform origin-center -rotate-90" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">82%</span>
            <span className="text-[10px] text-[#FFC700] font-bold">Present</span>
          </div>
        </div>
        
        <div className="flex-1 w-full sm:pl-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></span>
              <span className="text-sm font-medium text-gray-600">Present</span>
            </div>
            <span className="font-bold text-gray-800">64</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></span>
              <span className="text-sm font-medium text-gray-600">Absent</span>
            </div>
            <span className="font-bold text-gray-800">12</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFC700] mr-2"></span>
              <span className="text-sm font-medium text-gray-600">On Leave</span>
            </div>
            <span className="font-bold text-gray-800">4</span>
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Workers</span>
            <span className="font-bold text-gray-800">80</span>
          </div>
        </div>
      </div>
    </div>
  );
}
