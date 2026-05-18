'use client';

import React, { useState } from 'react';

const chatItems = [
  {
    id: 1,
    name: 'Skyline Apartments',
    subtitle: 'Ravi Kumar: Site inspection tomorrow at 10 AM',
    time: '10:30 AM',
    unread: 3,
    avatarSeed: '11',
    type: 'group',
    description: 'Official WhatsApp group for Skyline Apartments project updates and coordination.'
  },
  {
    id: 2,
    name: 'Green Valley Villa',
    subtitle: 'Sunil Sharma: Material delivery completed',
    time: '09:45 AM',
    unread: 2,
    avatarSeed: '12',
    type: 'group',
    description: 'Design and construction alignment for the high-end Green Valley luxury villa.'
  },
  {
    id: 3,
    name: 'Orchid Commercial',
    subtitle: 'Amit Singh: Electrical work in progress',
    time: 'Yesterday',
    unread: 1,
    avatarSeed: '13',
    type: 'group',
    description: 'Corporate partition styling, cabling, and turn-key execution for Orchid office towers.'
  },
  {
    id: 4,
    name: 'Palm Resort',
    subtitle: 'Mahesh Yadav: Plumbing work completed',
    time: 'Yesterday',
    unread: 0,
    avatarSeed: '16',
    type: 'group',
    description: 'Premium recreation site coordination, water body styling, and pool deck construction.'
  },
  {
    id: 5,
    name: 'Lake View Homes',
    subtitle: 'Vikram Patel: Waiting for client confirmation',
    time: '21 May',
    unread: 0,
    avatarSeed: '15',
    type: 'group',
    description: 'Residential finishing, wall texture, and luxury curation at Lake View master site.'
  },
  {
    id: 6,
    name: 'General Announcements',
    subtitle: 'Admin: Safety meeting on Monday at 9 AM',
    time: '20 May',
    unread: 0,
    type: 'megaphone',
    description: 'Broadcasting company protocols, leave calendar updates, and compliance announcements.'
  },
  {
    id: 7,
    name: 'Project Updates',
    subtitle: 'Admin: New drawing uploaded',
    time: '19 May',
    unread: 0,
    type: 'document',
    description: 'Engineering logs, architecture blueprints, municipal clearances, and file logs.'
  },
];

const initialMessagesMap: Record<number, any[]> = {
  1: [
    {
      id: 1,
      sender: 'Ravi Kumar',
      text: 'Good morning team! Site inspection tomorrow at 10 AM. Please be prepared.',
      time: '09:15 AM',
      type: 'left',
      color: 'text-green-500',
      avatar: 'ravi',
      reactions: [{ emoji: '👍', count: 2 }]
    },
    {
      id: 2,
      sender: 'Sunil Sharma',
      text: 'Material delivery completed for Tower A. Check the attached images.',
      time: '09:20 AM',
      type: 'left',
      color: 'text-orange-500',
      avatar: 'sunil',
      images: ['cement', 'rods', 'bricks'],
      reactions: [{ emoji: '👍', count: 3 }]
    },
    {
      id: 3,
      sender: 'Amit Singh',
      text: 'Electrical work on 2nd floor in progress.',
      time: '09:25 AM',
      type: 'left',
      color: 'text-blue-500',
      avatar: 'amit'
    },
    {
      id: 4,
      sender: 'Admin',
      text: 'Please ensure all safety measures are followed on site. Share daily progress updates.',
      time: '09:30 AM',
      type: 'right'
    },
    {
      id: 5,
      sender: 'Vikram Patel',
      text: 'Sure, we will share the update by EOD.',
      time: '10:30 AM',
      type: 'left',
      color: 'text-purple-500',
      avatar: 'painter',
      reactions: [{ emoji: '👍', count: 1 }]
    }
  ],
  2: [
    {
      id: 1,
      sender: 'Sunil Sharma',
      text: 'Modular kitchen cabinetry framing has arrived today.',
      time: 'Yesterday',
      type: 'left',
      color: 'text-orange-500',
      avatar: 'sunil'
    },
    {
      id: 2,
      sender: 'Admin',
      text: 'Excellent. Please start alignment and fitting tomorrow morning.',
      time: 'Yesterday',
      type: 'right'
    },
    {
      id: 3,
      sender: 'Sunil Sharma',
      text: 'Material delivery completed',
      time: '09:45 AM',
      type: 'left',
      color: 'text-orange-500',
      avatar: 'sunil'
    }
  ],
  3: [
    {
      id: 1,
      sender: 'Amit Singh',
      text: 'Lobby partition framing is complete.',
      time: 'Yesterday',
      type: 'left',
      color: 'text-blue-500',
      avatar: 'amit'
    },
    {
      id: 2,
      sender: 'Amit Singh',
      text: 'Electrical work in progress',
      time: 'Yesterday',
      type: 'left',
      color: 'text-blue-500',
      avatar: 'amit'
    }
  ],
  4: [
    {
      id: 1,
      sender: 'Mahesh Yadav',
      text: 'Plumbing work completed for pool changing area.',
      time: 'Yesterday',
      type: 'left',
      color: 'text-pink-500',
      avatar: 'mahesh'
    }
  ],
  5: [
    {
      id: 1,
      sender: 'Vikram Patel',
      text: 'Main bedroom texturing completed. Waiting for client confirmation on finish shade.',
      time: '21 May',
      type: 'left',
      color: 'text-purple-500',
      avatar: 'painter'
    }
  ],
  6: [
    {
      id: 1,
      sender: 'Admin',
      text: 'Safety meeting on Monday at 9 AM in central cabin.',
      time: '20 May',
      type: 'right'
    }
  ],
  7: [
    {
      id: 1,
      sender: 'Admin',
      text: 'New CAD drawing files loaded for Lake View project room.',
      time: '19 May',
      type: 'right'
    }
  ]
};

export default function Chat() {
  const [activeChat, setActiveChat] = useState(1);
  const [activeTab, setActiveTab] = useState('Chats');
  const [muteToggle, setMuteToggle] = useState(false);
  const [messageText, setMessageText] = useState('');

  const [chats, setChats] = useState(chatItems);
  const [messagesMap, setMessagesMap] = useState<Record<number, any[]>>(initialMessagesMap);

  const selectChatRoom = (id: number) => {
    setActiveChat(id);
    setChats(chats.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const handleDeleteChat = (id: number) => {
    setChats(chats.filter(c => c.id !== id));
  };

  const handleEditChat = (id: number, newName: string) => {
    setChats(chats.map(c => c.id === id ? { ...c, name: newName } : c));
  };

  const handleDeleteMessage = (msgId: number) => {
    setMessagesMap(prev => ({
      ...prev,
      [activeChat]: (prev[activeChat] || []).filter(m => m.id !== msgId)
    }));
  };

  const handleEditMessage = (msgId: number, newText: string) => {
    setMessagesMap(prev => ({
      ...prev,
      [activeChat]: (prev[activeChat] || []).map(m => m.id === msgId ? { ...m, text: newText } : m)
    }));
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'Admin',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'right',
      color: 'text-yellow-500',
      avatar: 'admin'
    };

    setMessagesMap(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));

    setChats(prevChats => prevChats.map(c => 
      c.id === activeChat 
        ? { ...c, subtitle: `Admin: ${messageText}`, time: newMsg.time } 
        : c
    ));

    setMessageText('');
  };

  const activeMessages = messagesMap[activeChat] || [];
  const currentChatObj = chats.find(c => c.id === activeChat) || chats[0];

  return (
    <div className="max-w-[1800px] mx-auto pb-6">
      {/* 3 Column Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[calc(100vh-140px)]">
        {/* Column 1: Chats Sidebar (3/12) */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
          {/* WhatsApp Connection Status Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="flex items-center gap-4 w-full">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053.953 11.44.953c-5.448 0-9.876 4.372-9.88 9.802-.002 1.776.475 3.51 1.385 5.085l-1.01 3.694 3.79-1.007c1.517.828 3.208 1.272 4.922 1.273zm10.985-7.416c-.3-.15-1.77-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.77-1.665-2.07-.175-.3-.02-.463.13-.613.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.675-1.625-.925-2.225-.244-.589-.48-.58-.66-.59-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.703.633.717.228 1.368.196 1.884.119.574-.085 1.77-.725 2.02-1.425.25-.7.25-1.3 1.75-1.425-.075-.125-.275-.2-.575-.35z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold text-gray-800 block">WhatsApp Connection</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-green-600 font-bold text-[10px] uppercase tracking-wider">Connected</span>
                </div>
              </div>
            </div>
            
            <p className="text-[11px] text-gray-400 font-medium text-center mt-3.5 mb-4 leading-normal">
              Enterprise link active. Broadcasting to 5 site nodes.
            </p>
            
            <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 rounded-xl transition-colors shadow-sm cursor-pointer">
              Manage Connection
            </button>
          </div>

          {/* Chat List Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 text-sm font-bold">
              <button 
                onClick={() => setActiveTab('Chats')}
                className={`flex-1 py-3.5 relative transition-all duration-200 cursor-pointer ${
                  activeTab === 'Chats' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Chats
                {activeTab === 'Chats' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC700] rounded-full"></span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab('Groups')}
                className={`flex-1 py-3.5 relative transition-all duration-200 cursor-pointer ${
                  activeTab === 'Groups' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Groups
                {activeTab === 'Groups' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC700] rounded-full"></span>
                )}
              </button>
            </div>

            {/* Search chats */}
            <div className="p-4 border-b border-gray-50 flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 pr-3 py-2 border-transparent bg-gray-50 text-xs placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-[#FFC700] focus:border-transparent rounded-xl transition-all"
                  placeholder="Search chats or groups..."
                />
              </div>
              
              <button className="bg-white border border-gray-200 p-2 rounded-xl text-gray-400 hover:text-gray-600 shadow-sm cursor-pointer shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {chats.map((item) => {
                const isActive = activeChat === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => selectChatRoom(item.id)}
                    className={`p-4 flex items-start gap-3 cursor-pointer transition-colors group relative ${
                      isActive ? 'bg-gray-50/80 border-l-4 border-[#FFC700]' : 'hover:bg-gray-50/40 border-l-4 border-transparent'
                    }`}
                  >
                    {item.avatarSeed ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                        <img src={`https://picsum.photos/seed/${item.avatarSeed}/100/100`} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ) : item.type === 'megaphone' ? (
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 text-xs truncate leading-tight">{item.name}</span>
                        <span className="text-[9px] text-gray-400 font-semibold shrink-0 ml-1.5 group-hover:opacity-0 transition-opacity">{item.time}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium truncate mt-1 leading-normal">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white pl-2">
                      <button className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer" title="Edit" onClick={(e) => { e.stopPropagation(); const name = prompt('Enter new chat room name:', item.name); if(name) handleEditChat(item.id, name); }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer" title="Delete" onClick={(e) => { e.stopPropagation(); if(confirm('Delete chat room?')) handleDeleteChat(item.id); }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                    
                    {item.unread > 0 && (
                      <span className="w-4 h-4 bg-green-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center shrink-0 self-center group-hover:opacity-0 transition-opacity">
                        {item.unread}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-[10px] text-gray-400 font-bold">
              All messages are sent directly to WhatsApp groups
            </div>
          </div>
        </div>

        {/* Column 2: Active Chat Window (6/12) */}
        <div className="lg:col-span-6 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
          {/* Active Chat Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center bg-amber-500 text-white font-bold">
                {currentChatObj.avatarSeed ? (
                  <img src={`https://picsum.photos/seed/${currentChatObj.avatarSeed}/100/100`} alt="Active" className="w-full h-full object-cover" />
                ) : currentChatObj.type === 'megaphone' ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1.0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </div>
              <div>
                <span className="font-bold text-gray-800 text-sm block leading-tight">
                  {currentChatObj.name}
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <svg className="w-3 h-3 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053.953 11.44.953c-5.448 0-9.876 4.372-9.88 9.802-.002 1.776.475 3.51 1.385 5.085l-1.01 3.694 3.79-1.007c1.517.828 3.208 1.272 4.922 1.273zm10.985-7.416c-.3-.15-1.77-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.77-1.665-2.07-.175-.3-.02-.463.13-.613.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.675-1.625-.925-2.225-.244-.589-.48-.58-.66-.59-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.703.633.717.228 1.368.196 1.884.119.574-.085 1.77-.725 2.02-1.425.25-.7.25-1.3 1.75-1.425-.075-.125-.275-.2-.575-.35z" />
                  </svg>
                  <span className="text-[10px] text-gray-400 font-bold">WhatsApp Group • Active coordination</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mr-3">
              <button className="bg-white border border-gray-200 p-2 rounded-xl text-gray-400 hover:text-gray-600 shadow-sm cursor-pointer shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l-5.492 5.492A1 1 0 003.9 18h16.2a1 1 0 00.707-1.707l-5.492-5.492a2.001 2.001 0 00-2.828 0l-.318.318a2 2 0 01-2.828 0l-.318-.318a2.001 2.001 0 00-2.828 0z" />
                </svg>
              </button>

              <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer">
                <option>Group Actions</option>
              </select>
            </div>
          </div>

          {/* Info Alert Box */}
          <div className="mx-4 mt-4 p-3 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start text-xs text-amber-800">
            <svg className="w-4.5 h-4.5 text-amber-500 mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold leading-normal">
              This is a WhatsApp group. Messages you send will be delivered directly to the group on WhatsApp.
            </span>
          </div>

          {/* Messages Stream Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
            {/* Today Header */}
            <div className="flex justify-center">
              <span className="bg-white border border-gray-100 px-3 py-1 rounded-full text-[9px] text-gray-400 font-bold shadow-sm uppercase tracking-wide">
                Today
              </span>
            </div>

            {activeMessages.map((msg) => {
              const isRight = msg.type === 'right';
              if (isRight) {
                return (
                  <div key={msg.id} className="flex justify-end w-full group relative">
                    <div className="bg-[#E7FAD0] p-3 rounded-2xl rounded-tr-none border border-[#D5ECC2] shadow-sm max-w-[80%] text-right relative pr-10">
                      <p className="text-xs text-gray-800 font-medium leading-relaxed text-left">
                        {msg.text}
                      </p>
                      <div className="flex items-center justify-end gap-1.5 mt-2 leading-none">
                        <span className="text-[9px] text-gray-400 font-semibold">{msg.time}</span>
                        <span className="text-blue-500 font-bold text-xs shrink-0 flex">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </div>

                      <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#E7FAD0] pl-1 rounded">
                        <button className="text-gray-400 hover:text-blue-600 p-0.5 rounded hover:bg-blue-50/20 transition-colors cursor-pointer" title="Edit" onClick={() => { const text = prompt('Edit message:', msg.text); if(text) handleEditMessage(msg.id, text); }}>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button className="text-gray-400 hover:text-red-600 p-0.5 rounded hover:bg-red-50/20 transition-colors cursor-pointer" title="Delete" onClick={() => { if(confirm('Delete message?')) handleDeleteMessage(msg.id); }}>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={msg.id} className="flex items-start gap-2.5 max-w-[80%] group relative w-full">
                    <img src={`https://i.pravatar.cc/80?u=${msg.avatar}`} alt={msg.sender} className="w-8 h-8 rounded-full border border-gray-100 shrink-0" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm relative pr-10">
                        <span className={`text-[10px] font-bold ${msg.color || 'text-green-500'} block mb-0.5`}>{msg.sender}</span>
                        <p className="text-xs text-gray-700 font-medium leading-relaxed">
                          {msg.text}
                        </p>

                        {msg.images && (
                          <div className="grid grid-cols-3 gap-2 my-2">
                            {(msg.images as string[]).map((imgName: string, i: number) => (
                              <div key={i} className="h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                                <img src={`https://picsum.photos/seed/${imgName}/150/150`} alt={imgName} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}

                        <span className="text-[9px] text-gray-400 font-semibold block text-right mt-1.5 leading-none">
                          {msg.time}
                        </span>

                        <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white pl-1 rounded">
                          <button className="text-gray-400 hover:text-blue-600 p-0.5 rounded hover:bg-blue-50/20 transition-colors cursor-pointer" title="Edit" onClick={() => { const text = prompt('Edit message:', msg.text); if(text) handleEditMessage(msg.id, text); }}>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button className="text-gray-400 hover:text-red-600 p-0.5 rounded hover:bg-red-50/20 transition-colors cursor-pointer" title="Delete" onClick={() => { if(confirm('Delete message?')) handleDeleteMessage(msg.id); }}>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>

                      {msg.reactions && (msg.reactions as any[]).map((react: any, i: number) => (
                        <div key={i} className="flex items-center gap-1 pl-2">
                          <span className="inline-flex items-center gap-0.5 bg-white border border-gray-100 px-1.5 py-0.5 rounded-full text-[10px] shadow-sm font-semibold text-gray-500 cursor-pointer">
                            {react.emoji} <span className="text-[9px]">{react.count}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Chat Message Input Bar */}
          <div className="p-4 border-t border-gray-100 flex flex-col gap-2 bg-white">
            <div className="flex items-center gap-3">
              {/* Paperclip */}
              <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer shrink-0">
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                className="flex-1 px-4 py-2.5 border border-gray-100 bg-gray-50 text-xs placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-[#FFC700] focus:border-gray-200 outline-none rounded-xl transition-all"
                placeholder="Type a message..."
              />

              <button 
                onClick={handleSendMessage}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
              >
                <svg className="w-4.5 h-4.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.053.953 11.44.953c-5.448 0-9.876 4.372-9.88 9.802-.002 1.776.475 3.51 1.385 5.085l-1.01 3.694 3.79-1.007c1.517.828 3.208 1.272 4.922 1.273zm10.985-7.416c-.3-.15-1.77-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.77-1.665-2.07-.175-.3-.02-.463.13-.613.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.675-1.625-.925-2.225-.244-.589-.48-.58-.66-.59-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.703.633.717.228 1.368.196 1.884.119.574-.085 1.77-.725 2.02-1.425.25-.7.25-1.3 1.75-1.425-.075-.125-.275-.2-.575-.35z" />
                </svg>
                Send to WhatsApp
              </button>
            </div>
            <span className="text-[10px] text-gray-400 font-bold block text-center">
              Messages will be sent directly to the WhatsApp group
            </span>
          </div>
        </div>

        {/* Column 3: Group Info Pane (3/12) */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
          {/* Card 1: Group Info Header Detail */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center">
            <h3 className="text-sm font-bold text-gray-800 self-start mb-5">Group Info</h3>
            
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-100 shadow-sm mb-4 flex items-center justify-center bg-amber-500 text-white font-bold">
              {currentChatObj.avatarSeed ? (
                <img src={`https://picsum.photos/seed/${currentChatObj.avatarSeed}/150/150`} alt="Active" className="w-full h-full object-cover" />
              ) : currentChatObj.type === 'megaphone' ? (
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1.0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>

            <span className="font-bold text-gray-800 text-sm leading-tight block text-center">
              {currentChatObj.name}
            </span>
            
            <span className="inline-block px-2.5 py-1 rounded-lg border border-green-100 text-green-600 bg-green-50/50 text-[10px] font-bold mt-2.5 mb-1.5 uppercase tracking-wider">
              WhatsApp Group
            </span>

            <span className="text-[10px] text-gray-400 font-bold">Coordination Site Node</span>
            
            <div className="w-full border-t border-gray-50 my-5"></div>
            
            {/* Description */}
            <div className="w-full text-left">
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-2">Group Description</span>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {currentChatObj.description}
              </p>
            </div>

            <div className="w-full border-t border-gray-50 my-5"></div>

            {/* Created By */}
            <div className="w-full text-left">
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-3">Created By</span>
              <div className="flex items-center gap-2.5">
                <img src="https://i.pravatar.cc/80?u=admin" alt="Admin" className="w-7 h-7 rounded-full border border-gray-100 shrink-0" />
                <div>
                  <span className="text-gray-700 font-bold text-xs block leading-tight">Admin System</span>
                  <span className="text-[9px] text-gray-400 font-medium block mt-0.5">10 Jan 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Settings & Starred list */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col divide-y divide-gray-50 text-xs font-bold text-gray-600">
            <div className="pb-3.5 flex justify-between items-center cursor-pointer hover:text-gray-800 transition-colors">
              <span className="font-semibold text-gray-500">Media, Links & Docs</span>
              <span className="text-gray-400 font-medium flex items-center">
                48 
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            <div className="py-3.5 flex justify-between items-center">
              <span className="font-semibold text-gray-500">Mute Notifications</span>
              {/* Toggle Switch */}
              <button 
                onClick={() => setMuteToggle(!muteToggle)}
                className={`w-9 h-5 rounded-full transition-colors relative shadow-inner cursor-pointer shrink-0 ${
                  muteToggle ? 'bg-[#FFC700]' : 'bg-gray-200'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                  muteToggle ? 'translate-x-4' : 'translate-x-0'
                }`}></span>
              </button>
            </div>

            <div className="py-3.5 flex justify-between items-center cursor-pointer hover:text-gray-800 transition-colors">
              <span className="font-semibold text-gray-500">Starred Messages</span>
              <span className="text-gray-400 font-medium flex items-center">
                4 
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            <div className="pt-3.5 flex justify-between items-center cursor-pointer hover:text-gray-800 transition-colors">
              <div>
                <span className="font-semibold text-gray-500 block leading-none">Group Settings</span>
                <span className="text-[9px] text-gray-400 font-semibold block mt-1 leading-none">Manage group settings</span>
              </div>
              <span className="text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Help Box */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
            <span className="text-sm font-bold text-gray-800 block">Need Help?</span>
            <p className="text-[11px] text-gray-400 font-medium mt-1 mb-4 leading-normal">
              Having trouble with WhatsApp connection?
            </p>
            
            <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              View Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
