'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const initialWorkers = [
  { id: 1, name: 'Ravi Kumar', role: 'Electrician', phone: '+91 98765 43210', status: 'Present', projects: 3 },
  { id: 2, name: 'Sunil Sharma', role: 'Carpenter', phone: '+91 87654 32109', status: 'Present', projects: 2 },
  { id: 3, name: 'Amit Singh', role: 'Civil Supervisor', phone: '+91 76543 21098', status: 'Present', projects: 4 },
  { id: 4, name: 'Vikram Patel', role: 'Painter', phone: '+91 65432 10987', status: 'Absent', projects: 1 },
  { id: 5, name: 'Mahesh Yadav', role: 'Plumber', phone: '+91 54321 09876', status: 'Present', projects: 2 },
];

export default function Workers() {
  const [workersList, setWorkersList] = useState(initialWorkers);

  const handleEdit = (id: number) => {
    const item = workersList.find(w => w.id === id);
    if (!item) return;
    const newRole = prompt('Edit Worker Role:', item.role);
    if (newRole) {
      setWorkersList(workersList.map(w => w.id === id ? { ...w, role: newRole } : w));
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this worker?')) {
      setWorkersList(workersList.filter(w => w.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Workers</h2>
        <a href="#" className="text-[#FFC700] text-sm font-medium hover:underline">View all</a>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="text-gray-400 font-medium border-b border-gray-100">
              <th className="pb-3 font-medium">Worker Name</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Phone</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-center">Projects</th>
              <th className="pb-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {workersList.map((worker) => (
              <tr key={worker.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Image src={`https://i.pravatar.cc/150?u=${worker.id}`} alt={worker.name} width={32} height={32} className="w-8 h-8 rounded-full" />
                    <span className="font-bold text-gray-800">{worker.name}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-500 text-xs">{worker.role}</td>
                <td className="py-3 text-gray-500 text-xs">{worker.phone}</td>
                <td className="py-3">
                  <span className={`text-xs font-bold ${worker.status === 'Present' ? 'text-green-500' : 'text-red-500'}`}>
                    {worker.status}
                  </span>
                </td>
                <td className="py-3 text-center text-gray-800 font-medium">{worker.projects}</td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleEdit(worker.id)} className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => handleDelete(worker.id)} className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-gray-500 mt-auto">
        <span>Showing 1 to {workersList.length} of 120 workers</span>
        <div className="flex items-center gap-1">
          <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">&lt;</button>
          <button className="w-5 h-5 flex items-center justify-center rounded bg-[#FFC700] text-black font-medium">1</button>
          <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">2</button>
          <span className="text-gray-400">...</span>
          <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">24</button>
          <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">&gt;</button>
        </div>
      </div>
    </div>
  );
}
