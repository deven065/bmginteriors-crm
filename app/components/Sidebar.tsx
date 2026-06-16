'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Dashboard', href: '/', icon: 'M4 6h16M4 12h16M4 18h16' },
  { name: 'Projects', href: '/projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { name: 'Tasks', href: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { name: 'Attendance', href: '/attendance', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { name: 'Workers', href: '/workers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { name: 'Documents', href: '/documents', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { name: 'Chat', href: '/chat', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { name: 'Reports', href: '/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'Settings', href: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

export default function Sidebar({ closeDrawer }: { closeDrawer?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Filter navigation items based on User Role RBAC
  const allowedItems = user?.role === 'CUSTOMER'
    ? ['Dashboard', 'Projects', 'Tasks', 'Documents', 'Chat']
    : ['Dashboard', 'Projects', 'Tasks', 'Attendance', 'Workers', 'Documents', 'Chat', 'Reports', 'Settings'];

  const filteredNavItems = navItems.filter((item) => allowedItems.includes(item.name));

  const avatarUrl = user?.role === 'ADMIN'
    ? 'https://i.pravatar.cc/150?u=johndoe'
    : 'https://i.pravatar.cc/150?u=rajeshmehta';

  return (
    <div className="w-64 bg-[#1A1A1A] text-white flex flex-col h-full shrink-0 relative">
      <div className="p-6 flex flex-col items-center border-b border-white/10 select-none">
        <Image
          src="/bmg-logo-original.png" 
          alt="BMG Interiors" 
          width={120}
          height={64}
          className="h-16 w-auto object-contain hover:brightness-110 transition-all duration-300"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeDrawer}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#FFC700] text-black font-extrabold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center p-3 rounded-xl hover:bg-white/5 transition-colors border border-white/10">
          <Image
            src={avatarUrl}
            alt={user?.fullName || 'User'}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border border-white/20 shrink-0"
          />
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.fullName || 'User'}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role?.toLowerCase() || 'Role'}</p>
          </div>
          <button
            onClick={() => {
              void logout();
            }}
            className="ml-2 p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
            title="Log Out"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
