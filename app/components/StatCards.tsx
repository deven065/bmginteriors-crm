import React from 'react';

const stats = [
  {
    title: 'Total Projects',
    value: '18',
    change: '+12%',
    changeText: 'from last month',
    trend: 'up',
    icon: (
      <svg className="w-6 h-6 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Active Tasks',
    value: '126',
    change: '+8%',
    changeText: 'from last month',
    trend: 'up',
    icon: (
      <svg className="w-6 h-6 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Workers Present',
    value: '64',
    change: '-5%',
    changeText: 'from yesterday',
    trend: 'down',
    icon: (
      <svg className="w-6 h-6 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Today's Attendance",
    value: '82%',
    change: '+6%',
    changeText: 'from yesterday',
    trend: 'up',
    icon: (
      <svg className="w-6 h-6 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 flex items-start border border-gray-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl border border-[#FFC700]/30 flex items-center justify-center mr-4 shrink-0">
            {stat.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
            <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
            <div className="flex items-center text-xs">
              {stat.trend === 'up' ? (
                <span className="text-green-500 flex items-center font-medium">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  {stat.change}
                </span>
              ) : (
                <span className="text-red-500 flex items-center font-medium">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  {stat.change}
                </span>
              )}
              <span className="text-gray-400 ml-1">{stat.changeText}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
