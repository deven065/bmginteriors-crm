'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const title = 
    pathname === '/projects' ? 'Projects' : 
    pathname === '/tasks' ? 'Tasks' : 
    pathname === '/attendance' ? 'Attendance' :
    pathname === '/workers' ? 'Workers' :
    pathname === '/documents' ? 'Documents' :
    pathname === '/chat' ? 'Chat' :
    pathname === '/reports' ? 'Reports' :
    pathname === '/settings' ? 'Settings' :
    'Dashboard';
  const searchPlaceholder = 
    pathname === '/projects' ? 'Search projects...' : 
    pathname === '/tasks' ? 'Search tasks...' : 
    pathname === '/attendance' ? 'Search workers...' :
    pathname === '/workers' ? 'Search workers...' :
    pathname === '/documents' ? 'Search documents...' :
    pathname === '/chat' ? 'Search chats, groups or messages...' :
    pathname === '/reports' ? 'Search reports...' :
    pathname === '/settings' ? 'Search settings...' :
    'Search anything...';

  return (
    <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-700 transition-colors lg:hidden"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex-1 max-w-2xl px-8 hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 border-transparent bg-gray-50 text-sm placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#FFC700] focus:border-transparent rounded-2xl transition-all"
            placeholder={searchPlaceholder}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors relative">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 block w-4 h-4 bg-[#FFC700] rounded-full text-[10px] text-black font-bold flex items-center justify-center border-2 border-white">
            8
          </span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors relative">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute top-1 right-1 block w-4 h-4 bg-[#FFC700] rounded-full text-[10px] text-black font-bold flex items-center justify-center border-2 border-white">
            5
          </span>
        </button>

        <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">May 25, 2024</span>
        </div>
      </div>
    </div>
  );
}
