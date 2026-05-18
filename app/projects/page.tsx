'use client';

import React, { useState } from 'react';

const stats = [
  {
    title: 'Total Projects',
    value: '18',
    change: '+12%',
    changeText: 'from last month',
    trend: 'up',
    icon: (
      <svg className="w-5 h-5 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'In Progress',
    value: '7',
    change: '+8%',
    changeText: 'from last month',
    trend: 'up',
    icon: (
      <svg className="w-5 h-5 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Near Completion',
    value: '4',
    change: '+6%',
    changeText: 'from last month',
    trend: 'up',
    icon: (
      <svg className="w-5 h-5 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'On Hold',
    value: '2',
    change: '-4%',
    changeText: 'from last month',
    trend: 'down',
    icon: (
      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Completed',
    value: '5',
    change: '+10%',
    changeText: 'from last month',
    trend: 'up',
    icon: (
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const projectsData = [
  { id: 1, name: 'Skyline Apartments', type: 'Residential', loc: 'Mumbai', status: 'In Progress', progress: '75%', start: '10 Jun 2024', end: '10 Oct 2024', manager: 'Ravi Kumar', managerId: 'ravi' },
  { id: 2, name: 'Orchid Commercial', type: 'Commercial', loc: 'Delhi', status: 'In Progress', progress: '40%', start: '05 Feb 2024', end: '20 Aug 2024', manager: 'Sunil Sharma', managerId: 'sunil' },
  { id: 3, name: 'Green Valley Villa', type: 'Residential', loc: 'Bangalore', status: 'Near Completion', progress: '90%', start: '15 Jun 2024', end: '15 Jun 2024', manager: 'Amit Singh', managerId: 'amit' },
  { id: 4, name: 'Palm Resort', type: 'Hospitality', loc: 'Goa', status: 'Planning', progress: '20%', start: '01 Jul 2024', end: '30 Dec 2024', manager: 'Vikram Patel', managerId: 'vikram' },
  { id: 5, name: 'Lake View Homes', type: 'Residential', loc: 'Pune', status: 'On Hold', progress: '10%', start: '20 Feb 2024', end: '20 Nov 2024', manager: 'Mahesh Yadav', managerId: 'mahesh' },
  { id: 6, name: 'Corporate Office', type: 'Commercial', loc: 'Hyderabad', status: 'In Progress', progress: '60%', start: '12 Mar 2024', end: '12 Sep 2024', manager: 'Ravi Kumar', managerId: 'ravi' },
  { id: 7, name: 'Golden Heights', type: 'Residential', loc: 'Chennai', status: 'Completed', progress: '100%', start: '10 Jan 2024', end: '20 Apr 2024', manager: 'Sunil Sharma', managerId: 'sunil' },
  { id: 8, name: 'Ocean Breeze Villas', type: 'Residential', loc: 'Goa', status: 'Planning', progress: '15%', start: '25 May 2024', end: '25 Jan 2025', manager: 'Amit Singh', managerId: 'amit' },
  { id: 9, name: 'Tech Park Phase 1', type: 'Commercial', loc: 'Bangalore', status: 'In Progress', progress: '30%', start: '18 Mar 2024', end: '18 Sep 2024', manager: 'Vikram Patel', managerId: 'vikram' },
  { id: 10, name: 'Heritage Hotel', type: 'Hospitality', loc: 'Jaipur', status: 'Completed', progress: '100%', start: '01 Sep 2023', end: '15 Jan 2024', manager: 'Mahesh Yadav', managerId: 'mahesh' },
];

const tabs = ['All Projects', 'In Progress', 'Planning', 'Near Completion', 'On Hold', 'Completed'];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All Projects');

  const filteredProjects = projectsData.filter((proj) => {
    if (activeTab === 'All Projects') return true;
    return proj.status === activeTab;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-6">
      {/* 5 Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center mr-4 shrink-0 shadow-sm bg-gray-50">
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
                ) : (
                  <span className="text-red-500 flex items-center font-bold">
                    <svg className="w-2.5 h-2.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    {stat.change}
                  </span>
                )}
                <span className="text-gray-400 ml-1 font-medium">{stat.changeText}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs and Right Actions row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 gap-4">
        <div className="flex flex-wrap gap-6 text-sm font-medium">
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
        
        <div className="flex items-center gap-3">
          <button className="bg-[#FFC700] hover:bg-[#e6b400] text-black text-xs font-bold px-4 py-2 rounded-xl flex items-center transition-colors shadow-sm">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </button>
          
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl flex items-center transition-colors shadow-sm">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-gray-400 font-bold border-b border-gray-100 text-xs uppercase tracking-wider">
                <th className="pb-4 font-bold">Project Name</th>
                <th className="pb-4 font-bold">Type</th>
                <th className="pb-4 font-bold">Location</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Progress</th>
                <th className="pb-4 font-bold">Start Date</th>
                <th className="pb-4 font-bold">End Date</th>
                <th className="pb-4 font-bold">Manager</th>
                <th className="pb-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProjects.map((proj) => (
                <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl shrink-0 overflow-hidden border border-gray-100">
                        <img src={`https://picsum.photos/seed/${proj.id+30}/100/100`} alt={proj.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-gray-800 text-sm">{proj.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500 font-medium text-xs">{proj.type}</td>
                  <td className="py-4 text-gray-500 font-medium text-xs">{proj.loc}</td>
                  <td className="py-4 font-bold text-xs">
                    <span className={`px-2.5 py-1.5 rounded-lg border ${
                      proj.status === 'In Progress' ? 'text-orange-500 bg-orange-50/50 border-orange-100' : 
                      proj.status === 'Near Completion' ? 'text-amber-600 bg-amber-50/50 border-amber-100' : 
                      proj.status === 'On Hold' ? 'text-orange-600 bg-orange-50/50 border-orange-200' : 
                      proj.status === 'Completed' ? 'text-green-600 bg-green-50/50 border-green-100' :
                      'text-yellow-600 bg-yellow-50/50 border-yellow-100'
                    }`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold w-8 text-gray-700">{proj.progress}</span>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full">
                        <div 
                          className={`h-full rounded-full ${
                            proj.status === 'Completed' ? 'bg-green-500' : 'bg-[#FFC700]'
                          }`} 
                          style={{ width: proj.progress }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500 font-medium text-xs">{proj.start}</td>
                  <td className="py-4 text-gray-500 font-medium text-xs">{proj.end}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <img src={`https://i.pravatar.cc/80?u=${proj.managerId}`} alt={proj.manager} className="w-6 h-6 rounded-full border border-gray-100" />
                      <span className="text-gray-700 font-bold text-xs">{proj.manager}</span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
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
          <span>Showing 1 to {filteredProjects.length} of 18 projects</span>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors">&lt;</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#FFC700] text-black font-bold shadow-sm transition-colors">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">3</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
