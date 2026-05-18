'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../context/AuthContext';
import LoginView from './LoginView';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F0F11] text-white w-full">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#FFC700]/20 border-t-[#FFC700] rounded-full animate-spin"></div>
          <div className="absolute inset-0 bg-[#FFC700]/10 blur-md rounded-full"></div>
        </div>
        <p className="text-xs font-semibold text-gray-400 mt-6 tracking-[0.2em] uppercase">BMG Interiors</p>
        <p className="text-[10px] text-gray-600 mt-1 tracking-wider">Securing environment...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  // Check if current route is restricted for CUSTOMER users
  const restrictedRoutes = ['/attendance', '/workers', '/reports', '/settings'];
  const isRestricted = user.role === 'CUSTOMER' && restrictedRoutes.some(route => pathname.startsWith(route));

  if (isRestricted) {
    return (
      <div className="min-h-full flex flex-row h-screen bg-[#F5F6FA] text-gray-900 font-sans overflow-hidden w-full relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex h-full shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <div className="relative flex w-64 max-w-xs flex-col bg-[#1A1A1A] h-full z-10 shadow-2xl transition-transform duration-300 transform translate-x-0">
              <div className="absolute top-5 right-5">
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Sidebar closeDrawer={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Restricted content wrapper */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F5F6FA] flex items-center justify-center">
            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl text-center relative overflow-hidden">
              <div className="w-20 h-20 bg-[#FFC700]/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <svg className="w-10 h-10 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Access Restricted</h2>
              <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
                This CRM section is restricted to <strong>Administrator</strong> roles only. Customer accounts do not have permission to view this directory.
              </p>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/"
                  className="bg-[#FFC700] hover:bg-[#e6b400] text-black font-extrabold text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-[#FFC700]/10 hover:shadow-[#FFC700]/25 cursor-pointer"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-row h-screen bg-[#F5F6FA] text-gray-900 font-sans overflow-hidden w-full relative">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          ></div>
          
          {/* Drawer content */}
          <div className="relative flex w-64 max-w-xs flex-col bg-[#1A1A1A] h-full z-10 shadow-2xl transition-transform duration-300 transform translate-x-0">
            <div className="absolute top-5 right-5">
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar closeDrawer={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F5F6FA]">
          {children}
        </main>
      </div>
    </div>
  );
}
