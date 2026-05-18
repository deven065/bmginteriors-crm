'use client';

import React, { useState } from 'react';

const stats = [
  {
    title: 'Total Workers',
    value: '80',
    change: '5',
    changeText: 'from yesterday',
    trend: 'up',
    icon: (
      <svg className="w-5 h-5 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: 'Present',
    value: '64',
    change: '80%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-green-50 text-green-500 border-green-100',
    icon: (
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: 'Absent',
    value: '12',
    change: '15%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-red-50 text-red-500 border-red-100',
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  {
    title: 'On Leave',
    value: '4',
    change: '5%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-yellow-50 text-amber-500 border-yellow-100',
    icon: (
      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Late',
    value: '6',
    change: '7.5%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-orange-50 text-orange-500 border-orange-100',
    icon: (
      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const attendanceData = [
  { id: 1, name: 'Ravi Kumar', empId: 'EMP001', role: 'Electrician', project: 'Skyline Apartments', checkIn: '08:01 AM', checkInStatus: 'On Time', checkOut: '06:10 PM', hours: '9h 09m', status: 'Present', avatar: 'ravi' },
  { id: 2, name: 'Sunil Sharma', empId: 'EMP002', role: 'Carpenter', project: 'Green Valley Villa', checkIn: '09:10 AM', checkInStatus: 'Late', checkOut: '06:45 PM', hours: '9h 35m', status: 'Present', avatar: 'sunil' },
  { id: 3, name: 'Amit Singh', empId: 'EMP003', role: 'Civil Supervisor', project: 'Orchid Commercial', checkIn: '08:45 AM', checkInStatus: 'On Time', checkOut: '06:00 PM', hours: '9h 15m', status: 'Present', avatar: 'amit' },
  { id: 4, name: 'Vikram Patel', empId: 'EMP004', role: 'Painter', project: 'Skyline Apartments', checkIn: '-', checkInStatus: '', checkOut: '-', hours: '-', status: 'Absent', avatar: 'painter' },
  { id: 5, name: 'Mahesh Yadav', empId: 'EMP005', role: 'Plumber', project: 'Palm Resort', checkIn: '09:05 AM', checkInStatus: 'Late', checkOut: '05:30 PM', hours: '8h 15m', status: 'Present', avatar: 'mahesh' },
  { id: 6, name: 'Suresh Verma', empId: 'EMP006', role: 'Carpenter', project: 'Lake View Homes', checkIn: '08:00 AM', checkInStatus: 'On Time', checkOut: '06:15 PM', hours: '9h 15m', status: 'Present', avatar: 'worker1' },
  { id: 7, name: 'Rajesh Gupta', empId: 'EMP007', role: 'Electrician', project: 'Green Valley Villa', checkIn: '-', checkInStatus: '', checkOut: '-', hours: '-', status: 'On Leave', avatar: 'worker2' },
  { id: 8, name: 'Deepak Singh', empId: 'EMP008', role: 'Helper', project: 'Orchid Commercial', checkIn: '-', checkInStatus: '', checkOut: '-', hours: '-', status: 'On Leave', avatar: 'worker3' },
  { id: 9, name: 'Manoj Kumar', empId: 'EMP009', role: 'Painter', project: 'Skyline Apartments', checkIn: '09:20 AM', checkInStatus: 'Late', checkOut: '06:00 PM', hours: '8h 40m', status: 'Present', avatar: 'worker4' },
  { id: 10, name: 'Ramesh Yadav', empId: 'EMP010', role: 'Plumber', project: 'Palm Resort', checkIn: '08:05 AM', checkInStatus: 'On Time', checkOut: '06:20 PM', hours: '10h 15m', status: 'Present', avatar: 'worker5' },
];

const absentWorkers = [
  { id: 1, name: 'Vikram Patel', role: 'Painter', project: 'Skyline Apartments', date: 'May 25, 2024', avatar: 'painter' },
  { id: 2, name: 'Pooja Sharma', role: 'Helper', project: 'Green Valley Villa', date: 'May 25, 2024', avatar: 'pooja' },
  { id: 3, name: 'Ramesh Singh', role: 'Mason', project: 'Orchid Commercial', date: 'May 25, 2024', avatar: 'worker2' },
  { id: 4, name: 'Sandeep Kumar', role: 'Carpenter', project: 'Lake View Homes', date: 'May 25, 2024', avatar: 'worker5' },
];

const holidays = [
  { id: 1, name: 'Republic Day', date: '26 Jan 2024', day: 'Friday' },
  { id: 2, name: 'Holi', date: '25 Mar 2024', day: 'Monday' },
];

const tabs = ['Daily Attendance', 'Attendance Calendar', 'Leave Requests', 'Holidays'];

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('Daily Attendance');

  const filteredAttendance = attendanceData.filter((worker) => {
    if (activeTab === 'Daily Attendance') return true;
    if (activeTab === 'Leave Requests') return worker.status === 'On Leave';
    return true;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-6">
      {/* 5 Stats Cards Row + Right Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mr-4 shrink-0 shadow-sm ${
                stat.iconColor ? stat.iconColor : 'bg-gray-50 border-gray-100'
              }`}>
                {stat.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-400 mb-1">{stat.title}</h3>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="flex items-center text-[10px]">
                  {stat.trend === 'up' ? (
                    <span className="text-green-500 flex items-center font-bold">
                      <svg className="w-2.5 h-2.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      {stat.change}
                    </span>
                  ) : stat.trend === 'down' ? (
                    <span className="text-red-500 flex items-center font-bold">
                      <svg className="w-2.5 h-2.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      {stat.change}
                    </span>
                  ) : null}
                  <span className="text-gray-400 ml-1 font-semibold">{stat.changeText}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions stacked on the far right */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between gap-3 shrink-0">
          <button className="flex-1 bg-[#FFC700] hover:bg-[#e6b400] text-black text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          
          <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Attendance Report
          </button>
        </div>
      </div>

      {/* Main Grid: Left Table & Right Side widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Side: Attendance Table Card */}
        <div className="xl:col-span-8 space-y-6">
          {/* Tabs and Dropdown Filters Container */}
          <div className="border-b border-gray-200 pb-3 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
            {/* Left Side: Tabs */}
            <div className="flex flex-wrap gap-6 text-sm font-semibold">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 relative transition-all duration-200 cursor-pointer ${
                      isActive ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC700] rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls: Date Picker & Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <button className="flex items-center bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-100 cursor-pointer">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              May 25, 2024
            </button>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[110px]">
                <option>All Projects</option>
              </select>

              <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[95px]">
                <option>All Roles</option>
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

          {/* Table Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-gray-400 font-bold border-b border-gray-100 text-xs uppercase tracking-wider">
                    <th className="pb-4 font-bold">Worker Name</th>
                    <th className="pb-4 font-bold">Employee ID</th>
                    <th className="pb-4 font-bold">Role</th>
                    <th className="pb-4 font-bold">Project / Site</th>
                    <th className="pb-4 font-bold">Check In</th>
                    <th className="pb-4 font-bold">Check Out</th>
                    <th className="pb-4 font-bold">Total Hours</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredAttendance.map((worker) => (
                    <tr key={worker.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img src={`https://i.pravatar.cc/80?u=${worker.avatar}`} alt={worker.name} className="w-8 h-8 rounded-full border border-gray-100 shrink-0" />
                          <span className="font-bold text-gray-800 text-sm">{worker.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500 font-medium text-xs">{worker.empId}</td>
                      <td className="py-4 text-gray-500 font-medium text-xs">{worker.role}</td>
                      <td className="py-4 text-gray-700 font-semibold text-xs">{worker.project}</td>
                      <td className="py-4">
                        {worker.checkIn === '-' ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          <div>
                            <span className="text-gray-700 font-semibold text-xs block leading-tight">{worker.checkIn}</span>
                            <span className={`text-[9px] font-bold block mt-0.5 ${
                              worker.checkInStatus === 'On Time' ? 'text-green-500' : 'text-orange-500'
                            }`}>{worker.checkInStatus}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 text-gray-500 font-medium text-xs">{worker.checkOut}</td>
                      <td className="py-4 text-gray-500 font-medium text-xs">{worker.hours}</td>
                      <td className="py-4 font-bold text-xs">
                        <span className={`px-2.5 py-1.5 rounded-lg border ${
                          worker.status === 'Present' ? 'text-green-600 bg-green-50/50 border-green-100' :
                          worker.status === 'Absent' ? 'text-red-500 bg-red-50/50 border-red-100' :
                          'text-orange-500 bg-orange-50/50 border-orange-100'
                        }`}>
                          {worker.status}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-gray-400 font-semibold">
              <span>Showing 1 to {filteredAttendance.length} of 80 workers</span>
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer">&lt;</button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#FFC700] text-black font-bold shadow-sm transition-colors cursor-pointer">1</button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">2</button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">3</button>
                <span className="text-gray-300">...</span>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">8</button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer">&gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Column Widgets */}
        <div className="xl:col-span-4 space-y-6">
          {/* Widget 1: Attendance Overview */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-gray-800">Attendance Overview</h2>
              <div className="flex items-center text-xs border border-gray-200 rounded px-2.5 py-1.5 cursor-pointer bg-white font-bold hover:bg-gray-50">
                Today
                <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
              <div className="w-32 h-32 relative shrink-0 mx-auto sm:mx-0">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E5E7EB" strokeWidth="12" />
                  
                  {/* Absent - Red (15%) -> offset = 251.2 * (1 - 0.15) = 213.5 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EF4444" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="213.52" className="transform origin-center rotate-[288deg]" />
                  
                  {/* Late - Orange (7.5%) -> offset = 251.2 * (1 - 0.075) = 232.3 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F97316" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="232.36" className="transform origin-center rotate-[261deg]" />

                  {/* On Leave - Yellow (5%) -> offset = 251.2 * (1 - 0.05) = 238.6 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EAB308" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="238.64" className="transform origin-center rotate-[243deg]" />

                  {/* Present - Green (80%) -> offset = 251.2 * (1 - 0.80) = 50.2 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22C55E" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="50.24" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-gray-800 leading-tight">80%</span>
                  <span className="text-[9px] text-[#22C55E] font-bold">Present</span>
                </div>
              </div>
              
              <div className="flex-1 w-full sm:pl-4 space-y-3 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-gray-500">Present</span>
                  </div>
                  <span className="text-gray-800">64 (80%)</span>
                </div>
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                    <span className="text-gray-500">Absent</span>
                  </div>
                  <span className="text-gray-800">12 (15%)</span>
                </div>
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                    <span className="text-gray-500">On Leave</span>
                  </div>
                  <span className="text-gray-800">4 (5%)</span>
                </div>
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                    <span className="text-gray-500">Late</span>
                  </div>
                  <span className="text-gray-800">6 (7.5%)</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
              <span className="text-gray-400">Total Workers</span>
              <span className="text-gray-800 text-sm">80</span>
            </div>
          </div>

          {/* Widget 2: Recent Absent Workers */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-bold text-gray-800">Recent Absent Workers</h3>
              <a href="#" className="text-[#FFC700] text-xs font-bold hover:underline">View All</a>
            </div>
            
            <div className="divide-y divide-gray-50">
              {absentWorkers.map((worker) => (
                <div key={worker.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0 gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={`https://i.pravatar.cc/80?u=${worker.avatar}`} alt={worker.name} className="w-7.5 h-7.5 rounded-full border border-gray-100 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-gray-800 block truncate">{worker.name}</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{worker.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-semibold text-right shrink-0">{worker.project}</span>
                  <span className="text-[9px] text-red-500 font-bold text-right shrink-0 bg-red-50 px-2 py-1 rounded border border-red-100">{worker.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 3: Upcoming Holidays */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-bold text-gray-800">Upcoming Holidays</h3>
              <a href="#" className="text-[#FFC700] text-xs font-bold hover:underline">View Calendar</a>
            </div>

            <div className="divide-y divide-gray-50">
              {holidays.map((holiday) => (
                <div key={holiday.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-800 block leading-tight">{holiday.name}</span>
                      <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">{holiday.date}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-bold">{holiday.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
