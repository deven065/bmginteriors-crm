'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { deleteProject, listProjects, saveProject, type CrmProject } from '../lib/crmData';
import {
  PROJECT_CATALOG_UPDATED_EVENT,
  getProjectOverlay,
  mergeProjectCatalog,
  removeProjectFromOverlay,
  upsertProjectOverlay,
} from '../lib/projectCatalog';
import { projectSeedData } from '../lib/projectSeedData';

function formatProjectEndDate(project: CrmProject) {
  if (project.deadline) {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(`${project.deadline}T00:00:00`));
  }

  const rangeEnd = project.date.split(' - ')[1];
  return rangeEnd || 'TBD';
}

function createDashboardProject(input: {
  name: string;
  type: string;
  location: string;
  status?: string;
  progress?: number;
  deadline?: string;
}): CrmProject {
  const deadline = input.deadline || '2024-12-31';
  const formattedDeadline = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${deadline}T00:00:00`));

  return {
    id: -Date.now(),
    name: input.name.trim(),
    type: input.type.trim() || 'Residential',
    location: input.location.trim() || 'Mumbai',
    status: input.status || 'Planning',
    percentage: input.progress ?? 0,
    date: `TBD - ${formattedDeadline}`,
    tasksCompleted: 0,
    totalTasks: 10,
    avatarSeed: input.name.toLowerCase().replace(/\s+/g, ''),
    client: '',
    clientUserId: null,
    startDate: '',
    deadline,
    budget: 500000,
    spent: 0,
  };
}

export default function AllProjects() {
  const { user } = useAuth();
  const [projectList, setProjectList] = useState<CrmProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const canManageProjects = user?.role === 'ADMIN';

  const refreshProjects = useCallback(async () => {
    try {
      const data = await listProjects();
      setProjectList(mergeProjectCatalog(getProjectOverlay(), data, projectSeedData));
      setError(null);
    } catch (err) {
      setProjectList(mergeProjectCatalog(getProjectOverlay(), projectSeedData));
      setError(err instanceof Error ? err.message : 'Project sync is temporarily unavailable.');
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => {
      void refreshProjects();
    });

    const syncCachedProjects = () => {
      setProjectList((current) => mergeProjectCatalog(getProjectOverlay(), current, projectSeedData));
    };

    window.addEventListener('focus', syncCachedProjects);
    window.addEventListener('pageshow', syncCachedProjects);
    window.addEventListener(PROJECT_CATALOG_UPDATED_EVENT, syncCachedProjects);

    return () => {
      window.removeEventListener('focus', syncCachedProjects);
      window.removeEventListener('pageshow', syncCachedProjects);
      window.removeEventListener(PROJECT_CATALOG_UPDATED_EVENT, syncCachedProjects);
    };
  }, [refreshProjects]);

  const commitProject = (project: CrmProject, previousProject?: CrmProject | null) => {
    upsertProjectOverlay(project, previousProject);
    setProjectList((current) => mergeProjectCatalog([project], current.filter((item) => item.id !== previousProject?.id)));
  };

  const handleEdit = async (id: number) => {
    const item = projectList.find((project) => project.id === id);
    if (!item) return;

    const newName = prompt('Edit Project Name:', item.name);
    if (!newName?.trim()) return;

    const nextProject: CrmProject = {
      ...item,
      name: newName.trim(),
      avatarSeed: newName.toLowerCase().replace(/\s+/g, ''),
    };

    commitProject(nextProject, item);

    try {
      const savedProject = await saveProject(nextProject);
      commitProject(savedProject, nextProject);
      void refreshProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Project update was kept locally but not synced.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;

    setProjectList((current) => current.filter((project) => project.id !== id));
    removeProjectFromOverlay(id);

    if (id < 0) return;

    try {
      await deleteProject(id);
      void refreshProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Project delete failed.');
    }
  };

  const handleAddProject = async () => {
    const name = prompt('Enter Project Name:');
    if (!name?.trim()) return;

    const type = prompt('Enter Project Type (Residential, Commercial, Hospitality, Retail):') || 'Residential';
    const location = prompt('Enter Location:') || 'Mumbai';
    const status = prompt('Project Stage (Planning, In Progress, Near Completion, On Hold, Completed):') || 'Planning';
    const project = createDashboardProject({
      name,
      type,
      location,
      status,
    });

    commitProject(project);

    try {
      const savedProject = await saveProject({ ...project, id: undefined });
      commitProject(savedProject, project);
      void refreshProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Project is visible locally but Supabase did not save it.');
    }
  };

  const visibleProjects = projectList.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">All Projects</h2>
        {canManageProjects && (
          <button onClick={handleAddProject} className="bg-[#FFC700] hover:bg-[#e6b400] text-black text-sm font-medium px-4 py-2 rounded-lg flex items-center transition-colors cursor-pointer">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          {error}
        </div>
      )}
      
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
              {canManageProjects && <th className="pb-3 font-medium text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visibleProjects.map((proj) => (
              <tr key={proj.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded shrink-0 overflow-hidden">
                      <Image src={`https://picsum.photos/seed/${proj.avatarSeed || proj.id}/80/80`} alt={proj.name} fill sizes="32px" className="object-cover" />
                    </div>
                    <span className="font-bold text-gray-800">{proj.name}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-500">{proj.type}</td>
                <td className="py-3 text-gray-500">{proj.location}</td>
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
                    <span className="text-xs font-bold w-8">{proj.percentage}%</span>
                    <div className="w-16 h-1 bg-gray-100 rounded-full">
                      <div className="h-full rounded-full bg-[#FFC700]" style={{ width: `${proj.percentage}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-gray-500 text-xs">{formatProjectEndDate(proj)}</td>
                {canManageProjects && (
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => proj.id && handleEdit(proj.id)} className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer" title="Edit">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => proj.id && handleDelete(proj.id)} className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 mt-auto">
        <span>Showing 1 to {visibleProjects.length} of {projectList.length} projects</span>
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
