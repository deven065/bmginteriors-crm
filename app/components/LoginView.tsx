'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginView() {
  const { login, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setLoading(true);
    await login(username, password);
    setLoading(false);
  };

  const handleQuickLogin = async (role: 'ADMIN' | 'CUSTOMER') => {
    setLoading(true);
    if (role === 'ADMIN') {
      await login('admin', 'admin123');
    } else {
      await login('customer', 'customer123');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F11] text-white p-4 font-sans relative overflow-hidden w-full">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FFC700]/10 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-300 hover:border-[#FFC700]/20">
        
        {/* Branding header */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-[#FFC700] text-6xl font-bold tracking-tighter mb-1 relative animate-bounce" style={{ animationDuration: '3s' }}>
            <span className="relative z-10">BMG</span>
            <div className="absolute inset-0 bg-[#FFC700]/20 blur-md z-0 rounded-full"></div>
          </div>
          <div className="text-white text-xs tracking-[0.25em] uppercase font-semibold">Interiors</div>
          <div className="text-[#FFC700] text-[7px] tracking-[0.15em] mt-1 font-bold">WE DESIGN YOUR DREAMS</div>
          <h2 className="text-lg font-bold text-gray-300 mt-6 tracking-wide">CRM Portal Login</h2>
          <p className="text-xs text-gray-500 mt-1">Please enter your credentials to proceed</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-500/30 text-red-300 rounded-xl text-xs flex items-center gap-2.5 animate-shake">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-[#FFC700] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-[#FFC700] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFC700] hover:bg-[#e6b400] text-black font-extrabold text-sm py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#FFC700]/10 hover:shadow-[#FFC700]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                Sign In
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Quick Testing Options Divider */}
        <div className="relative my-8">
          <div className="absolute inset-y-1/2 left-0 right-0 h-[1px] bg-white/10"></div>
          <span className="relative z-10 block w-max mx-auto px-4 bg-[#0F0F11] text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
            Developer Sandbox
          </span>
        </div>

        {/* Quick Access Grid */}
        <div className="space-y-2">
          <p className="text-[10px] text-center text-gray-400 font-semibold mb-3">
            Quickly authenticate into roles with one tap:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickLogin('ADMIN')}
              disabled={loading}
              className="bg-white/5 hover:bg-[#FFC700]/10 border border-white/5 hover:border-[#FFC700]/30 text-white hover:text-[#FFC700] rounded-xl py-2 px-3 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <div className="w-1.5 h-1.5 bg-[#FFC700] rounded-full animate-pulse"></div>
              As Admin
            </button>
            <button
              onClick={() => handleQuickLogin('CUSTOMER')}
              disabled={loading}
              className="bg-white/5 hover:bg-[#FFC700]/10 border border-white/5 hover:border-[#FFC700]/30 text-white hover:text-[#FFC700] rounded-xl py-2 px-3 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
              As Customer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
