'use client';

import { requireSupabaseBrowserClient } from './supabase';
import type { Database } from './supabaseTypes';

type ProjectRow = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];
type TaskRow = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
type TaskUpdate = Database['public']['Tables']['tasks']['Update'];
type WorkerRow = Database['public']['Tables']['workers']['Row'];
type WorkerInsert = Database['public']['Tables']['workers']['Insert'];
type WorkerUpdate = Database['public']['Tables']['workers']['Update'];
type AttendanceRow = Database['public']['Tables']['attendance']['Row'];
type AttendanceInsert = Database['public']['Tables']['attendance']['Insert'];
type AttendanceUpdate = Database['public']['Tables']['attendance']['Update'];
type DocumentRow = Database['public']['Tables']['documents']['Row'];
type DocumentInsert = Database['public']['Tables']['documents']['Insert'];
type DocumentUpdate = Database['public']['Tables']['documents']['Update'];
type ProfileRow = Database['public']['Tables']['profiles']['Row'];

export interface CrmProject {
  id?: number;
  name: string;
  type: string;
  location: string;
  status: string;
  percentage: number;
  date: string;
  tasksCompleted: number;
  totalTasks: number;
  avatarSeed: string;
  client: string;
  clientUserId?: string | null;
  startDate?: string;
  deadline?: string;
  budget?: number;
  spent?: number;
}

export interface CrmCustomer {
  id: string;
  fullName: string;
  username: string;
}

export interface CrmTask {
  id: number;
  title: string;
  subtitle: string;
  project: string;
  assignedTo: string;
  dueDate: string;
  status: string;
  priority: string;
  progress: number;
  daysRemaining: number;
  type: string;
  location: string;
  assigneeRole: string;
  avatarSeed: string;
}

export interface CrmWorker {
  id: number;
  name: string;
  empId: string;
  role: string;
  phone: string;
  email: string;
  project: string;
  status: string;
  date: string;
  avatar: string;
}

export interface CrmAttendance {
  id: number;
  name: string;
  empId?: string;
  role: string;
  project: string;
  checkIn: string;
  checkInStatus: string;
  checkOut: string;
  hours: string;
  status: string;
  avatar: string;
}

export interface CrmDocument {
  id: number;
  name: string;
  project: string;
  category: string;
  type: string;
  fileType: string;
  size: string;
  uploadedBy: string;
  role: string;
  uploadedOn: string;
  avatar: string;
  url?: string;
}

function toTaskPayload(task: Partial<CrmTask>): TaskUpdate {
  return {
    title: task.title,
    subtitle: task.subtitle,
    project_name: task.project,
    assigned_to: task.assignedTo,
    due_date: task.dueDate || null,
    status: task.status,
    priority: task.priority,
    progress: task.progress,
    days_remaining: task.daysRemaining,
    type: task.type,
    location: task.location,
    assignee_role: task.assigneeRole,
    avatar_seed: task.avatarSeed,
  };
}

function toWorkerPayload(worker: Partial<CrmWorker>): WorkerUpdate {
  return {
    name: worker.name,
    emp_id: worker.empId,
    role: worker.role,
    phone: worker.phone,
    email: worker.email,
    site: worker.project,
    joined_date: worker.date || null,
    status: worker.status,
    avatar_seed: worker.avatar,
  };
}

function toAttendancePayload(attendance: Partial<CrmAttendance>): AttendanceUpdate {
  return {
    worker_name: attendance.name,
    role: attendance.role,
    project: attendance.project,
    check_in: attendance.checkIn,
    check_out: attendance.checkOut,
    status: attendance.status,
    avatar_seed: attendance.avatar,
  };
}

function toDocumentPayload(document: Partial<CrmDocument>): DocumentUpdate {
  return {
    name: document.name,
    project: document.project,
    category: document.category,
    type: document.type,
    file_type: document.fileType,
    size: document.size,
    uploaded_by: document.uploadedBy,
    uploaded_role: document.role,
    uploaded_date: document.uploadedOn,
    url: document.url,
    avatar_seed: document.avatar,
  };
}

function raise(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

function formatDateRange(startDate?: string | null, deadline?: string | null) {
  if (!startDate && !deadline) return 'TBD - TBD';

  const format = (value?: string | null) => {
    if (!value) return 'TBD';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(`${value}T00:00:00`));
  };

  return `${format(startDate)} - ${format(deadline)}`;
}

function toProject(row: ProjectRow): CrmProject {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    location: row.location,
    status: row.status,
    percentage: row.percentage,
    date: row.date || formatDateRange(row.start_date, row.deadline),
    tasksCompleted: row.tasks_completed,
    totalTasks: row.total_tasks,
    avatarSeed: row.avatar_seed || row.name.toLowerCase().replace(/\s+/g, ''),
    client: row.client_name || '',
    clientUserId: row.client_user_id,
    startDate: row.start_date || '',
    deadline: row.deadline || '',
    budget: Number(row.budget || 0),
    spent: Number(row.spent || 0),
  };
}

function toProjectPayload(project: CrmProject): ProjectInsert | ProjectUpdate {
  return {
    name: project.name,
    type: project.type,
    location: project.location,
    status: project.status,
    percentage: project.percentage,
    date: project.date || formatDateRange(project.startDate, project.deadline),
    tasks_completed: project.tasksCompleted,
    total_tasks: project.totalTasks,
    avatar_seed: project.avatarSeed,
    client_user_id: project.clientUserId || null,
    client_name: project.client || null,
    start_date: project.startDate || null,
    deadline: project.deadline || null,
    budget: project.budget || 0,
    spent: project.spent || 0,
  };
}

function toTask(row: TaskRow): CrmTask {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle || '',
    project: row.project_name || '',
    assignedTo: row.assigned_to || '',
    dueDate: row.due_date || '',
    status: row.status,
    priority: row.priority,
    progress: row.progress,
    daysRemaining: row.days_remaining || 0,
    type: row.type || '',
    location: row.location || '',
    assigneeRole: row.assignee_role || '',
    avatarSeed: row.avatar_seed || row.assigned_to || 'worker',
  };
}

function toWorker(row: WorkerRow): CrmWorker {
  return {
    id: row.id,
    name: row.name,
    empId: row.emp_id || `EMP${String(row.id).padStart(3, '0')}`,
    role: row.role,
    phone: row.phone || '',
    email: row.email || '',
    project: row.site || '',
    status: row.status,
    date: row.joined_date || '',
    avatar: row.avatar_seed || row.name,
  };
}

function toAttendance(row: AttendanceRow): CrmAttendance {
  return {
    id: row.id,
    name: row.worker_name,
    role: row.role || '',
    project: row.project || '',
    checkIn: row.check_in || '-',
    checkInStatus: row.check_in && row.check_in > '09:00' ? 'Late' : row.check_in ? 'On Time' : '',
    checkOut: row.check_out || '-',
    hours: '-',
    status: row.status,
    avatar: row.avatar_seed || row.worker_name,
  };
}

function toDocument(row: DocumentRow): CrmDocument {
  return {
    id: row.id,
    name: row.name,
    project: row.project || '',
    category: row.category || '',
    type: row.type || '',
    fileType: row.file_type || '',
    size: row.size || '-',
    uploadedBy: row.uploaded_by || '',
    role: row.uploaded_role || '',
    uploadedOn: row.uploaded_date || row.created_at,
    avatar: row.avatar_seed || row.uploaded_by || 'admin',
    url: row.url || undefined,
  };
}

export async function listProjects() {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  raise(error);
  return (data || []).map(toProject);
}

export async function listCustomers() {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, role, phone, created_at, updated_at')
    .eq('role', 'CUSTOMER')
    .order('full_name');

  raise(error);
  return ((data || []) as ProfileRow[]).map((profile) => ({
    id: profile.id,
    username: profile.username || '',
    fullName: profile.full_name,
  }));
}

export async function saveProject(project: CrmProject) {
  const supabase = requireSupabaseBrowserClient();
  const payload = toProjectPayload(project);

  if (project.id) {
    const { error } = await supabase.from('projects').update(payload).eq('id', project.id);
    raise(error);
    return;
  }

  const { error } = await supabase.from('projects').insert(payload as ProjectInsert);
  raise(error);
}

export async function deleteProject(id: number) {
  const supabase = requireSupabaseBrowserClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  raise(error);
}

export async function listTasks() {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true });

  raise(error);
  return (data || []).map(toTask);
}

export async function createTask(task: Pick<CrmTask, 'title'> & Partial<CrmTask>) {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('tasks')
    .insert(toTaskPayload(task) as TaskInsert)
    .select('*')
    .single();

  raise(error);
  return toTask(data as TaskRow);
}

export async function updateTask(id: number, task: Partial<CrmTask>) {
  const supabase = requireSupabaseBrowserClient();
  const { error } = await supabase.from('tasks').update(toTaskPayload(task) as TaskUpdate).eq('id', id);
  raise(error);
}

export async function deleteTask(id: number) {
  const supabase = requireSupabaseBrowserClient();
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  raise(error);
}

export async function listWorkers() {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('workers')
    .select('*')
    .order('name');

  raise(error);
  return (data || []).map(toWorker);
}

export async function createWorker(worker: Pick<CrmWorker, 'name' | 'role'> & Partial<CrmWorker>) {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('workers')
    .insert(toWorkerPayload(worker) as WorkerInsert)
    .select('*')
    .single();

  raise(error);
  return toWorker(data as WorkerRow);
}

export async function updateWorker(id: number, worker: Partial<CrmWorker>) {
  const supabase = requireSupabaseBrowserClient();
  const { error } = await supabase.from('workers').update(toWorkerPayload(worker) as WorkerUpdate).eq('id', id);
  raise(error);
}

export async function deleteWorker(id: number) {
  const supabase = requireSupabaseBrowserClient();
  const { error } = await supabase.from('workers').delete().eq('id', id);
  raise(error);
}

export async function listAttendance() {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .order('work_date', { ascending: false });

  raise(error);
  return (data || []).map(toAttendance);
}

export async function createAttendance(attendance: Pick<CrmAttendance, 'name' | 'status'> & Partial<CrmAttendance>) {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('attendance')
    .insert({
      ...toAttendancePayload(attendance),
      worker_name: attendance.name,
      status: attendance.status,
      work_date: new Date().toISOString().slice(0, 10),
    } as AttendanceInsert)
    .select('*')
    .single();

  raise(error);
  return toAttendance(data as AttendanceRow);
}

export async function updateAttendance(id: number, attendance: Partial<CrmAttendance>) {
  const supabase = requireSupabaseBrowserClient();
  const { error } = await supabase.from('attendance').update(toAttendancePayload(attendance) as AttendanceUpdate).eq('id', id);
  raise(error);
}

export async function deleteAttendance(id: number) {
  const supabase = requireSupabaseBrowserClient();
  const { error } = await supabase.from('attendance').delete().eq('id', id);
  raise(error);
}

export async function listDocuments() {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('uploaded_date', { ascending: false });

  raise(error);
  return (data || []).map(toDocument);
}

export async function createDocument(document: Pick<CrmDocument, 'name'> & Partial<CrmDocument>) {
  const supabase = requireSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('documents')
    .insert(toDocumentPayload(document) as DocumentInsert)
    .select('*')
    .single();

  raise(error);
  return toDocument(data as DocumentRow);
}

export async function updateDocument(id: number, document: Partial<CrmDocument>) {
  const supabase = requireSupabaseBrowserClient();
  const { error } = await supabase.from('documents').update(toDocumentPayload(document) as DocumentUpdate).eq('id', id);
  raise(error);
}

export async function deleteDocument(id: number) {
  const supabase = requireSupabaseBrowserClient();
  const { error } = await supabase.from('documents').delete().eq('id', id);
  raise(error);
}
