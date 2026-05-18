'use client';

import React, { useState } from 'react';

const stats = [
  {
    title: 'Total Tasks',
    value: '126',
    change: '12%',
    changeText: 'from last month',
    trend: 'up',
    icon: (
      <svg className="w-5 h-5 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Completed',
    value: '80',
    change: '15%',
    changeText: 'from last month',
    trend: 'up',
    icon: (
      <svg className="w-5 h-5 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'In Progress',
    value: '34',
    change: '5%',
    changeText: 'from last month',
    trend: 'up',
    icon: (
      <svg className="w-5 h-5 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Pending',
    value: '8',
    change: '10%',
    changeText: 'from last month',
    trend: 'down',
    icon: (
      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: 'Overdue',
    value: '4',
    change: '20%',
    changeText: 'from last month',
    trend: 'down',
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const tasksData = [
  {
    id: 1,
    name: 'Electrical Work - Level 2',
    subtitle: '2nd Floor - Units 201 to 208',
    project: 'Skyline Apartments',
    location: 'Mumbai',
    projSeed: '11',
    assignee: 'Ravi Kumar',
    role: 'Electrician',
    avatar: 'ravi',
    priority: 'High',
    status: 'In Progress',
    dueDate: '25 May 2024',
    dueSubtitle: '2 days left',
    progress: '60%',
    iconColor: 'bg-blue-50 text-blue-500',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Modular Kitchen Setup',
    subtitle: 'Unit 104 - Kitchen Area',
    project: 'Green Valley Villa',
    location: 'Bangalore',
    projSeed: '12',
    assignee: 'Sunil Sharma',
    role: 'Carpenter',
    avatar: 'sunil',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '26 May 2024',
    dueSubtitle: '3 days left',
    progress: '40%',
    iconColor: 'bg-green-50 text-green-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'False Ceiling Installation',
    subtitle: 'Lobby Area',
    project: 'Orchid Commercial',
    location: 'Delhi',
    projSeed: '13',
    assignee: 'Amit Singh',
    role: 'Civil Supervisor',
    avatar: 'amit',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '27 May 2024',
    dueSubtitle: '4 days left',
    progress: '0%',
    iconColor: 'bg-yellow-50 text-amber-500',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Painting - First Coat',
    subtitle: 'Exterior Walls',
    project: 'Skyline Apartments',
    location: 'Mumbai',
    projSeed: '14',
    assignee: 'Ravi Kumar',
    role: 'Painter',
    avatar: 'ravi',
    priority: 'High',
    status: 'In Progress',
    dueDate: '28 May 2024',
    dueSubtitle: '5 days left',
    progress: '30%',
    iconColor: 'bg-purple-50 text-purple-500',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Flooring Work',
    subtitle: 'Living & Dining Area',
    project: 'Lake View Homes',
    location: 'Pune',
    projSeed: '15',
    assignee: 'Vikram Patel',
    role: 'Flooring Expert',
    avatar: 'vikram',
    priority: 'Low',
    status: 'Pending',
    dueDate: '30 May 2024',
    dueSubtitle: '7 days left',
    progress: '0%',
    iconColor: 'bg-blue-50 text-blue-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Plumbing Work',
    subtitle: 'Bathroom Area',
    project: 'Palm Resort',
    location: 'Goa',
    projSeed: '16',
    assignee: 'Mahesh Yadav',
    role: 'Plumber',
    avatar: 'mahesh',
    priority: 'High',
    status: 'Completed',
    dueDate: '20 May 2024',
    dueSubtitle: 'Completed',
    progress: '100%',
    iconColor: 'bg-orange-50 text-orange-500',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 7,
    name: 'Window Installation',
    subtitle: 'All Bedroom Windows',
    project: 'Green Valley Villa',
    location: 'Bangalore',
    projSeed: '17',
    assignee: 'Ravi Kumar',
    role: 'Worker',
    avatar: 'ravi',
    priority: 'Low',
    status: 'Completed',
    dueDate: '18 May 2024',
    dueSubtitle: 'Completed',
    progress: '100%',
    iconColor: 'bg-cyan-50 text-cyan-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 8,
    name: 'Quality Inspection',
    subtitle: 'Level 1 - Full Area',
    project: 'Corporate Office',
    location: 'Hyderabad',
    projSeed: '18',
    assignee: 'Amit Singh',
    role: 'Supervisor',
    avatar: 'amit',
    priority: 'High',
    status: 'Pending',
    dueDate: '02 Jun 2024',
    dueSubtitle: '10 days left',
    progress: '0%',
    iconColor: 'bg-rose-50 text-rose-500',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

const tabs = ['All Tasks', 'In Progress', 'Pending', 'Completed', 'Overdue'];

export default function Tasks() {
  const [activeTab, setActiveTab] = useState('All Tasks');
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTasks(tasksData.map((task) => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleSelectTask = (id: number) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((tId) => tId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const filteredTasks = tasksData.filter((task) => {
    if (activeTab === 'All Tasks') return true;
    return task.status === activeTab;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-6">
      {/* 5 Stats Cards Row + Right Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
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

        {/* Actions stacked on the far right */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between gap-3 shrink-0">
          <button className="flex-1 bg-[#FFC700] hover:bg-[#e6b400] text-black text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Task
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
          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[110px]">
            <option>All Projects</option>
          </select>
          
          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[115px]">
            <option>All Assignees</option>
          </select>

          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[105px]">
            <option>All Priority</option>
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

      {/* Main Tasks Table Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-gray-400 font-bold border-b border-gray-100 text-xs uppercase tracking-wider">
                <th className="pb-4 w-10 text-center font-bold">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedTasks.length === tasksData.length}
                    className="w-4 h-4 rounded text-[#FFC700] border-gray-300 focus:ring-[#FFC700] cursor-pointer" 
                  />
                </th>
                <th className="pb-4 font-bold">Task Name</th>
                <th className="pb-4 font-bold">Project</th>
                <th className="pb-4 font-bold">Assigned To</th>
                <th className="pb-4 font-bold">Priority</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Due Date</th>
                <th className="pb-4 font-bold">Progress</th>
                <th className="pb-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => handleSelectTask(task.id)}
                      className="w-4 h-4 rounded text-[#FFC700] border-gray-300 focus:ring-[#FFC700] cursor-pointer"
                    />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100 ${task.iconColor}`}>
                        {task.icon}
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 text-sm block leading-tight">{task.name}</span>
                        <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{task.subtitle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg shrink-0 overflow-hidden border border-gray-100">
                        <img src={`https://picsum.photos/seed/${task.projSeed}/100/100`} alt={task.project} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 text-xs block leading-tight">{task.project}</span>
                        <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{task.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2.5">
                      <img src={`https://i.pravatar.cc/80?u=${task.avatar}`} alt={task.assignee} className="w-7 h-7 rounded-full border border-gray-100 shrink-0" />
                      <div>
                        <span className="text-gray-700 font-bold text-xs block leading-tight">{task.assignee}</span>
                        <span className="text-[9px] text-gray-400 font-medium block mt-0.5">{task.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-bold text-xs">
                    <span className={`px-2.5 py-1 rounded-lg border ${
                      task.priority === 'High' ? 'text-red-500 bg-red-50/50 border-red-100' :
                      task.priority === 'Medium' ? 'text-orange-500 bg-orange-50/50 border-orange-100' :
                      'text-green-500 bg-green-50/50 border-green-100'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-xs">
                    <span className={`px-2.5 py-1.5 rounded-lg border ${
                      task.status === 'In Progress' ? 'text-orange-500 bg-orange-50/50 border-orange-100' :
                      task.status === 'Pending' ? 'text-yellow-600 bg-yellow-50/50 border-yellow-100' :
                      'text-green-600 bg-green-50/50 border-green-100'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <span className="text-gray-700 font-medium text-xs block leading-tight">{task.dueDate}</span>
                        <span className={`text-[9px] font-bold block mt-0.5 ${
                          task.dueSubtitle === 'Completed' ? 'text-green-500' : 'text-red-500'
                        }`}>{task.dueSubtitle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold w-8 text-gray-700">{task.progress}</span>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full">
                        <div 
                          className={`h-full rounded-full ${
                            task.status === 'Completed' ? 'bg-green-500' : 'bg-[#FFC700]'
                          }`} 
                          style={{ width: task.progress }}
                        ></div>
                      </div>
                    </div>
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
          <span>Showing 1 to {filteredTasks.length} of 126 tasks</span>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer">&lt;</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#FFC700] text-black font-bold shadow-sm transition-colors cursor-pointer">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">3</button>
            <span className="text-gray-300">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">16</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
