'use client';

import React, { useState } from 'react';

type TabType = 'profile' | 'whatsapp' | 'notifications' | 'roles' | 'system';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Settings States
  const [companyName, setCompanyName] = useState('BMG Interiors');
  const [slogan, setSlogan] = useState('WE DESIGN YOUR DREAMS');
  const [adminName, setAdminName] = useState('John Doe');
  const [adminEmail, setAdminEmail] = useState('john.doe@bmginteriors.com');
  const [adminPhone, setAdminPhone] = useState('+91 98765 43210');
  const [companyAddress, setCompanyAddress] = useState('402, Elite Business Hub, Link Road, Andheri West, Mumbai, MH - 400053');

  // WhatsApp Integration States
  const [whatsAppConnected, setWhatsAppConnected] = useState(true);
  const [waNumber, setWaNumber] = useState('+91 91234 56789');
  const [waApiKey, setWaApiKey] = useState('bmg_wa_live_9823fha8932hfhasdu98f2h');
  const [showApiKey, setShowApiKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://crm.bmginteriors.com/api/v1/whatsapp/webhook');
  const [autoNotifyTask, setAutoNotifyTask] = useState(true);
  const [autoNotifyAttendance, setAutoNotifyAttendance] = useState(true);

  // Notifications Toggle States
  const [notifyTaskAssign, setNotifyTaskAssign] = useState(true);
  const [notifyAttendanceAbsence, setNotifyAttendanceAbsence] = useState(true);
  const [notifyDocumentUpload, setNotifyDocumentUpload] = useState(false);
  const [notifyDailyEod, setNotifyDailyEod] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);

  // System Preferences States
  const [currency, setCurrency] = useState('INR (₹)');
  const [dateFormat, setDateFormat] = useState('DD MMM YYYY');
  const [workStartTime, setWorkStartTime] = useState('09:00 AM');
  const [workEndTime, setWorkEndTime] = useState('06:00 PM');
  const [defaultProjectStatus, setDefaultProjectStatus] = useState('Planning');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'profile',
      label: 'Profile & Company',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Gateway',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053.953 11.44.953c-5.448 0-9.876 4.372-9.88 9.802-.002 1.776.475 3.51 1.385 5.085l-1.01 3.694 3.79-1.007c1.517.828 3.208 1.272 4.922 1.273zm10.985-7.416c-.3-.15-1.77-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.77-1.665-2.07-.175-.3-.02-.463.13-.613.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.675-1.625-.925-2.225-.244-.589-.48-.58-.66-.59-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.703.633.717.228 1.368.196 1.884.119.574-.085 1.77-.725 2.02-1.425.25-.7.25-1.3 1.75-1.425-.075-.125-.275-.2-.575-.35z" />
        </svg>
      ),
    },
    {
      id: 'notifications',
      label: 'CRM Alerts & Notifications',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      id: 'roles',
      label: 'Roles & Access Control',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      id: 'system',
      label: 'System Preferences',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12 relative">
      {/* Toast Alert Banner */}
      {saveSuccess && (
        <div className="fixed top-24 right-6 bg-[#E7FAD0] border border-[#D5ECC2] text-[#3e7e22] px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-2.5 z-50 animate-bounce">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wide">Settings Saved Successfully!</span>
        </div>
      )}

      {/* Main Settings Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-2xl p-5 border border-gray-100 shadow-sm gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800 leading-tight">CRM Configurations</h2>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            Configure system rules, brand preferences, notifications, and integration portals.
          </p>
        </div>

        <button 
          onClick={handleSave}
          className="bg-[#FFC700] hover:bg-[#e0b000] text-black text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2v-9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save All Changes
        </button>
      </div>

      {/* Split Navigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side Options Select Panel (4/12) */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-50">
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Control Panel</span>
            </div>
            
            <div className="flex flex-col p-2 gap-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSaveSuccess(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-gray-50 border-l-4 border-[#FFC700] text-gray-800' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50/50 border-l-4 border-transparent'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-auto border-t border-gray-50 p-4 bg-gray-50/50 flex flex-col items-center text-center">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">CRM Engine</span>
              <span className="text-[10px] text-gray-700 font-bold mt-1">v2.4.1 (Stable Build)</span>
            </div>
          </div>
        </div>

        {/* Right Side Settings Panel (9/12) */}
        <div className="lg:col-span-9">
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 h-full flex flex-col justify-between">
            
            {/* Active Content Panel */}
            <div className="space-y-6">
              
              {/* Profile & Company Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Profile & Company Info</h3>
                    <p className="text-[11px] text-gray-400 font-semibold mt-1">Update your company brand assets and main CRM administrator.</p>
                  </div>
                  
                  {/* Branding Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Company Name</label>
                      <input 
                        type="text" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Slogan / Branding Line</label>
                      <input 
                        type="text" 
                        value={slogan}
                        onChange={(e) => setSlogan(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                      />
                    </div>
                  </div>

                  {/* Logo uploader simulation */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Company Branding Logo</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                      <div className="w-16 h-16 bg-[#1A1A1A] rounded-xl flex items-center justify-center p-2 border border-gray-100 shadow-inner">
                        <img src="https://i.ibb.co/60Zpxt1/bmg-logo.png" alt="BMG Logo" className="max-w-full max-h-full object-contain" onError={(e) => {
                          // Fallback to stylized yellow monogram inside charcoal
                          (e.target as HTMLElement).style.display = 'none';
                        }} />
                        <span className="text-amber-400 font-extrabold text-sm tracking-tighter">BMG</span>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <span className="text-xs font-bold text-gray-700 block">bmg_primary_logo_monogram.png</span>
                        <span className="text-[10px] text-gray-400 font-medium block mt-0.5">Recommended resolution: 250 x 80px (transparent png)</span>
                      </div>
                      <button type="button" className="bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-[10px] font-bold text-gray-600 hover:bg-gray-50 shadow-sm cursor-pointer shrink-0">
                        Replace File
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-5 mt-6">
                    <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-4">Main CRM Administrator</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Admin Full Name</label>
                        <input 
                          type="text" 
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Admin Email Address</label>
                        <input 
                          type="email" 
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Admin Mobile Number</label>
                        <input 
                          type="text" 
                          value={adminPhone}
                          onChange={(e) => setAdminPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Physical Company Address</label>
                    <textarea 
                      rows={2}
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-semibold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* WhatsApp Integration Tab */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">WhatsApp Integration Gateway</h3>
                      <p className="text-[11px] text-gray-400 font-semibold mt-1">Enable real-time team notifications, status updates, and group broadcasts.</p>
                    </div>
                    {/* Active toggle */}
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${whatsAppConnected ? 'text-green-600' : 'text-gray-400'}`}>
                        {whatsAppConnected ? 'Connected' : 'Offline'}
                      </span>
                      <button 
                        type="button"
                        onClick={() => setWhatsAppConnected(!whatsAppConnected)}
                        className={`w-9 h-5 rounded-full transition-colors relative shadow-inner cursor-pointer shrink-0 ${
                          whatsAppConnected ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                          whatsAppConnected ? 'translate-x-4' : 'translate-x-0'
                        }`}></span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Connected Mobile Number</label>
                      <input 
                        type="text" 
                        value={waNumber}
                        onChange={(e) => setWaNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">API Access Token Key</label>
                      <div className="relative">
                        <input 
                          type={showApiKey ? 'text' : 'password'} 
                          value={waApiKey}
                          onChange={(e) => setWaApiKey(e.target.value)}
                          className="w-full pl-3.5 pr-10 py-2.5 border border-gray-200 text-xs text-gray-700 font-mono rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                        >
                          {showApiKey ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Incoming Message Webhook Endpoint URL</label>
                    <input 
                      type="text" 
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-semibold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                    />
                  </div>

                  <div className="border-t border-gray-100 pt-5 mt-6">
                    <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-4">Automation Rules</span>
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <div>
                          <span className="text-xs font-bold text-gray-800 block">Automatic Task Update Broadcasts</span>
                          <span className="text-[10px] text-gray-400 font-medium block mt-0.5">Send a WhatsApp card notification to the respective project group when a task status shifts to Done.</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setAutoNotifyTask(!autoNotifyTask)}
                          className={`w-9 h-5 rounded-full transition-colors relative shadow-inner cursor-pointer shrink-0 ${
                            autoNotifyTask ? 'bg-[#FFC700]' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                            autoNotifyTask ? 'translate-x-4' : 'translate-x-0'
                          }`}></span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <div>
                          <span className="text-xs font-bold text-gray-800 block">Daily Late Clock-In Alerts</span>
                          <span className="text-[10px] text-gray-400 font-medium block mt-0.5">Broadcast an alert to Admins/Managers automatically when a site worker clocks in late.</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setAutoNotifyAttendance(!autoNotifyAttendance)}
                          className={`w-9 h-5 rounded-full transition-colors relative shadow-inner cursor-pointer shrink-0 ${
                            autoNotifyAttendance ? 'bg-[#FFC700]' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                            autoNotifyAttendance ? 'translate-x-4' : 'translate-x-0'
                          }`}></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CRM Alerts & Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">CRM Alerts & Notifications</h3>
                    <p className="text-[11px] text-gray-400 font-semibold mt-1">Configure internal browser and system-level alerts triggered by operation events.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50/40 transition-colors">
                      <div className="flex gap-3.5 items-start">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-800 block">Task Assignment Alerts</span>
                          <span className="text-[10px] text-gray-400 font-medium block mt-1 leading-normal">Prompt managers and site foremen with sound alerts when new work assignments are created.</span>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setNotifyTaskAssign(!notifyTaskAssign)}
                        className={`w-9 h-5 rounded-full transition-colors relative shadow-inner cursor-pointer shrink-0 ${
                          notifyTaskAssign ? 'bg-[#FFC700]' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                          notifyTaskAssign ? 'translate-x-4' : 'translate-x-0'
                        }`}></span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50/40 transition-colors">
                      <div className="flex gap-3.5 items-start">
                        <div className="w-8 h-8 rounded-xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-800 block">Attendance Late & Absences Alerts</span>
                          <span className="text-[10px] text-gray-400 font-medium block mt-1 leading-normal">Send quick system popups to admins when daily site staff attendance dips below 85%.</span>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setNotifyAttendanceAbsence(!notifyAttendanceAbsence)}
                        className={`w-9 h-5 rounded-full transition-colors relative shadow-inner cursor-pointer shrink-0 ${
                          notifyAttendanceAbsence ? 'bg-[#FFC700]' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                          notifyAttendanceAbsence ? 'translate-x-4' : 'translate-x-0'
                        }`}></span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50/40 transition-colors">
                      <div className="flex gap-3.5 items-start">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 00-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-800 block">Document Upload Broadcasts</span>
                          <span className="text-[10px] text-gray-400 font-medium block mt-1 leading-normal">Send instant email notifications to designers when new blueprints or CAD drawings are loaded.</span>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setNotifyDocumentUpload(!notifyDocumentUpload)}
                        className={`w-9 h-5 rounded-full transition-colors relative shadow-inner cursor-pointer shrink-0 ${
                          notifyDocumentUpload ? 'bg-[#FFC700]' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                          notifyDocumentUpload ? 'translate-x-4' : 'translate-x-0'
                        }`}></span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50/40 transition-colors">
                      <div className="flex gap-3.5 items-start">
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-500 border border-purple-100 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-800 block">Daily EOD Summary Reports</span>
                          <span className="text-[10px] text-gray-400 font-medium block mt-1 leading-normal">Prepare and compile visual daily operation logs automatically at 06:30 PM.</span>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setNotifyDailyEod(!notifyDailyEod)}
                        className={`w-9 h-5 rounded-full transition-colors relative shadow-inner cursor-pointer shrink-0 ${
                          notifyDailyEod ? 'bg-[#FFC700]' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                          notifyDailyEod ? 'translate-x-4' : 'translate-x-0'
                        }`}></span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Roles & Access Control */}
              {activeTab === 'roles' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Roles & Access Control</h3>
                    <p className="text-[11px] text-gray-400 font-semibold mt-1">Define permissions, login parameters, and access scopes across role types.</p>
                  </div>

                  <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                    <table className="w-full text-left text-xs whitespace-nowrap">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-wider">
                          <th className="p-4 font-bold">Role Title</th>
                          <th className="p-4 font-bold text-center">Admin Controls</th>
                          <th className="p-4 font-bold text-center">Manage Workers</th>
                          <th className="p-4 font-bold text-center">Approve bluePrints</th>
                          <th className="p-4 font-bold text-center">Export Reports</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 font-bold">
                        <tr>
                          <td className="p-4 text-gray-800 font-extrabold text-xs flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Admin (John Doe)
                          </td>
                          <td className="p-4 text-center">✓ Enabled</td>
                          <td className="p-4 text-center">✓ Enabled</td>
                          <td className="p-4 text-center">✓ Enabled</td>
                          <td className="p-4 text-center">✓ Enabled</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-gray-800 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#FFC700]"></span>
                            Site Manager (Ravi)
                          </td>
                          <td className="p-4 text-center text-gray-300">— Disabled</td>
                          <td className="p-4 text-center">✓ Enabled</td>
                          <td className="p-4 text-center">✓ Enabled</td>
                          <td className="p-4 text-center">✓ Enabled</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-gray-800 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Lead Designer (Amit)
                          </td>
                          <td className="p-4 text-center text-gray-300">— Disabled</td>
                          <td className="p-4 text-center text-gray-300">— Disabled</td>
                          <td className="p-4 text-center">✓ Enabled</td>
                          <td className="p-4 text-center">✓ Enabled</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-gray-800 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                            Site Supervisor
                          </td>
                          <td className="p-4 text-center text-gray-300">— Disabled</td>
                          <td className="p-4 text-center">✓ Enabled</td>
                          <td className="p-4 text-center text-gray-300">— Disabled</td>
                          <td className="p-4 text-center text-gray-300">— Disabled</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-700 block">Add New Customized Security Role</span>
                      <span className="text-[10px] text-gray-400 font-medium block mt-0.5">Customize specific dashboards for temporary contractors.</span>
                    </div>
                    <button type="button" className="bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm cursor-pointer shrink-0">
                      + Configure Role
                    </button>
                  </div>
                </div>
              )}

              {/* System Preferences Tab */}
              {activeTab === 'system' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">System Preferences & Localization</h3>
                    <p className="text-[11px] text-gray-400 font-semibold mt-1">Manage defaults for site metrics, timezones, calendars, and operating protocols.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Default Project Status</label>
                      <select 
                        value={defaultProjectStatus}
                        onChange={(e) => setDefaultProjectStatus(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none cursor-pointer bg-white"
                      >
                        <option value="Planning">Planning</option>
                        <option value="Execution">Execution</option>
                        <option value="Review">Design Review</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">System Base Currency</label>
                      <select 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none cursor-pointer bg-white"
                      >
                        <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                        <option value="USD ($)">USD ($) - US Dollar</option>
                        <option value="EUR (€)">EUR (€) - Euro</option>
                        <option value="AED (د.إ)">AED (د.إ) - UAE Dirham</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Global Date Representation Format</label>
                      <select 
                        value={dateFormat}
                        onChange={(e) => setDateFormat(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none cursor-pointer bg-white"
                      >
                        <option value="DD MMM YYYY">DD MMM YYYY (e.g. 25 May 2024)</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 05/25/2024)</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2024-05-25)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">CRM Base Theme Styling</label>
                      <select 
                        className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none cursor-pointer bg-white"
                        disabled
                      >
                        <option>Luxury Light Theme (Default)</option>
                        <option>Charcoal Dark Mode (Coming Soon)</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-5 mt-6">
                    <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-4">Official Operations Shift Hours</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Shift Start Time</label>
                        <input 
                          type="text" 
                          value={workStartTime}
                          onChange={(e) => setWorkStartTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Shift End Time</label>
                        <input 
                          type="text" 
                          value={workEndTime}
                          onChange={(e) => setWorkEndTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 border border-gray-200 text-xs text-gray-700 font-bold rounded-xl focus:ring-1 focus:ring-[#FFC700] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions Row */}
            <div className="border-t border-gray-100 pt-6 mt-8 flex flex-col sm:flex-row justify-end items-center gap-3 w-full">
              <button 
                type="button"
                onClick={() => setSaveSuccess(false)}
                className="w-full sm:w-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer text-center"
              >
                Discard Edits
              </button>
              
              <button 
                type="submit"
                className="w-full sm:w-auto bg-[#FFC700] hover:bg-[#e0b000] text-black text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer text-center"
              >
                Save Preferences
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
