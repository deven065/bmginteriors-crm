import React from 'react';

export default function ReportsAnalytics() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Reports & Analytics</h2>
        <div className="flex gap-2">
          <select className="border border-gray-200 text-xs text-gray-600 rounded-lg px-2 py-1.5 bg-white outline-none hover:border-gray-300">
            <option>This Month</option>
          </select>
          <button className="border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center transition-colors">
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <div className="flex flex-col items-center justify-center border-r-0 xl:border-r border-gray-100 xl:pr-4">
          <span className="text-[10px] text-gray-500 font-bold mb-2">Project Progress</span>
          <div className="w-20 h-20 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E5E7EB" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FFC700" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="80.38" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-gray-800">68%</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center border-r-0 xl:border-r border-gray-100 xl:pr-4">
          <span className="text-[10px] text-gray-500 font-bold mb-2">Tasks Completion</span>
          <div className="w-full h-20 flex items-end justify-between px-2">
            <div className="w-3 bg-[#FFC700] rounded-t-sm" style={{ height: '60%' }}></div>
            <div className="w-3 bg-[#FFC700] rounded-t-sm" style={{ height: '80%' }}></div>
            <div className="w-3 bg-[#FFC700] rounded-t-sm" style={{ height: '40%' }}></div>
            <div className="w-3 bg-[#FFC700] rounded-t-sm" style={{ height: '30%' }}></div>
          </div>
          <div className="w-full flex justify-between text-[8px] text-gray-400 mt-1 px-1">
            <span>W1</span><span>W2</span><span>W3</span><span>W4</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center border-r-0 xl:border-r border-gray-100 xl:pr-4">
          <span className="text-[10px] text-gray-500 font-bold mb-2">Attendance</span>
          <div className="w-20 h-20 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E5E7EB" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22C55E" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="45.21" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-gray-800">82%</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center pl-2">
          <span className="text-[10px] text-gray-500 font-bold mb-2">Top Projects</span>
          <ol className="text-[10px] text-gray-600 space-y-1 list-decimal list-inside font-medium">
            <li className="truncate">Green Valley...</li>
            <li className="truncate">Skyline Apts</li>
            <li className="truncate">Corporate...</li>
            <li className="truncate">Orchid Comm</li>
          </ol>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-center mt-auto">
        <div>
          <div className="text-[10px] text-gray-500 mb-1">Total Projects</div>
          <div className="text-lg font-bold text-gray-800">18</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1">Total Tasks</div>
          <div className="text-lg font-bold text-gray-800">126</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1">Total Workers</div>
          <div className="text-lg font-bold text-gray-800">80</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1">Total Files</div>
          <div className="text-lg font-bold text-gray-800">45</div>
        </div>
      </div>
    </div>
  );
}
