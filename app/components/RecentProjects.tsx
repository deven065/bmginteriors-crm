'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { listProjects, type CrmProject } from '../lib/crmData';
import {
  PROJECT_CATALOG_UPDATED_EVENT,
  getProjectOverlay,
  mergeProjectCatalog,
} from '../lib/projectCatalog';
import { projectSeedData } from '../lib/projectSeedData';

export default function RecentProjects() {
  const [projects, setProjects] = useState<CrmProject[]>([]);

  const refreshProjects = useCallback(async () => {
    try {
      const data = await listProjects();
      setProjects(mergeProjectCatalog(getProjectOverlay(), data, projectSeedData).slice(0, 4));
    } catch {
      setProjects(mergeProjectCatalog(getProjectOverlay(), projectSeedData).slice(0, 4));
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => {
      void refreshProjects();
    });

    const syncCachedProjects = () => {
      setProjects(mergeProjectCatalog(getProjectOverlay(), projectSeedData).slice(0, 4));
      void refreshProjects();
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

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Recent Projects</h2>
        <Link href="/projects" className="text-[#FFC700] text-sm font-medium hover:underline">View all</Link>
      </div>
      
      <div className="flex-1 flex flex-col gap-5">
        {projects.map((proj) => (
          <div key={proj.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                <Image src={`https://picsum.photos/seed/${proj.avatarSeed || proj.id}/80/80`} alt={proj.name} fill sizes="40px" className="object-cover" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-gray-800 truncate">{proj.name}</h4>
                <p className="text-xs text-gray-500 truncate">{proj.location}</p>
              </div>
            </div>
            
            <div className="w-20 shrink-0">
              <span className="text-sm font-bold text-gray-800">{proj.percentage}%</span>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                <div 
                  className="h-full rounded-full bg-[#FFC700]" 
                  style={{ width: `${proj.percentage}%` }}
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
          </div>
        ))}
      </div>
    </div>
  );
}
