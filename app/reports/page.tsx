'use client';

import React, { useState } from 'react';

const stats = [
  {
    title: 'Total Projects',
    value: '16',
    change: '14%',
    changeText: 'from last month',
    trend: 'up',
    iconColor: 'bg-yellow-50 text-amber-500 border-yellow-100',
    icon: (
      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: 'Completed Tasks',
    value: '80',
    change: '18%',
    changeText: 'from last month',
    trend: 'up',
    iconColor: 'bg-green-50 text-green-500 border-green-100',
    icon: (
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: 'In Progress Tasks',
    value: '34',
    change: '8%',
    changeText: 'from last month',
    trend: 'up',
    iconColor: 'bg-blue-50 text-blue-500 border-blue-100',
    icon: (
      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Pending Tasks',
    value: '8',
    change: '12%',
    changeText: 'from last month',
    trend: 'down',
    iconColor: 'bg-orange-50 text-orange-500 border-orange-100',
    icon: (
      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: 'Total Workers',
    value: '80',
    change: '5%',
    changeText: 'from last month',
    trend: 'up',
    iconColor: 'bg-purple-50 text-purple-500 border-purple-100',
    icon: (
      <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Avg. Attendance',
    value: '92%',
    change: '6%',
    changeText: 'from last month',
    trend: 'up',
    iconColor: 'bg-red-50 text-red-500 border-red-100',
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const projectsPerformance = [
  { id: 1, name: 'Skyline Apartments', location: 'Mumbai', total: 28, completed: 18, inProgress: 7, pending: 2, overdue: 1, percent: 64, avatarSeed: '11' },
  { id: 2, name: 'Green Valley Villa', location: 'Bangalore', total: 22, completed: 15, inProgress: 5, pending: 1, overdue: 1, percent: 68, avatarSeed: '12' },
  { id: 3, name: 'Orchid Commercial', location: 'Delhi', total: 18, completed: 10, inProgress: 5, pending: 2, overdue: 1, percent: 55, avatarSeed: '13' },
  { id: 4, name: 'Palm Resort', location: 'Goa', total: 16, completed: 9, inProgress: 4, pending: 2, overdue: 1, percent: 56, avatarSeed: '16' },
  { id: 5, name: 'Lake View Homes', location: 'Pune', total: 14, completed: 8, inProgress: 4, pending: 1, overdue: 1, percent: 57, avatarSeed: '15' },
];

const topWorkers = [
  { id: 1, name: 'Ravi Kumar', role: 'Electrician', completed: 24, percent: 92, avatar: 'ravi' },
  { id: 2, name: 'Sunil Sharma', role: 'Carpenter', completed: 21, percent: 88, avatar: 'sunil' },
  { id: 3, name: 'Amit Singh', role: 'Civil Supervisor', completed: 18, percent: 81, avatar: 'amit' },
  { id: 4, name: 'Vikram Patel', role: 'Painter', completed: 16, percent: 76, avatar: 'painter' },
  { id: 5, name: 'Mahesh Yadav', role: 'Plumber', completed: 15, percent: 71, avatar: 'mahesh' },
];

const quickAccess = [
  { id: 1, title: 'Task Summary Report', desc: 'Detailed summary of all tasks', iconColor: 'bg-blue-50 text-blue-500 border-blue-100', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 2, title: 'Attendance Report', desc: 'Daily attendance summary', iconColor: 'bg-green-50 text-green-500 border-green-100', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 3, title: 'Project Progress Report', desc: 'Overall project progress', iconColor: 'bg-blue-50 text-blue-500 border-blue-100', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 4, title: 'Worker Performance Report', desc: 'Individual worker performance', iconColor: 'bg-purple-50 text-purple-500 border-purple-100', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
];

export default function Reports() {
  const [performanceList, setPerformanceList] = useState(projectsPerformance);
  const [topWorkersList, setTopWorkersList] = useState(topWorkers);

  const handleEditProjectPerformance = (id: number) => {
    const item = performanceList.find(p => p.id === id);
    if (!item) return;
    const newLocation = prompt('Edit Project Location:', item.location);
    if (newLocation) {
      setPerformanceList(performanceList.map(p => p.id === id ? { ...p, location: newLocation } : p));
    }
  };

  const handleDeleteProjectPerformance = (id: number) => {
    if (confirm('Delete this project performance log?')) {
      setPerformanceList(performanceList.filter(p => p.id !== id));
    }
  };

  const handleEditTopWorker = (id: number) => {
    const item = topWorkersList.find(w => w.id === id);
    if (!item) return;
    const newRole = prompt('Edit Worker Role:', item.role);
    if (newRole) {
      setTopWorkersList(topWorkersList.map(w => w.id === id ? { ...w, role: newRole } : w));
    }
  };

  const handleDeleteTopWorker = (id: number) => {
    if (confirm('Delete this top worker record?')) {
      setTopWorkersList(topWorkersList.filter(w => w.id !== id));
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-6">
      {/* Report Overview Top Row controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center bg-white rounded-2xl p-5 border border-gray-100 shadow-sm gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 leading-tight">Report Overview</h2>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            Summary of key insights across projects and operations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
          <button className="flex items-center bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-100 cursor-pointer">
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            May 1, 2024 - May 25, 2024
          </button>

          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[110px]">
            <option>All Projects</option>
          </select>

          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[95px]">
            <option>All Sites</option>
          </select>

          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center transition-colors shadow-sm cursor-pointer">
            <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Row 1: 6 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mr-4 shrink-0 shadow-sm ${stat.iconColor}`}>
              {stat.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-[10px] font-bold text-gray-400 mb-1 tracking-wider uppercase">{stat.title}</h3>
              <div className="text-xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="flex items-center text-[9px] font-bold">
                {stat.trend === 'up' ? (
                  <span className="text-green-500 flex items-center">
                    <svg className="w-2 h-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {stat.change}
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <svg className="w-2 h-2 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    {stat.change}
                  </span>
                )}
                <span className="text-gray-400 ml-1 font-semibold normal-case">{stat.changeText}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Charts (Task Distribution, Trend & Attendance) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        {/* Task Status Distribution */}
        <div className="xl:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <h2 className="text-sm font-bold text-gray-800 mb-6">Task Status Distribution</h2>
          
          <div className="flex flex-col sm:flex-row xl:flex-col items-center gap-6 justify-center">
            {/* Custom Circular Donut SVG */}
            <div className="w-36 h-36 relative shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E5E7EB" strokeWidth="10" />
                
                {/* Overdue - Red (2%) -> offset = 251.2 * (1 - 0.02) = 246.1 */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EF4444" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="246.17" className="transform origin-center rotate-[273deg]" />
                
                {/* Pending - Yellow (5%) -> offset = 251.2 * (1 - 0.05) = 238.6 */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FBBF24" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="238.64" className="transform origin-center rotate-[255deg]" />

                {/* In Progress - Blue (21%) -> offset = 251.2 * (1 - 0.21) = 198.4 */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="198.44" className="transform origin-center rotate-[180deg]" />

                {/* Completed - Green (50%) -> offset = 251.2 * (1 - 0.50) = 125.6 */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="125.6" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] text-gray-400 font-bold leading-none uppercase">Total Tasks</span>
                <span className="text-xl font-bold text-gray-800 leading-tight mt-1">126</span>
              </div>
            </div>

            {/* Legends */}
            <div className="flex-1 w-full space-y-3.5 text-xs">
              <div className="flex items-center justify-between font-semibold">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] mr-2"></span>
                  <span className="text-gray-500">Completed</span>
                </div>
                <span className="text-gray-800 font-bold">80 (50%)</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] mr-2"></span>
                  <span className="text-gray-500">In Progress</span>
                </div>
                <span className="text-gray-800 font-bold">34 (21%)</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] mr-2"></span>
                  <span className="text-gray-500">Pending</span>
                </div>
                <span className="text-gray-800 font-bold">8 (5%)</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] mr-2"></span>
                  <span className="text-gray-500">Overdue</span>
                </div>
                <span className="text-gray-800 font-bold">4 (2%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Trend Card */}
        <div className="xl:col-span-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-800">Tasks Trend</h2>
            <select className="border border-gray-200 text-[10px] text-gray-600 rounded-lg px-2.5 py-1.5 bg-white outline-none font-bold hover:bg-gray-50 cursor-pointer shadow-sm">
              <option>Daily</option>
            </select>
          </div>

          {/* Inline Legends */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-400 mb-6">
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] mr-1.5"></span>
              Completed
            </div>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] mr-1.5"></span>
              In Progress
            </div>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] mr-1.5"></span>
              Pending
            </div>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] mr-1.5"></span>
              Overdue
            </div>
          </div>

          {/* Custom SVG Line Chart */}
          <div className="flex-1 w-full relative min-h-[180px]">
            <svg viewBox="0 0 500 180" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#F3F4F6" strokeWidth={1} />
              <line x1="40" y1="55" x2="480" y2="55" stroke="#F3F4F6" strokeWidth={1} />
              <line x1="40" y1="90" x2="480" y2="90" stroke="#F3F4F6" strokeWidth={1} />
              <line x1="40" y1="125" x2="480" y2="125" stroke="#F3F4F6" strokeWidth={1} />
              <line x1="40" y1="160" x2="480" y2="160" stroke="#F3F4F6" strokeWidth={1} />

              {/* Y Axis Labels */}
              <text x="15" y="24" fill="#9CA3AF" fontSize="9" fontWeight="bold">80</text>
              <text x="15" y="59" fill="#9CA3AF" fontSize="9" fontWeight="bold">60</text>
              <text x="15" y="94" fill="#9CA3AF" fontSize="9" fontWeight="bold">40</text>
              <text x="15" y="129" fill="#9CA3AF" fontSize="9" fontWeight="bold">20</text>
              <text x="20" y="164" fill="#9CA3AF" fontSize="9" fontWeight="bold">0</text>

              {/* Line: Completed - Green */}
              <path d="M 40 95 Q 120 70 200 90 T 360 40 T 480 25" fill="none" stroke="#10B981" strokeWidth={2.5} />
              
              {/* Line: In Progress - Blue */}
              <path d="M 40 135 Q 120 120 200 128 T 360 90 T 480 75" fill="none" stroke="#3B82F6" strokeWidth={2} />
              
              {/* Line: Pending - Yellow */}
              <path d="M 40 150 Q 120 142 200 148 T 360 120 T 480 110" fill="none" stroke="#FBBF24" strokeWidth={2} />
              
              {/* Line: Overdue - Red */}
              <path d="M 40 158 Q 120 155 200 156 T 360 150 T 480 145" fill="none" stroke="#EF4444" strokeWidth={2} />

              {/* Data points */}
              <circle cx="480" cy="25" r="4.5" fill="#10B981" />
              <circle cx="480" cy="75" r="4.5" fill="#3B82F6" />

              {/* X Axis Labels */}
              <text x="35" y="175" fill="#9CA3AF" fontSize="9" fontWeight="bold">1 May</text>
              <text x="120" y="175" fill="#9CA3AF" fontSize="9" fontWeight="bold">6 May</text>
              <text x="205" y="175" fill="#9CA3AF" fontSize="9" fontWeight="bold">11 May</text>
              <text x="290" y="175" fill="#9CA3AF" fontSize="9" fontWeight="bold">16 May</text>
              <text x="375" y="175" fill="#9CA3AF" fontSize="9" fontWeight="bold">21 May</text>
              <text x="450" y="175" fill="#9CA3AF" fontSize="9" fontWeight="bold">25 May</text>
            </svg>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="xl:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-gray-800">Attendance Summary</h2>
            <select className="border border-gray-200 text-[10px] text-gray-600 rounded-lg px-2.5 py-1.5 bg-white outline-none font-bold hover:bg-gray-50 cursor-pointer shadow-sm">
              <option>This Month</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            {/* Circular Gauge SVG */}
            <div className="w-44 h-24 relative overflow-hidden shrink-0">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#E5E7EB" strokeWidth="12" strokeLinecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#10B981" strokeWidth="12" strokeDasharray="125.6" strokeDashoffset="10" strokeLinecap="round" />
                {/* Yellow tip border */}
                <path d="M 80 25 A 40 40 0 0 1 90 50" fill="none" stroke="#FBBF24" strokeWidth="12" strokeLinecap="round" />
              </svg>
              <div className="absolute bottom-0 inset-x-0 flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800 leading-none">92%</span>
                <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 leading-none">Average Attendance</span>
              </div>
            </div>

            {/* Legends */}
            <div className="flex items-center justify-between w-full text-xs font-semibold text-gray-500 mt-4 mb-6">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                Present <span className="text-gray-800 font-bold ml-1">64 (80%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></span>
                Late <span className="text-gray-800 font-bold ml-1">6 (7.5%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
                Absent <span className="text-gray-800 font-bold ml-1">12 (15%)</span>
              </div>
            </div>

            {/* Mini Stat box */}
            <div className="grid grid-cols-3 gap-3 w-full border-t border-gray-100 pt-4 text-center">
              <div>
                <span className="text-[9px] font-bold text-gray-400 block leading-tight">Total Working Days</span>
                <span className="text-sm font-bold text-gray-800 block mt-1">24</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-400 block leading-tight">Total Present</span>
                <span className="text-sm font-bold text-gray-800 block mt-1">1536</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-400 block leading-tight">Total Absent</span>
                <span className="text-sm font-bold text-gray-800 block mt-1">192</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Lists (Project Performance, Top Workers, Quick Access) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        {/* Project Performance table */}
        <div className="xl:col-span-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-6">Project Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="text-gray-400 font-bold border-b border-gray-100 uppercase tracking-wider">
                    <th className="pb-3.5 font-bold">Project Name</th>
                    <th className="pb-3.5 font-bold">Total Tasks</th>
                    <th className="pb-3.5 font-bold">Completed</th>
                    <th className="pb-3.5 font-bold">In Progress</th>
                    <th className="pb-3.5 font-bold">Pending</th>
                    <th className="pb-3.5 font-bold">Overdue</th>
                    <th className="pb-3.5 font-bold">Completion %</th>
                    <th className="pb-3.5 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {performanceList.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                            <img src={`https://picsum.photos/seed/${project.avatarSeed}/80/80`} alt={project.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-gray-800 block leading-tight">{project.name}</span>
                            <span className="text-[9px] text-gray-400 font-medium block mt-0.5">{project.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500 font-bold">{project.total}</td>
                      <td className="py-3 text-gray-500 font-bold">{project.completed}</td>
                      <td className="py-3 text-gray-500 font-bold">{project.inProgress}</td>
                      <td className="py-3 text-gray-500 font-bold">{project.pending}</td>
                      <td className="py-3 text-gray-500 font-bold">{project.overdue}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5 shrink-0 overflow-hidden">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${project.percent}%` }}></div>
                          </div>
                          <span className="font-bold text-gray-800 text-[10px]">{project.percent}%</span>
                        </div>
                      </td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleEditProjectPerformance(project.id)} className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => handleDeleteProjectPerformance(project.id)} className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <a href="#" className="text-[#FFC700] text-xs font-bold hover:underline inline-flex items-center mt-5 leading-none">
            View all projects report
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Top Workers by Task Completion */}
        <div className="xl:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-gray-800">Top Workers by Task Completion</h2>
              <select className="border border-gray-200 text-[9px] text-gray-600 rounded px-1.5 py-1 bg-white outline-none font-bold shadow-sm hover:bg-gray-50 cursor-pointer">
                <option>This Month</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] whitespace-nowrap">
                <thead>
                  <tr className="text-gray-400 font-bold border-b border-gray-100 uppercase tracking-wider">
                    <th className="pb-3.5 font-bold">Worker Name</th>
                    <th className="pb-3.5 font-bold">Role</th>
                    <th className="pb-3.5 font-bold">Tasks Completed</th>
                    <th className="pb-3.5 font-bold">Completion %</th>
                    <th className="pb-3.5 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {topWorkersList.map((worker) => (
                    <tr key={worker.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img src={`https://i.pravatar.cc/80?u=${worker.avatar}`} alt={worker.name} className="w-7 h-7 rounded-full border border-gray-100 shrink-0" />
                          <span className="font-bold text-gray-800 text-xs block leading-tight">{worker.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-gray-500 font-medium">{worker.role}</td>
                      <td className="py-3.5 text-gray-800 font-bold text-center sm:text-left pl-4">{worker.completed}</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-100 rounded-full h-1.5 shrink-0 overflow-hidden">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${worker.percent}%` }}></div>
                          </div>
                          <span className="font-bold text-gray-800 text-xs">{worker.percent}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleEditTopWorker(worker.id)} className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => handleDeleteTopWorker(worker.id)} className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <a href="#" className="text-[#FFC700] text-xs font-bold hover:underline inline-flex items-center mt-5 leading-none">
            View all workers report
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Reports Quick Access */}
        <div className="xl:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-5">Reports Quick Access</h2>
            
            <div className="divide-y divide-gray-50">
              {quickAccess.map((report) => (
                <div key={report.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${report.iconColor}`}>
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={report.icon} />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-800 block leading-tight">{report.title}</span>
                      <span className="text-[9px] text-gray-400 font-semibold block mt-0.5 leading-none">{report.desc}</span>
                    </div>
                  </div>
                  
                  {/* Download */}
                  <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shrink-0">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <a href="#" className="text-[#FFC700] text-xs font-bold hover:underline inline-flex items-center mt-5 leading-none">
            View all reports
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
