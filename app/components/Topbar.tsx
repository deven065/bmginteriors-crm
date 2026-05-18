'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'task' | 'chat' | 'system' | 'upload';
}

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: 'New Blueprint Uploaded',
      description: 'Skyline Apartments Tower B CAD drawing uploaded by Amit Singh.',
      time: '10 mins ago',
      read: false,
      type: 'upload'
    },
    {
      id: 2,
      title: 'New Client Message',
      description: 'Client Aravind K sent a chat message regarding Lake View Villa.',
      time: '1 hour ago',
      read: false,
      type: 'chat'
    },
    {
      id: 3,
      title: 'Inspection Scheduled',
      description: 'Site inspection scheduled at Green Valley Villa by Ravi Kumar.',
      time: '3 hours ago',
      read: false,
      type: 'system'
    },
    {
      id: 4,
      title: 'Attendance Roster Logged',
      description: 'Sunil Sharma marked Present for Orchid Commercial site.',
      time: 'Yesterday',
      read: true,
      type: 'task'
    }
  ]);

  // Click outside to close notifications dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

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
    <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 relative">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-700 transition-colors lg:hidden animate-fade-in"
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
        {/* Notifications Bell Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors relative cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 block w-4 h-4 bg-[#FFC700] rounded-full text-[10px] text-black font-bold flex items-center justify-center border-2 border-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">CRM Alerts</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    className="text-[#FFC700] hover:text-[#e6b400] text-[10px] font-extrabold uppercase cursor-pointer hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400 font-semibold">
                    No notifications right now.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => handleMarkAsRead(notif.id)}
                      className={`p-4 flex items-start gap-3 transition-colors cursor-pointer ${
                        notif.read ? 'bg-white opacity-60' : 'bg-amber-50/10 hover:bg-amber-50/20'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        notif.type === 'upload' ? 'bg-blue-50 border-blue-100 text-blue-500' :
                        notif.type === 'chat' ? 'bg-green-50 border-green-100 text-green-500' :
                        notif.type === 'task' ? 'bg-amber-50 border-amber-100 text-amber-500' :
                        'bg-gray-50 border-gray-100 text-gray-500'
                      }`}>
                        {notif.type === 'upload' && (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        )}
                        {notif.type === 'chat' && (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        )}
                        {notif.type === 'task' && (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        )}
                        {notif.type === 'system' && (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-xs font-bold text-gray-800 leading-snug truncate">{notif.title}</h4>
                          <span className="text-[9px] text-gray-400 shrink-0 font-semibold">{notif.time}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium leading-normal mt-0.5">{notif.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 bg-gray-50 border-t border-gray-50 flex justify-center">
                  <button 
                    onClick={handleClearAll}
                    className="text-xs font-bold text-gray-500 hover:text-red-500 cursor-pointer"
                  >
                    Clear All Notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Messages Shortcut Link */}
        <Link href="/chat" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors relative cursor-pointer block">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute top-1 right-1 block w-4 h-4 bg-[#FFC700] rounded-full text-[10px] text-black font-bold flex items-center justify-center border-2 border-white">
            5
          </span>
        </Link>

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
