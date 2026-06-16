'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  deleteAttendance,
  listAttendance,
  updateAttendance,
  type CrmAttendance,
} from '../lib/crmData';

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
type AttendanceView = (typeof attendanceData)[number];

function toAttendanceView(attendance: CrmAttendance): AttendanceView {
  return {
    id: attendance.id,
    name: attendance.name,
    empId: attendance.empId || `ATT${String(attendance.id).padStart(3, '0')}`,
    role: attendance.role,
    project: attendance.project,
    checkIn: attendance.checkIn,
    checkInStatus: attendance.checkInStatus,
    checkOut: attendance.checkOut,
    hours: attendance.hours,
    status: attendance.status,
    avatar: attendance.avatar,
  };
}

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('Daily Attendance');
  const [attendanceList, setAttendanceList] = useState<AttendanceView[]>(attendanceData);
  const [absentsList, setAbsentsList] = useState(absentWorkers);
  const [holidaysList, setHolidaysList] = useState(holidays);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadAttendance = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await listAttendance();
        if (!cancelled) setAttendanceList(data.map(toAttendanceView));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load Supabase attendance.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadAttendance();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleEditAttendance = async (id: number) => {
    const item = attendanceList.find(w => w.id === id);
    if (!item) return;
    const newProject = prompt('Edit Project/Site:', item.project);
    if (newProject) {
      try {
        await updateAttendance(id, { project: newProject });
        setAttendanceList(attendanceList.map(w => w.id === id ? { ...w, project: newProject } : w));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to update attendance.');
      }
    }
  };

  const handleDeleteAttendance = async (id: number) => {
    if (confirm('Delete this attendance record?')) {
      try {
        await deleteAttendance(id);
        setAttendanceList(attendanceList.filter(w => w.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to delete attendance.');
      }
    }
  };

  const handleEditAbsent = (id: number) => {
    const item = absentsList.find(w => w.id === id);
    if (!item) return;
    const newProject = prompt('Edit Project:', item.project);
    if (newProject) {
      setAbsentsList(absentsList.map(w => w.id === id ? { ...w, project: newProject } : w));
    }
  };

  const handleDeleteAbsent = (id: number) => {
    if (confirm('Delete this absent worker record?')) {
      setAbsentsList(absentsList.filter(w => w.id !== id));
    }
  };

  const handleEditHoliday = (id: number) => {
    const item = holidaysList.find(h => h.id === id);
    if (!item) return;
    const newName = prompt('Edit Holiday Name:', item.name);
    if (newName) {
      setHolidaysList(holidaysList.map(h => h.id === id ? { ...h, name: newName } : h));
    }
  };

  const handleDeleteHoliday = (id: number) => {
    if (confirm('Delete this holiday?')) {
      setHolidaysList(holidaysList.filter(h => h.id !== id));
    }
  };

  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 19)); // Default to May 19, 2026
  const [selectedCalDay, setSelectedCalDay] = useState<number | null>(null);
  const [showCalModal, setShowCalModal] = useState(false);
  const [showAddHolidayModal, setShowAddHolidayModal] = useState(false);
  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', day: '' });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHoliday.name || !newHoliday.date || !newHoliday.day) return;
    setHolidaysList([
      ...holidaysList,
      { id: Date.now(), ...newHoliday }
    ]);
    setNewHoliday({ name: '', date: '', day: '' });
    setShowAddHolidayModal(false);
  };

  const filteredAttendance = attendanceList.filter((worker) => {
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
          
          <button 
            onClick={() => setActiveTab('Attendance Calendar')}
            className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View Calendar
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Main Grid: Left Table & Right Side widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Side: Dynamic Tab Renders */}
        <div className="xl:col-span-8 space-y-6">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 pb-3 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
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

          {/* TAB 1: DAILY ATTENDANCE & TAB 3: LEAVE REQUESTS */}
          {(activeTab === 'Daily Attendance' || activeTab === 'Leave Requests') && (
            <>
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
                              <Image src={`https://i.pravatar.cc/80?u=${worker.avatar}`} alt={worker.name} width={32} height={32} className="w-8 h-8 rounded-full border border-gray-100 shrink-0" />
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
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => handleEditAttendance(worker.id)} className="text-gray-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button onClick={() => handleDeleteAttendance(worker.id)} className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-gray-400 font-semibold">
                  <span>{loading ? 'Loading Supabase attendance...' : `Showing 1 to ${filteredAttendance.length} of ${attendanceList.length} workers`}</span>
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
            </>
          )}

          {/* TAB 2: INTERACTIVE ATTENDANCE CALENDAR */}
          {activeTab === 'Attendance Calendar' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
              {/* Calendar Month Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 leading-tight">
                    {monthNames[month]} {year}
                  </h2>
                  <span className="text-xs text-gray-400 font-semibold mt-1 block">
                    Click on any day below to view and edit details
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevMonth}
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={handleNextMonth}
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-3">
                {/* Empty cells for leading days */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square bg-gray-50/50 rounded-2xl border border-gray-50/50"></div>
                ))}

                {/* Days of current month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dayOfWeek = (firstDayIndex + i) % 7;
                  const isSunday = dayOfWeek === 0;

                  // Let's see if a holiday lands on this date
                  const holidayMatch = holidaysList.find(h => {
                    const hDay = parseInt(h.date.split(' ')[0], 10);
                    const hMonthStr = h.date.split(' ')[1];
                    const hMonthIdx = monthNames.findIndex(mn => mn.toLowerCase().substring(0,3) === hMonthStr.toLowerCase().substring(0,3));
                    return hDay === dayNum && hMonthIdx === month;
                  });

                  return (
                    <div 
                      key={`day-${dayNum}`}
                      onClick={() => {
                        if (!isSunday) {
                          setSelectedCalDay(dayNum);
                          setShowCalModal(true);
                        }
                      }}
                      className={`aspect-square rounded-2xl p-3 border flex flex-col justify-between transition-all select-none group ${
                        isSunday 
                          ? 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-gray-100 hover:border-[#FFC700] hover:shadow-md cursor-pointer text-gray-800'
                      }`}
                    >
                      {/* Day Number + Holiday Badge */}
                      <div className="flex justify-between items-start">
                        <span className={`text-sm font-extrabold ${isSunday ? 'text-gray-400' : 'text-gray-800'}`}>
                          {dayNum}
                        </span>
                        {holidayMatch && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FFC700] block" title={holidayMatch.name}></span>
                        )}
                      </div>

                      {/* Status summary */}
                      <div className="space-y-1">
                        {isSunday ? (
                          <span className="text-[9px] font-bold text-gray-400 block tracking-wide text-center uppercase">
                            Off
                          </span>
                        ) : holidayMatch ? (
                          <span className="text-[9px] font-extrabold text-[#FFC700] block truncate tracking-wide text-center uppercase leading-none bg-[#FFC700]/10 py-1 rounded">
                            {holidayMatch.name}
                          </span>
                        ) : (
                          <div className="flex flex-col gap-0.5">
                            {/* Attendance counts for weekdays */}
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 block shrink-0"></span>
                              <span className="text-[8px] text-gray-400 font-bold group-hover:text-gray-600 transition-colors">64 Present</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 block shrink-0"></span>
                              <span className="text-[8px] text-gray-400 font-bold group-hover:text-gray-600 transition-colors">12 Absent</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-between bg-gray-50/50 rounded-2xl p-4 border border-gray-100 gap-4 text-xs font-bold text-gray-500 mt-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
                  <span>Present (64 Workers)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
                  <span>Absent (12 Workers)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 block"></span>
                  <span>On Leave (4 Workers)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#FFC700] block"></span>
                  <span>Public Holiday</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HOLIDAYS MANAGEMENT LIST */}
          {activeTab === 'Holidays' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 leading-tight">Holidays & Roster Exceptions</h2>
                  <span className="text-xs text-gray-400 font-semibold mt-1 block">
                    Manage project site holidays, cultural events, and operational pauses.
                  </span>
                </div>
                <button 
                  onClick={() => setShowAddHolidayModal(true)}
                  className="bg-[#FFC700] hover:bg-[#e6b400] text-black text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Holiday
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {holidaysList.map((holiday) => (
                  <div key={holiday.id} className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-all flex items-start gap-4 bg-gray-50/30 group relative">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-800 leading-tight truncate">{holiday.name}</h3>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-2">Date & Day</span>
                      <span className="text-xs text-gray-600 font-semibold mt-0.5 block">
                        {holiday.date} ({holiday.day})
                      </span>
                    </div>

                    <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm p-1 rounded-lg border border-gray-100">
                      <button onClick={() => handleEditHoliday(holiday.id)} className="text-gray-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDeleteHoliday(holiday.id)} className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
              {absentsList.map((worker) => (
                <div key={worker.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0 gap-3 group relative">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Image src={`https://i.pravatar.cc/80?u=${worker.avatar}`} alt={worker.name} width={30} height={30} className="w-7.5 h-7.5 rounded-full border border-gray-100 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-gray-800 block truncate">{worker.name}</span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{worker.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-semibold text-right shrink-0 group-hover:opacity-0 transition-opacity">{worker.project}</span>
                  <span className="text-[9px] text-red-500 font-bold text-right shrink-0 bg-red-50 px-2 py-1 rounded border border-red-100 group-hover:opacity-0 transition-opacity">{worker.date}</span>
                  
                  <div className="absolute right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white pl-2">
                    <button onClick={() => handleEditAbsent(worker.id)} className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => handleDeleteAbsent(worker.id)} className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CALENDAR DETAILED DAY ROSTER MODAL */}
      {showCalModal && selectedCalDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCalModal(false)}
          ></div>
          
          <div className="relative bg-white border border-gray-100 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800 leading-tight">
                  Attendance Details — {monthNames[month]} {selectedCalDay}, {year}
                </h3>
                <p className="text-xs text-gray-400 font-semibold mt-1">
                  Site-level roster for this operational date
                </p>
              </div>
              <button 
                onClick={() => setShowCalModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content list */}
            <div className="p-6 overflow-y-auto flex-1 divide-y divide-gray-50">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-gray-400 font-bold border-b border-gray-100 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-bold">Worker</th>
                    <th className="pb-3 font-bold">Role</th>
                    <th className="pb-3 font-bold">Project Site</th>
                    <th className="pb-3 font-bold">Check-In</th>
                    <th className="pb-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(() => {
                    const isSunday = new Date(year, month, selectedCalDay).getDay() === 0;
                    return attendanceList.map((worker) => {
                      // Randomize slightly based on day index so each day looks slightly unique
                      const seedStatus = (worker.id + selectedCalDay) % 10;
                      const displayStatus = isSunday ? 'Absent' : (seedStatus === 0 ? 'Absent' : seedStatus === 1 ? 'On Leave' : seedStatus === 2 ? 'Late' : 'Present');
                      const displayCheckIn = displayStatus === 'Absent' || displayStatus === 'On Leave' ? '-' : (displayStatus === 'Late' ? '09:15 AM' : '08:05 AM');

                      return (
                        <tr key={worker.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <Image src={`https://i.pravatar.cc/80?u=${worker.avatar}`} alt={worker.name} width={32} height={32} className="w-8 h-8 rounded-full border border-gray-100" />
                              <span className="font-bold text-gray-800 text-sm">{worker.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-gray-500 font-medium text-xs">{worker.role}</td>
                          <td className="py-3 text-gray-700 font-semibold text-xs">{worker.project}</td>
                          <td className="py-3 text-gray-500 font-medium text-xs">{displayCheckIn}</td>
                          <td className="py-3 font-bold text-xs">
                            <span className={`px-2.5 py-1 rounded-lg border ${
                              displayStatus === 'Present' ? 'text-green-600 bg-green-50/50 border-green-100' :
                              displayStatus === 'Absent' ? 'text-red-500 bg-red-50/50 border-red-100' :
                              displayStatus === 'Late' ? 'text-orange-500 bg-orange-50/50 border-orange-100' :
                              'text-yellow-600 bg-yellow-50/50 border-yellow-100'
                            }`}>
                              {displayStatus}
                            </span>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setShowCalModal(false)}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD HOLIDAY FORM MODAL */}
      {showAddHolidayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddHolidayModal(false)}
          ></div>
          
          <form 
            onSubmit={handleAddHoliday}
            className="relative bg-white border border-gray-100 rounded-3xl w-full max-w-md shadow-2xl z-10 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div>
              <h3 className="text-base font-bold text-gray-800 leading-tight">Add New Public Holiday</h3>
              <p className="text-xs text-gray-400 font-semibold mt-1">
                Insert a public calendar exclusion for site operations.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Holiday Name</label>
                <input 
                  type="text" 
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                  placeholder="e.g. Diwali, Eid, Independence Day"
                  className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 text-xs placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-[#FFC700] outline-none rounded-xl transition-all font-bold text-gray-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Date</label>
                  <input 
                    type="text" 
                    value={newHoliday.date}
                    onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                    placeholder="e.g. 15 Aug 2024"
                    className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 text-xs placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-[#FFC700] outline-none rounded-xl transition-all font-bold text-gray-800"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Day</label>
                  <input 
                    type="text" 
                    value={newHoliday.day}
                    onChange={(e) => setNewHoliday({ ...newHoliday, day: e.target.value })}
                    placeholder="e.g. Thursday"
                    className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 text-xs placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-[#FFC700] outline-none rounded-xl transition-all font-bold text-gray-800"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-50">
              <button 
                type="button"
                onClick={() => setShowAddHolidayModal(false)}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-[#FFC700] hover:bg-[#e6b400] text-black text-xs font-bold py-2.5 px-5 rounded-xl transition-colors cursor-pointer"
              >
                Save Holiday
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
