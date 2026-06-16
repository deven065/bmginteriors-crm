'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import type { AppRole } from '../lib/supabaseTypes';

export default function LoginView() {
  const { login, signUp, error } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [requestedRole, setRequestedRole] = useState<AppRole>('CUSTOMER');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const enableDemoAccess = process.env.NEXT_PUBLIC_ENABLE_DEMO_ACCESS === 'true';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (authMode === 'login') {
      if (!username || !password) return;
      setLoading(true);
      await login(username, password);
      setLoading(false);
      return;
    }

    if (!fullName || !signupEmail || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters.');
      return;
    }
    
    setLoading(true);
    const result = await signUp({
      email: signupEmail,
      password,
      fullName,
      username: signupEmail.split('@')[0],
      requestedRole,
    });
    setLoading(false);

    if (result.ok) {
      setSuccessMessage(
        result.requiresConfirmation
          ? 'Account created. Check your email to confirm the session before signing in.'
          : requestedRole === 'ADMIN' && result.effectiveRole === 'ADMIN'
            ? 'Account created with administrator access.'
            : 'Account created successfully.'
      );
      setConfirmPassword('');
    }
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

  const switchMode = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setLocalError(null);
    setSuccessMessage(null);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen w-full flex bg-[#0A0A0B] text-white font-sans overflow-hidden">
      
      {/* COLUMN 1: Signature Project Hero Showcase (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:block lg:w-[55%] xl:w-[60%] relative h-screen overflow-hidden shrink-0 select-none">
        
        {/* Underlay Image */}
        <Image
          src="/luxury_interior_login.png" 
          alt="BMG Interiors Signature Showpiece" 
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-transform duration-[20000ms] ease-out hover:scale-105"
          priority
        />
        
        {/* Soft elegant gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0B]/90"></div>
        
        {/* Decorative corner detailing */}
        <div className="absolute top-10 left-10 flex items-center gap-3">
          <div className="w-8 h-[1px] bg-[#FFC700]/70"></div>
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#FFC700] font-black">
            Signature Project Showcase
          </span>
        </div>
        
        {/* Showcase Information Box */}
        <div className="absolute bottom-16 left-16 right-16 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest bg-[#FFC700] text-black font-extrabold rounded-sm">
              Portfolio
            </span>
            <span className="text-xs text-gray-300 font-semibold tracking-wider">
              Marine Drive Penthouse, Mumbai
            </span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            Crafting spaces that <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC700] via-amber-400 to-[#FFC700] bg-[size:200%_auto] animate-[shimmer_5s_linear_infinite]">
              define luxury living.
            </span>
          </h1>
          
          <blockquote className="text-gray-400 text-sm font-light border-l border-[#FFC700]/60 pl-4 mb-8 leading-relaxed italic">
            &quot;We design custom environments that balance timeless aesthetics with flawless execution. Every blueprint tells a unique story of space, texture, and light.&quot;
          </blockquote>
          
          {/* Architectural Metrics Panel */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-2xl font-black text-white">250+</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Masterpieces Done</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">15+</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Design Awards</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">100%</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Turnkey Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* COLUMN 2: Authentication Panel */}
      <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#0F0F11] flex flex-col justify-between p-8 md:p-12 xl:p-16 h-screen overflow-y-auto relative z-10 border-l border-white/[0.03] shadow-2xl shrink-0">
        
        {/* Decorative glowing ambient orbs */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FFC700]/[0.03] blur-[100px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-10 left-10 w-[200px] h-[200px] bg-amber-500/[0.02] blur-[80px] rounded-full pointer-events-none z-0"></div>
        
        {/* Branding Logomark */}
        <div className="relative z-10 flex flex-col items-center lg:items-start select-none">
          <Image
            src="/bmg-logo-original.png" 
            alt="BMG Interiors" 
            width={180}
            height={112}
            className="object-contain hover:brightness-110 transition-all duration-300"
            priority
          />
        </div>

        {/* Portal Login Header & Form */}
        <div className="my-auto py-10 relative z-10 max-w-sm w-full mx-auto lg:mx-0">
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {authMode === 'login' ? 'Portal Login' : 'Create Access'}
            </h2>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              {authMode === 'login'
                ? 'Enter your credentials to manage active floor plans, client accounts, worker status, and invoices.'
                : 'Create a secure account and choose the access level needed for your CRM work.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6 rounded-xl bg-[#141416] p-1 border border-white/[0.06]">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`rounded-lg py-2 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                authMode === 'login' ? 'bg-[#FFC700] text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`rounded-lg py-2 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                authMode === 'signup' ? 'bg-[#FFC700] text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message Alert */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-950/20 border border-red-500/20 text-red-300 rounded-2xl text-xs flex items-start gap-3 animate-shake">
              <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <span className="font-bold block text-red-200">Security Clearance Failed</span>
                <span className="text-red-400/80 font-medium mt-0.5 block">{displayError}</span>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-950/20 border border-green-500/20 text-green-300 rounded-2xl text-xs flex items-start gap-3">
              <svg className="w-4 h-4 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <span className="font-bold block text-green-200">Access Request Received</span>
                <span className="text-green-400/80 font-medium mt-0.5 block">{successMessage}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {authMode === 'login' ? (
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">
                  Username or Email
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-[#FFC700] transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin or admin@bmginteriors.com"
                    className="w-full bg-[#141416] border border-white/[0.06] hover:border-white/15 focus:border-[#FFC700] focus:bg-[#161619] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 shadow-inner"
                    required
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">
                    Full Name
                  </label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-[#FFC700] transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A7 7 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Priya Mehta"
                      className="w-full bg-[#141416] border border-white/[0.06] hover:border-white/15 focus:border-[#FFC700] focus:bg-[#161619] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 shadow-inner"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">
                    Email
                  </label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-[#FFC700] transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-[#141416] border border-white/[0.06] hover:border-white/15 focus:border-[#FFC700] focus:bg-[#161619] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 shadow-inner"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">
                    Access Role
                  </label>
                  <select
                    value={requestedRole}
                    onChange={(e) => setRequestedRole(e.target.value as AppRole)}
                    className="w-full bg-[#141416] border border-white/[0.06] hover:border-white/15 focus:border-[#FFC700] focus:bg-[#161619] rounded-xl py-3 px-4 text-sm text-white outline-none transition-all duration-200 shadow-inner cursor-pointer"
                  >
                    <option value="CUSTOMER">Customer Portal</option>
                    <option value="ADMIN">Administrator Access Request</option>
                  </select>
                  <p className="mt-2 text-[10px] text-gray-500 font-semibold leading-relaxed">
                    Admin requests are recorded for approval; active permissions come from the secured profile role.
                  </p>
                </div>
              </>
            )}

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                  Password
                </label>
                {authMode === 'login' && (
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[9px] font-bold text-[#FFC700]/70 hover:text-[#FFC700] tracking-wider transition-colors uppercase"
                  >
                    Forgot Key?
                  </a>
                )}
              </div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-[#FFC700] transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141416] border border-white/[0.06] hover:border-white/15 focus:border-[#FFC700] focus:bg-[#161619] rounded-xl py-3 pl-11 pr-12 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 shadow-inner"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-[#FFC700] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">
                  Confirm Password
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-[#FFC700] transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-[#141416] border border-white/[0.06] hover:border-white/15 focus:border-[#FFC700] focus:bg-[#161619] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 shadow-inner"
                    required
                  />
                </div>
              </div>
            )}

            {/* Remember Me Checkbox */}
            {authMode === 'login' && (
              <div className="flex items-center select-none pt-1">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4.5 w-4.5 rounded border-white/[0.08] bg-[#141416] text-[#FFC700] focus:ring-[#FFC700] focus:ring-offset-[#0F0F11] cursor-pointer accent-[#FFC700]"
                />
                <label htmlFor="remember-me" className="ml-2.5 block text-xs text-gray-400 font-semibold cursor-pointer">
                  Keep session logged in
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-[#FFC700] to-[#E6B400] hover:from-[#E6B400] hover:to-[#D4A500] text-black font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(255,199,0,0.12)] hover:shadow-[0_4px_25px_rgba(255,199,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  {authMode === 'login' ? 'Authorize Session' : 'Create Secure Account'}
                  <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {authMode === 'login' && enableDemoAccess && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-y-1/2 left-0 right-0 h-[1px] bg-white/[0.06]"></div>
                <span className="relative z-10 block w-max mx-auto px-4 bg-[#0F0F11] text-[9px] uppercase font-black tracking-[0.25em] text-[#FFC700]/70">
                  Demo Access
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuickLogin('ADMIN')}
                  disabled={loading}
                  className="bg-white/[0.02] hover:bg-[#FFC700]/10 border border-white/[0.04] hover:border-[#FFC700]/30 text-gray-300 hover:text-white rounded-xl py-2.5 px-3 text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(255,199,0,0.05)]"
                >
                  <div className="w-1.5 h-1.5 bg-[#FFC700] rounded-full animate-pulse"></div>
                  Admin Demo
                </button>
                <button
                  onClick={() => handleQuickLogin('CUSTOMER')}
                  disabled={loading}
                  className="bg-white/[0.02] hover:bg-[#FFC700]/10 border border-white/[0.04] hover:border-[#FFC700]/30 text-gray-300 hover:text-white rounded-xl py-2.5 px-3 text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(255,199,0,0.05)]"
                >
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                  Client Demo
                </button>
              </div>
            </>
          )}
        </div>

        {/* Clean Luxury Footer */}
        <div className="relative z-10 text-center lg:text-left text-[9px] text-gray-600 font-semibold tracking-wider uppercase">
          <p>&copy; {new Date().getFullYear()} BMG Interiors. All rights reserved.</p>
          <p className="mt-1 normal-case text-gray-700 tracking-normal font-normal">
            Encrypted connection. Actions taken in this management portal are monitored and audited.
          </p>
        </div>

      </div>
    </div>
  );
}
