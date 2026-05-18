'use client';

import React, { useState } from 'react';

const initialProjects = [
  { id: 1, name: 'Skyline Apartments', loc: 'Mumbai', progress: '75%', status: 'In Progress' },
  { id: 2, name: 'Orchid Commercial', loc: 'Delhi', progress: '40%', status: 'In Progress' },
  { id: 3, name: 'Green Valley Villa', loc: 'Bangalore', progress: '90%', status: 'Near Completion' },
  { id: 4, name: 'Palm Resort', loc: 'Goa', progress: '20%', status: 'Planning' },
];

export default function RecentProjects() {
  const [projects, setProjects] = useState(initialProjects);

  const handleEdit = (id: number) => {
    const item = projects.find(p => p.id === id);
    if (!item) return;
    const newName = prompt('Edit Project Name:', item.name);
    if (newName) {
      setProjects(projects.map(p => p.id === id ? { ...p, name: newName } : p));
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Recent Projects</h2>
        <a href="#" className="text-[#FFC700] text-sm font-medium hover:underline">View all</a>
      </div>
      
      <div className="flex-1 flex flex-col gap-5">
        {projects.map((proj) => (
          <div key={proj.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                <img src={`https://picsum.photos/seed/${proj.id}/80/80`} alt={proj.name} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-gray-800 truncate">{proj.name}</h4>
                <p className="text-xs text-gray-500 truncate">{proj.loc}</p>
              </div>
            </div>
            
            <div className="w-20 shrink-0">
              <span className="text-sm font-bold text-gray-800">{proj.progress}</span>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                <div 
                  className="h-full rounded-full bg-[#FFC700]" 
                  style={{ width: proj.progress }}
                ></div>
              </div>
            </div>
            
            <div className="w-28 shrink-0 text-right">
              <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border whitespace-nowrap inline-block ${
                proj.status === 'In Progress' ? 'text-orange-500 bg-orange-50/50 border-orange-100' : 
                proj.status === 'Near Completion' ? 'text-green-600 bg-green-50/50 border-green-100' : 
                'text-yellow-600 bg-yellow-50/50 border-yellow-100'
              }`}>
                {proj.status}
              </span>
            </div>
            
            <div className="w-16 shrink-0 text-right flex items-center justify-end gap-1.5">
              <button onClick={() => handleEdit(proj.id)} className="text-gray-400 hover:text-blue-600 p-1.5 rounded hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button onClick={() => handleDelete(proj.id)} className="text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
