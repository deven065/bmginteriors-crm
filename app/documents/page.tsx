'use client';

import React, { useState } from 'react';

const stats = [
  {
    title: 'Total Documents',
    value: '256',
    change: '18',
    changeText: 'from last month',
    trend: 'up',
    iconColor: 'bg-gray-50 text-[#FFC700] border-gray-100',
    icon: (
      <svg className="w-5 h-5 text-[#FFC700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Images',
    value: '120',
    change: '47%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-green-50 text-green-500 border-green-100',
    icon: (
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'PDF Files',
    value: '85',
    change: '33%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-red-50 text-red-500 border-red-100',
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'CAD Files',
    value: '28',
    change: '11%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-purple-50 text-purple-500 border-purple-100',
    icon: (
      <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    ),
  },
  {
    title: 'Others',
    value: '23',
    change: '9%',
    changeText: 'of total',
    trend: 'neutral',
    iconColor: 'bg-orange-50 text-orange-500 border-orange-100',
    icon: (
      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
];

const documentsData = [
  {
    id: 1,
    name: 'Skyline Apartments - Elevation Drawing.dwg',
    project: 'Skyline Apartments',
    category: 'Drawings',
    type: 'DWG',
    size: '2.4 MB',
    uploadedBy: 'Ravi Kumar',
    role: 'Admin',
    avatar: 'ravi',
    date: '25 May 2024',
    time: '10:30 AM',
    fileType: 'dwg',
  },
  {
    id: 2,
    name: 'Orchid Commercial - Electrical Plan.pdf',
    project: 'Orchid Commercial',
    category: 'Electrical',
    type: 'PDF',
    size: '1.8 MB',
    uploadedBy: 'Amit Singh',
    role: 'Civil Supervisor',
    avatar: 'amit',
    date: '24 May 2024',
    time: '04:15 PM',
    fileType: 'pdf',
  },
  {
    id: 3,
    name: 'Green Valley Villa - Site Photo 01.jpg',
    project: 'Green Valley Villa',
    category: 'Site Images',
    type: 'JPG',
    size: '1.2 MB',
    uploadedBy: 'Sunil Sharma',
    role: 'Carpenter',
    avatar: 'sunil',
    date: '24 May 2024',
    time: '11:20 AM',
    fileType: 'jpg',
  },
  {
    id: 4,
    name: 'Palm Resort - Plumbing Layout.pdf',
    project: 'Palm Resort',
    category: 'Plumbing',
    type: 'PDF',
    size: '1.6 MB',
    uploadedBy: 'Mahesh Yadav',
    role: 'Plumber',
    avatar: 'mahesh',
    date: '23 May 2024',
    time: '02:45 PM',
    fileType: 'pdf',
  },
  {
    id: 5,
    name: 'Lake View Homes - Floor Plan.dwg',
    project: 'Lake View Homes',
    category: 'Drawings',
    type: 'DWG',
    size: '3.1 MB',
    uploadedBy: 'Vikram Patel',
    role: 'Painter',
    avatar: 'painter',
    date: '23 May 2024',
    time: '09:10 AM',
    fileType: 'dwg',
  },
  {
    id: 6,
    name: 'Corporate Office - BOQ.xlsx',
    project: 'Corporate Office',
    category: 'BOQ',
    type: 'XLSX',
    size: '850 KB',
    uploadedBy: 'Ravi Kumar',
    role: 'Admin',
    avatar: 'ravi',
    date: '22 May 2024',
    time: '06:25 PM',
    fileType: 'xlsx',
  },
  {
    id: 7,
    name: 'Material Specifications',
    project: 'Skyline Apartments',
    category: 'Specifications',
    type: '-',
    size: '-',
    uploadedBy: 'Amit Singh',
    role: 'Civil Supervisor',
    avatar: 'amit',
    date: '22 May 2024',
    time: '01:30 PM',
    fileType: 'folder',
  },
  {
    id: 8,
    name: 'All Drawings - Phase 1.zip',
    project: 'Green Valley Villa',
    category: 'Drawings',
    type: 'ZIP',
    size: '24.5 MB',
    uploadedBy: 'Sunil Sharma',
    role: 'Carpenter',
    avatar: 'sunil',
    date: '21 May 2024',
    time: '05:00 PM',
    fileType: 'zip',
  },
  {
    id: 9,
    name: 'Project Meeting Notes - 20 May.docx',
    project: 'Orchid Commercial',
    category: 'Reports',
    type: 'DOCX',
    size: '320 KB',
    uploadedBy: 'Ravi Kumar',
    role: 'Admin',
    avatar: 'ravi',
    date: '20 May 2024',
    time: '10:00 AM',
    fileType: 'docx',
  },
  {
    id: 10,
    name: 'Site Progress - 19 May 2024.jpg',
    project: 'Palm Resort',
    category: 'Site Images',
    type: 'JPG',
    size: '1.5 MB',
    uploadedBy: 'Mahesh Yadav',
    role: 'Plumber',
    avatar: 'mahesh',
    date: '19 May 2024',
    time: '03:40 PM',
    fileType: 'jpg',
  },
];

export default function Documents() {
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDocs(documentsData.map((doc) => doc.id));
    } else {
      setSelectedDocs([]);
    }
  };

  const handleSelectDoc = (id: number) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter((dId) => dId !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'dwg':
        return (
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100">
            <img src="https://picsum.photos/seed/elevation/100/100" alt="CAD" className="w-full h-full object-cover" />
          </div>
        );
      case 'pdf':
        return (
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'jpg':
        return (
          <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'xlsx':
        return (
          <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'zip':
        return (
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 border border-purple-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
        );
      case 'docx':
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'folder':
        return (
          <div className="w-9 h-9 rounded-xl bg-yellow-50 text-amber-500 flex items-center justify-center shrink-0 border border-yellow-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center shrink-0 border border-gray-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-6">
      {/* 5 Stats Cards Row + Right Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mr-4 shrink-0 shadow-sm ${stat.iconColor}`}>
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
            Upload Document
          </button>
          
          <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            New Folder
          </button>
        </div>
      </div>

      {/* Tabs and Dropdown Filters Row */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-gray-200 pb-3 gap-4">
        {/* Left Side: Tabs */}
        <div className="flex flex-wrap gap-6 text-sm font-semibold">
          <button className="pb-3 relative transition-all duration-200 cursor-pointer text-black font-bold">
            All Documents
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC700] rounded-full"></span>
          </button>
        </div>

        {/* Right Side: Filters Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[110px]">
            <option>All Projects</option>
          </select>
          
          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[115px]">
            <option>All Categories</option>
          </select>

          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[105px]">
            <option>All File Types</option>
          </select>

          <select className="border border-gray-200 text-xs text-gray-600 rounded-xl px-3 py-2 bg-white outline-none hover:border-gray-300 font-bold shadow-sm cursor-pointer min-w-[110px]">
            <option>Uploaded By</option>
          </select>
          
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center transition-colors shadow-sm cursor-pointer">
            <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Main Documents Table Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-gray-400 font-bold border-b border-gray-100 text-xs uppercase tracking-wider">
                <th className="pb-4 w-10 text-center font-bold">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedDocs.length === documentsData.length}
                    className="w-4 h-4 rounded text-[#FFC700] border-gray-300 focus:ring-[#FFC700] cursor-pointer" 
                  />
                </th>
                <th className="pb-4 font-bold">Document Name</th>
                <th className="pb-4 font-bold">Project</th>
                <th className="pb-4 font-bold">Category</th>
                <th className="pb-4 font-bold">Type</th>
                <th className="pb-4 font-bold">Size</th>
                <th className="pb-4 font-bold">Uploaded By</th>
                <th className="pb-4 font-bold">Uploaded On</th>
                <th className="pb-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documentsData.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedDocs.includes(doc.id)}
                      onChange={() => handleSelectDoc(doc.id)}
                      className="w-4 h-4 rounded text-[#FFC700] border-gray-300 focus:ring-[#FFC700] cursor-pointer"
                    />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.fileType)}
                      <span className="font-bold text-gray-800 text-sm block max-w-xs truncate">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500 font-semibold text-xs">{doc.project}</td>
                  <td className="py-4 text-gray-500 font-semibold text-xs">{doc.category}</td>
                  <td className="py-4 font-bold text-xs">
                    {doc.type === '-' ? (
                      <span className="text-gray-400 font-medium">-</span>
                    ) : (
                      <span className={`px-2 py-0.5 rounded text-[10px] border ${
                        doc.type === 'PDF' ? 'text-red-500 bg-red-50/50 border-red-100' :
                        doc.type === 'DWG' ? 'text-blue-500 bg-blue-50/50 border-blue-100' :
                        doc.type === 'JPG' || doc.type === 'XLSX' ? 'text-green-600 bg-green-50/50 border-green-100' :
                        doc.type === 'ZIP' ? 'text-purple-600 bg-purple-50/50 border-purple-100' :
                        'text-blue-600 bg-blue-50/50 border-blue-100'
                      }`}>
                        {doc.type}
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-gray-500 font-medium text-xs">
                    {doc.size === '-' ? <span className="text-gray-400">-</span> : doc.size}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2.5">
                      <img src={`https://i.pravatar.cc/80?u=${doc.avatar}`} alt={doc.uploadedBy} className="w-7 h-7 rounded-full border border-gray-100 shrink-0" />
                      <div>
                        <span className="text-gray-700 font-bold text-xs block leading-tight">{doc.uploadedBy}</span>
                        <span className="text-[9px] text-gray-400 font-medium block mt-0.5">{doc.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <span className="text-gray-700 font-semibold text-xs block leading-tight">{doc.date}</span>
                      <span className="text-[9px] text-gray-400 font-medium block mt-0.5">{doc.time}</span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-gray-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
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
          <span>Showing 1 to {documentsData.length} of 256 documents</span>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer">&lt;</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#FFC700] text-black font-bold shadow-sm transition-colors cursor-pointer">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">3</button>
            <span className="text-gray-300">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">26</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
