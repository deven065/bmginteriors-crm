'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  deleteProject,
  listCustomers,
  listProjects,
  saveProject,
  type CrmCustomer,
  type CrmProject,
} from '../lib/crmData';

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<CrmProject[]>([]);
  const [customers, setCustomers] = useState<CrmCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('All Projects');

  // Modal forms states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<CrmProject | null>(null);

  // Form inputs
  const [name, setName] = useState('');
  const [type, setType] = useState('Residential');
  const [location, setLocation] = useState('Mumbai');
  const [status, setStatus] = useState('Planning');
  const [percentage, setPercentage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [client, setClient] = useState('');
  const [clientUserId, setClientUserId] = useState<string | null>(null);
  const [budget, setBudget] = useState(100000);
  const [spent, setSpent] = useState(0);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listProjects();
      setProjects(data);
    } catch (err) {
      setProjects([]);
      setError(err instanceof Error ? err.message : 'Failed to load projects from Supabase.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCustomers = useCallback(async () => {
    if (user?.role !== 'ADMIN') return;
    try {
      const data = await listCustomers();
      setCustomers(data);
    } catch (err) {
      setCustomers([]);
      setError(err instanceof Error ? err.message : 'Failed to load customer accounts.');
    }
  }, [user]);

  useEffect(() => {
    void Promise.resolve().then(() => {
      void fetchProjects();
      void fetchCustomers();
    });
  }, [fetchProjects, fetchCustomers]);

  const handleOpenNewModal = () => {
    setEditingProject(null);
    setName('');
    setType('Residential');
    setLocation('Mumbai');
    setStatus('Planning');
    setPercentage(0);
    setStartDate('');
    setDeadline('');
    setClient(customers[0]?.fullName || '');
    setClientUserId(customers[0]?.id || null);
    setBudget(500000);
    setSpent(0);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: CrmProject) => {
    setEditingProject(proj);
    setName(proj.name);
    setType(proj.type);
    setLocation(proj.location);
    setStatus(proj.status);
    setPercentage(proj.percentage);
    setStartDate(proj.startDate || '');
    setDeadline(proj.deadline || '');
    setClient(proj.client || '');
    setClientUserId(proj.clientUserId || customers.find((c) => c.fullName === proj.client)?.id || null);
    setBudget(proj.budget || 500000);
    setSpent(proj.spent || 0);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const formattedDate = `${startDate ? new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBD'} - ${deadline ? new Date(deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBD'}`;
    const projectPayload: CrmProject = {
      id: editingProject?.id,
      name,
      type,
      location,
      status,
      percentage: Number(percentage),
      date: formattedDate,
      tasksCompleted: editingProject ? editingProject.tasksCompleted : 0,
      totalTasks: editingProject ? editingProject.totalTasks : 10,
      avatarSeed: name.toLowerCase().replace(/\s+/g, ''),
      client,
      clientUserId,
      startDate,
      deadline,
      budget: Number(budget),
      spent: Number(spent),
    };

    try {
      await saveProject(projectPayload);
      setIsModalOpen(false);
      void fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Project save failed.');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      void fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Project delete failed.');
    }
  };

  // Tab Filtering
  const filteredProjects = projects.filter((proj) => {
    if (activeTab === 'All Projects') return true;
    return proj.status.toLowerCase() === activeTab.toLowerCase();
  });

  const totalBudget = projects.reduce((acc, curr) => acc + (curr.budget || 0), 0);
  const totalSpent = projects.reduce((acc, curr) => acc + (curr.spent || 0), 0);
  const activeCount = projects.filter(p => p.status === 'In Progress' || p.status === 'Near Completion').length;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-6 text-gray-800">
      
      {/* 5 Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center mr-4 shrink-0 shadow-sm bg-gray-50 text-[#FFC700]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-1">Total Projects</h3>
            <div className="text-2xl font-extrabold text-gray-800">{projects.length}</div>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">Assigned to clients</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center mr-4 shrink-0 shadow-sm bg-gray-50 text-[#FFC700]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-1">Active Projects</h3>
            <div className="text-2xl font-extrabold text-gray-800">{activeCount}</div>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">In execution</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center mr-4 shrink-0 shadow-sm bg-gray-50 text-[#FFC700]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-1">Assigned Client</h3>
            <div className="text-xs font-bold text-gray-800 mt-1 truncate max-w-[150px]">
              {user?.role === 'CUSTOMER' ? user.fullName : 'Multi-Client Mode'}
            </div>
            <p className="text-[10px] text-gray-400 mt-1 font-medium capitalize">{user?.role?.toLowerCase()} view</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center mr-4 shrink-0 shadow-sm bg-gray-50 text-green-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-1">Total Budget</h3>
            <div className="text-2xl font-extrabold text-gray-800">₹{(totalBudget / 100000).toFixed(1)}L</div>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">Approved budgets</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 flex items-start border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center mr-4 shrink-0 shadow-sm bg-gray-50 text-amber-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-1">Total Spent</h3>
            <div className="text-2xl font-extrabold text-gray-800">₹{(totalSpent / 100000).toFixed(1)}L</div>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">{(totalSpent / Math.max(totalBudget, 1) * 100).toFixed(0)}% utilization</p>
          </div>
        </div>
      </div>

      {/* Tabs and Actions Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 gap-4">
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          {['All Projects', 'Planning', 'In Progress', 'Near Completion', 'On Hold', 'Completed'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 relative transition-all duration-200 cursor-pointer ${
                  isActive ? 'text-black font-extrabold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC700] rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
        
        {user?.role === 'ADMIN' && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenNewModal}
              className="bg-[#FFC700] hover:bg-[#e6b400] text-black text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center transition-all shadow-md shadow-[#FFC700]/10 hover:shadow-[#FFC700]/25 cursor-pointer"
            >
              <svg className="w-4 h-4 mr-1.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-10 h-10 border-4 border-[#FFC700]/20 border-t-[#FFC700] rounded-full animate-spin"></div>
          <p className="text-xs text-gray-400 mt-4 tracking-wider">Syncing architectural project registers...</p>
        </div>
      ) : (
        /* Projects Table */
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-gray-400 font-bold border-b border-gray-100 text-xs uppercase tracking-wider">
                  <th className="pb-4 font-bold">Project Name</th>
                  <th className="pb-4 font-bold">Type</th>
                  <th className="pb-4 font-bold">Location</th>
                  <th className="pb-4 font-bold">Assigned Client</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold">Progress</th>
                  <th className="pb-4 font-bold">Duration</th>
                  <th className="pb-4 font-bold">Budget (INR)</th>
                  {user?.role === 'ADMIN' && <th className="pb-4 font-bold text-center">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={user?.role === 'ADMIN' ? 9 : 8} className="py-12 text-center text-gray-400 text-xs font-semibold">
                      No matching projects cataloged in this section.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl shrink-0 overflow-hidden border border-gray-100 bg-[#FFC700]/5 flex items-center justify-center">
                            <span className="font-extrabold text-xs text-[#FFC700] uppercase">{proj.name.substring(0, 2)}</span>
                          </div>
                          <span className="font-bold text-gray-800 text-sm">{proj.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500 font-medium text-xs">{proj.type}</td>
                      <td className="py-4 text-gray-500 font-medium text-xs">{proj.location}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-[#FFC700] rounded-full"></div>
                          <span className="text-gray-700 font-bold text-xs">{proj.client || 'Unassigned'}</span>
                        </div>
                      </td>
                      <td className="py-4 font-bold text-xs">
                        <span className={`px-2.5 py-1.5 rounded-lg border ${
                          proj.status === 'In Progress' ? 'text-orange-500 bg-orange-50/50 border-orange-100' : 
                          proj.status === 'Near Completion' ? 'text-amber-600 bg-amber-50/50 border-amber-100' : 
                          proj.status === 'On Hold' ? 'text-orange-600 bg-orange-50/50 border-orange-200' : 
                          proj.status === 'Completed' ? 'text-green-600 bg-green-50/50 border-green-100' :
                          'text-yellow-600 bg-yellow-50/50 border-yellow-100'
                        }`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold w-8 text-gray-700">{proj.percentage}%</span>
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                proj.status === 'Completed' ? 'bg-green-500' : 'bg-[#FFC700]'
                              }`} 
                              style={{ width: `${proj.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500 font-medium text-xs truncate max-w-[150px]">{proj.date}</td>
                      <td className="py-4 text-gray-800 font-bold text-xs">
                        ₹{(proj.budget || 0).toLocaleString('en-IN')}
                      </td>
                      {user?.role === 'ADMIN' && (
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditModal(proj)}
                              className="text-gray-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                              title="Edit / Assign"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => proj.id && handleDeleteProject(proj.id)}
                              className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modern Pop-up Project Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden border border-gray-100 shadow-2xl animate-scaleIn">
            
            {/* Modal Header */}
            <div className="bg-[#1A1A1A] text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold tracking-wide">
                  {editingProject ? 'Modify & Assign Project' : 'Initiate New Project Registration'}
                </h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                  BMG Interiors CRM Project Management
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveProject} className="p-8 space-y-6">
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Skyline Apartments"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-3 px-4 text-xs font-bold text-gray-800 placeholder-gray-400 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Assign to Client / Owner
                  </label>
                  <select
                    value={clientUserId || ''}
                    onChange={(e) => {
                      const selected = customers.find((c) => c.id === e.target.value);
                      setClientUserId(selected?.id || null);
                      setClient(selected?.fullName || '');
                    }}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-3 px-4 text-xs font-bold text-gray-800 outline-none transition-all cursor-pointer"
                  >
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.fullName} ({c.username})
                      </option>
                    ))}
                    {customers.length === 0 && <option value="">No customer accounts available</option>}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Design Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-3 px-4 text-xs font-bold text-gray-800 outline-none transition-all cursor-pointer"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Site Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-3 px-4 text-xs font-bold text-gray-800 placeholder-gray-400 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Project Stage
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-3 px-4 text-xs font-bold text-gray-800 outline-none transition-all cursor-pointer"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Near Completion">Near Completion</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Progress Percentage (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-3 px-4 text-xs font-bold text-gray-800 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-2.5 px-4 text-xs font-bold text-gray-800 outline-none transition-all cursor-pointer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Deadline Date
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-2.5 px-4 text-xs font-bold text-gray-800 outline-none transition-all cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 border-t border-gray-100 pt-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Allocated Budget (INR)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-3 px-4 text-xs font-bold text-gray-800 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Spent Budget (INR)
                  </label>
                  <input
                    type="number"
                    value={spent}
                    onChange={(e) => setSpent(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#FFC700] rounded-xl py-3 px-4 text-xs font-bold text-gray-800 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FFC700] hover:bg-[#e6b400] text-black text-xs font-extrabold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#FFC700]/15 hover:shadow-[#FFC700]/30 cursor-pointer"
                >
                  {editingProject ? 'Save Changes' : 'Confirm Registration'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
