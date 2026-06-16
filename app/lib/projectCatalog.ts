'use client';

import type { CrmProject } from './crmData';

export const PROJECT_OVERLAY_STORAGE_KEY = 'bmginteriors.crm.projectOverlay';
export const PROJECT_CATALOG_UPDATED_EVENT = 'bmginteriors.crm.projectCatalogUpdated';

export function getProjectOverlay() {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(PROJECT_OVERLAY_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CrmProject[]) : [];
  } catch {
    return [];
  }
}

export function saveProjectOverlay(projects: CrmProject[]) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(PROJECT_OVERLAY_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event(PROJECT_CATALOG_UPDATED_EVENT));
  } catch {
    // A blocked or full localStorage should not prevent the live Supabase write.
  }
}

export function projectKey(project: CrmProject) {
  return project.name.trim().toLowerCase();
}

export function mergeProjectCatalog(...groups: CrmProject[][]) {
  const seenIds = new Set<number>();
  const seenNames = new Set<string>();
  const merged: CrmProject[] = [];

  for (const group of groups) {
    for (const project of group) {
      const nameKey = projectKey(project);
      const hasSeenId = typeof project.id === 'number' && seenIds.has(project.id);
      const hasSeenName = nameKey.length > 0 && seenNames.has(nameKey);

      if (hasSeenId || hasSeenName) continue;
      if (typeof project.id === 'number') seenIds.add(project.id);
      if (nameKey) seenNames.add(nameKey);
      merged.push(project);
    }
  }

  return merged;
}

export function upsertProjectOverlay(project: CrmProject, previousProject?: CrmProject | null) {
  const previousKey = previousProject ? projectKey(previousProject) : '';
  const savedKey = projectKey(project);
  const staleOverlay = getProjectOverlay().filter((item) => {
    if (item.id === project.id || item.id === previousProject?.id) return false;
    const itemKey = projectKey(item);
    return itemKey !== savedKey && (!previousKey || itemKey !== previousKey);
  });

  const nextOverlay = mergeProjectCatalog([project], staleOverlay);
  saveProjectOverlay(nextOverlay);
  return nextOverlay;
}

export function removeProjectFromOverlay(id: number) {
  saveProjectOverlay(getProjectOverlay().filter((project) => project.id !== id));
}
