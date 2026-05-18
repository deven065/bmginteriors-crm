'use client';

import React, { useState } from 'react';

const stats = [
  {
    title: 'Total Workers',
    value: '80',
    change: '5',
    changeText: 'from last month',
    trend: 'up',
    iconColor: 'bg-gray-50 text-[#FFC700] border-gray-100',
    icon: (
      <svg className="w-5 h-5 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: 'Active Workers',
    value: '68',
    change: '85%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-green-50 text-green-500 border-green-100',
    icon: (
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    title: 'Inactive Workers',
    value: '12',
    change: '15%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-red-50 text-red-500 border-red-100',
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
      </svg>
    ),
  },
  {
    title: 'Supervisors',
    value: '8',
    change: '10%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-purple-50 text-purple-500 border-purple-100',
    icon: (
      <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Labour / Helpers',
    value: '56',
    change: '70%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-blue-50 text-blue-500 border-blue-100',
    icon: (
      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const workersData = [
  { id: 1, name: 'Ravi Kumar', empId: 'EMP001', role: 'Electrician', phone: '+91 98765 43210', email: 'ravi@bmg.com', project: 'Skyline Apartments', status: 'Active', date: '10 Jan 2024', avatar: 'ravi' },
  { id: 2, name: 'Sunil Sharma', empId: 'EMP002', role: 'Carpenter', phone: '+91 87654 32109', email: 'sunil@bmg.com', project: 'Green Valley Villa', status: 'Active', date: '15 Jan 2024', avatar: 'sunil' },
  { id: 3, name: 'Amit Singh', empId: 'EMP003', role: 'Civil Supervisor', phone: '+91 76543 21098', email: 'amit@bmg.com', project: 'Orchid Commercial', status: 'Active', date: '20 Dec 2023', avatar: 'amit' },
  { id: 4, name: 'Vikram Patel', empId: 'EMP004', role: 'Painter', phone: '+91 65432 10987', email: 'vikram@bmg.com', project: 'Skyline Apartments', status: 'Active', date: '05 Feb 2024', avatar: 'painter' },
  { id: 5, name: 'Mahesh Yadav', empId: 'EMP005', role: 'Plumber', phone: '+91 54321 09876', email: 'mahesh@bmg.com', project: 'Palm Resort', status: 'Active', date: '12 Feb 2024', avatar: 'mahesh' },
  { id: 6, name: 'Suresh Verma', empId: 'EMP006', role: 'Carpenter', phone: '+91 91234 56789', email: 'suresh@bmg.com', project: 'Lake View Homes', status: 'Active', date: '18 Feb 2024', avatar: 'worker1' },
  { id: 7, name: 'Rajesh Gupta', empId: 'EMP007', role: 'Electrician', phone: '+91 99887 76655', email: 'rajesh@bmg.com', project: 'Green Valley Villa', status: 'Inactive', date: '28 Nov 2023', avatar: 'worker2' },
  { id: 8, name: 'Deepak Singh', empId: 'EMP008', role: 'Helper', phone: '+91 88991 12233', email: 'deepak@bmg.com', project: 'Orchid Commercial', status: 'Inactive', date: '01 Dec 2023', avatar: 'worker3' },
  { id: 9, name: 'Manoj Kumar', empId: 'EMP009', role: 'Painter', phone: '+91 77665 44332', email: 'manoj@bmg.com', project: 'Skyline Apartments', status: 'Active', date: '01 Mar 2024', avatar: 'worker4' },
  { id: 10, name: 'Ramesh Yadav', empId: 'EMP010', role: 'Plumber', phone: '+91 66554 33221', email: 'ramesh@bmg.com', project: 'Palm Resort', status: 'Active', date: '08 Mar 2024', avatar: 'worker5' },
];

const tabs = ['All Workers', 'Active', 'Inactive', 'Supervisors', 'Skilled Workers', 'Helpers'];

export default function Workers() {
  const [activeTab, setActiveTab] = useState('All Workers');

  const filteredWorkers = workersData.filter((worker) => {
    if (activeTab === 'All Workers') return true;
    if (activeTab === 'Active') return worker.status === 'Active';
    if (activeTab === 'Inactive') return worker.status === 'Inactive';
    if (activeTab === 'Supervisors') return worker.role.includes('Supervisor');
    if (activeTab === 'Helpers') return worker.role === 'Helper';
    if (activeTab === 'Skilled Workers') return ['Electrician', 'Carpenter', 'Painter', 'Plumber'].includes(worker.role);
    return true;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-6">
      {/* 5 Stats Cards Row + Right Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mr-4 shrink-0 shadow-sm ${stat.iconColor}`}>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Worker
          </button>
          
          <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Tabs and Dropdown Filters Row */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-gray-200 pb-3 gap-4">
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

        {/* Right Side: Filters Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[95px]">
            <option>All Roles</option>
          </select>
          
          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[110px]">
            <option>All Projects</option>
          </select>

          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[95px]">
            <option>All Status</option>
          </select>
          
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center transition-colors shadow-sm cursor-pointer">
            <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Main Workers Table Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-gray-400 font-bold border-b border-gray-100 text-xs uppercase tracking-wider">
                <th className="pb-4 font-bold">Worker Name</th>
                <th className="pb-4 font-bold">Employee ID</th>
                <th className="pb-4 font-bold">Role</th>
                <th className="pb-4 font-bold">Phone</th>
                <th className="pb-4 font-bold">Email</th>
                <th className="pb-4 font-bold">Project / Site</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Join Date</th>
                <th className="pb-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredWorkers.map((worker) => (
                <tr key={worker.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/80?u=${worker.avatar}`} alt={worker.name} className="w-8 h-8 rounded-full border border-gray-100 shrink-0" />
                      <span className="font-bold text-gray-800 text-sm">{worker.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500 font-medium text-xs">{worker.empId}</td>
                  <td className="py-4 text-gray-500 font-medium text-xs">{worker.role}</td>
                  <td className="py-4 text-gray-500 font-medium text-xs">{worker.phone}</td>
                  <td className="py-4 text-gray-500 font-medium text-xs">{worker.email}</td>
                  <td className="py-4 text-gray-700 font-semibold text-xs">{worker.project}</td>
                  <td className="py-4 font-bold text-xs">
                    <span className={`px-2.5 py-1.5 rounded-lg border ${
                      worker.status === 'Active' ? 'text-green-600 bg-green-50/50 border-green-100' : 
                      'text-red-500 bg-red-50/50 border-red-100'
                    }`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500 font-medium text-xs">{worker.date}</td>
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
          <span>Showing 1 to {filteredWorkers.length} of 80 workers</span>
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
  );
}
