'use client';

import React, { useState } from 'react';

const initialTasks = [
  { id: 1, name: 'Electrical Work - Level 2', proj: 'Skyline Apartments', assign: 'Ravi Kumar', priority: 'High', status: 'In Progress', due: '25 May 2024', progress: '60%' },
  { id: 2, name: 'Modular Kitchen Setup', proj: 'Green Valley Villa', assign: 'Sunil Sharma', priority: 'Medium', status: 'In Progress', due: '26 May 2024', progress: '40%' },
  { id: 3, name: 'False Ceiling Installation', proj: 'Orchid Commercial', assign: 'Amit Singh', priority: 'Medium', status: 'Pending', due: '27 May 2024', progress: '0%' },
  { id: 4, name: 'Painting - First Coat', proj: 'Skyline Apartments', assign: 'Ravi Kumar', priority: 'High', status: 'In Progress', due: '28 May 2024', progress: '30%' },
  { id: 5, name: 'Flooring Work', proj: 'Lake View Homes', assign: 'Vikram Patel', priority: 'Low', status: 'Pending', due: '30 May 2024', progress: '0%' },
  { id: 6, name: 'Plumbing Work', proj: 'Palm Resort', assign: 'Mahesh Yadav', priority: 'High', status: 'Completed', due: '20 May 2024', progress: '100%' },
];

export default function TasksOverview() {
  const [taskList, setTaskList] = useState(initialTasks);

  const handleEdit = (id: number) => {
    const item = taskList.find(t => t.id === id);
    if (!item) return;
    const newName = prompt('Edit Task Name:', item.name);
    if (newName) {
      setTaskList(taskList.map(t => t.id === id ? { ...t, name: newName } : t));
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this task?')) {
      setTaskList(taskList.filter(t => t.id !== id));
    }
  };

  const handleAddTask = () => {
    const name = prompt('Enter Task Name:');
    if (!name) return;
    const proj = prompt('Enter Project Name:') || 'Skyline Apartments';
    const assign = prompt('Assign to worker:') || 'Ravi Kumar';
    setTaskList([
      ...taskList,
      {
        id: Date.now(),
        name,
        proj,
        assign,
        priority: 'Medium',
        status: 'Pending',
        due: '30 Jun 2024',
        progress: '0%'
      }
    ]);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800">Tasks Overview</h2>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <select className="border border-gray-200 text-xs text-gray-600 rounded-lg px-2 py-1.5 bg-white outline-none hover:border-gray-300 cursor-pointer">
            <option>All Projects</option>
          </select>
          <select className="border border-gray-200 text-xs text-gray-600 rounded-lg px-2 py-1.5 bg-white outline-none hover:border-gray-300 cursor-pointer">
            <option>All Status</option>
          </select>
          <select className="border border-gray-200 text-xs text-gray-600 rounded-lg px-2 py-1.5 bg-white outline-none hover:border-gray-300 cursor-pointer">
            <option>All Priority</option>
          </select>
          <button onClick={handleAddTask} className="bg-[#FFC700] hover:bg-[#e6b400] text-black text-xs font-bold px-3 py-1.5 rounded-lg flex items-center transition-colors cursor-pointer">
            + New Task
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="text-gray-400 font-medium border-b border-gray-100">
              <th className="pb-3 font-medium">Task Name</th>
              <th className="pb-3 font-medium">Project</th>
              <th className="pb-3 font-medium">Assigned To</th>
              <th className="pb-3 font-medium">Priority</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Due Date</th>
              <th className="pb-3 font-medium">Progress</th>
              <th className="pb-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {taskList.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 font-bold text-gray-800">{task.name}</td>
                <td className="py-3 text-gray-500">{task.proj}</td>
                <td className="py-3 text-gray-500">{task.assign}</td>
                <td className="py-3">
                  <span className={`${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`${task.status === 'Completed' ? 'text-green-500' : task.status === 'In Progress' ? 'text-yellow-500' : 'text-gray-400'}`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-3 text-gray-500">{task.due}</td>
                <td className="py-3 font-bold text-gray-800 text-right pr-2">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-12 h-1 bg-gray-100 rounded-full">
                      <div className="h-full rounded-full bg-green-500" style={{ width: task.progress }}></div>
                    </div>
                    <span className="w-8">{task.progress}</span>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleEdit(task.id)} className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => handleDelete(task.id)} className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
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
        <span>Showing 1 to {taskList.length} of 126 tasks</span>
        <div className="flex items-center gap-1">
          <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">&lt;</button>
          <button className="w-5 h-5 flex items-center justify-center rounded bg-[#FFC700] text-black font-medium">1</button>
          <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">2</button>
          <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">3</button>
          <span className="text-gray-400">...</span>
          <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">21</button>
          <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">&gt;</button>
        </div>
      </div>
    </div>
  );
}
