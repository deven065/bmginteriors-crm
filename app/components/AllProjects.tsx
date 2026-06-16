'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const initialProjects = [
  { id: 1, name: 'Skyline Apartments', type: 'Residential', loc: 'Mumbai', status: 'In Progress', progress: '75%', end: '10 Jun 2024' },
  { id: 2, name: 'Orchid Commercial', type: 'Commercial', loc: 'Delhi', status: 'In Progress', progress: '40%', end: '05 Feb 2024' },
  { id: 3, name: 'Green Valley Villa', type: 'Residential', loc: 'Bangalore', status: 'Near Completion', progress: '90%', end: '15 Jun 2024' },
  { id: 4, name: 'Palm Resort', type: 'Hospitality', loc: 'Goa', status: 'Planning', progress: '20%', end: '01 Jul 2024' },
  { id: 5, name: 'Lake View Homes', type: 'Residential', loc: 'Pune', status: 'On Hold', progress: '10%', end: '20 Feb 2024' },
  { id: 6, name: 'Corporate Office', type: 'Commercial', loc: 'Hyderabad', status: 'In Progress', progress: '60%', end: '12 Mar 2024' },
];

export default function AllProjects() {
  const [projectList, setProjectList] = useState(initialProjects);

  const handleEdit = (id: number) => {
    const item = projectList.find(p => p.id === id);
    if (!item) return;
    const newName = prompt('Edit Project Name:', item.name);
    if (newName) {
      setProjectList(projectList.map(p => p.id === id ? { ...p, name: newName } : p));
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this project?')) {
      setProjectList(projectList.filter(p => p.id !== id));
    }
  };

  const handleAddProject = () => {
    const name = prompt('Enter Project Name:');
    if (!name) return;
    const type = prompt('Enter Project Type (e.g. Residential, Commercial):') || 'Residential';
    const loc = prompt('Enter Location:') || 'Mumbai';
    setProjectList([
      ...projectList,
      {
        id: Date.now(),
        name,
        type,
        loc,
        status: 'Planning',
        progress: '0%',
        end: '31 Dec 2024'
      }
    ]);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">All Projects</h2>
        <button onClick={handleAddProject} className="bg-[#FFC700] hover:bg-[#e6b400] text-black text-sm font-medium px-4 py-2 rounded-lg flex items-center transition-colors cursor-pointer">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="text-gray-400 font-medium border-b border-gray-100">
              <th className="pb-3 font-medium">Project Name</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Progress</th>
              <th className="pb-3 font-medium">End Date</th>
              <th className="pb-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {projectList.map((proj) => (
              <tr key={proj.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded shrink-0 overflow-hidden">
                      <Image src={`https://picsum.photos/seed/${proj.id+10}/80/80`} alt={proj.name} fill sizes="32px" className="object-cover" />
                    </div>
                    <span className="font-bold text-gray-800">{proj.name}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-500">{proj.type}</td>
                <td className="py-3 text-gray-500">{proj.loc}</td>
                <td className="py-3 text-gray-500">
                  <span className={`text-xs ${
                    proj.status === 'In Progress' ? 'text-orange-500' : 
                    proj.status === 'Near Completion' ? 'text-green-500' : 
                    proj.status === 'On Hold' ? 'text-gray-400' : 'text-yellow-500'
                  }`}>
                    {proj.status}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold w-8">{proj.progress}</span>
                    <div className="w-16 h-1 bg-gray-100 rounded-full">
                      <div className="h-full rounded-full bg-[#FFC700]" style={{ width: proj.progress }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-gray-500 text-xs">{proj.end}</td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleEdit(proj.id)} className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(proj.id)} className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
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
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 mt-auto">
        <span>Showing 1 to {projectList.length} of 18 projects</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">&lt;</button>
          <button className="w-6 h-6 flex items-center justify-center rounded bg-[#FFC700] text-black font-medium">1</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">2</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">3</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">&gt;</button>
        </div>
      </div>
    </div>
  );
}
