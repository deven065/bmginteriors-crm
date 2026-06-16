export type AppRole = 'ADMIN' | 'CUSTOMER';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string;
          role: AppRole;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name: string;
          role?: AppRole;
          phone?: string | null;
        };
        Update: {
          username?: string | null;
          full_name?: string;
          role?: AppRole;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: number;
          name: string;
          type: string;
          location: string;
          status: string;
          percentage: number;
          date: string | null;
          tasks_completed: number;
          total_tasks: number;
          avatar_seed: string | null;
          client_user_id: string | null;
          client_name: string | null;
          start_date: string | null;
          deadline: string | null;
          budget: number | null;
          spent: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['projects']['Row']> & {
          name: string;
        };
        Update: Partial<Database['public']['Tables']['projects']['Row']>;
        Relationships: [];
      };
      tasks: {
        Row: {
          id: number;
          title: string;
          subtitle: string | null;
          project_id: number | null;
          project_name: string | null;
          assigned_to: string | null;
          due_date: string | null;
          status: string;
          priority: string;
          progress: number;
          days_remaining: number | null;
          type: string | null;
          location: string | null;
          assignee_role: string | null;
          avatar_seed: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['tasks']['Row']> & {
          title: string;
        };
        Update: Partial<Database['public']['Tables']['tasks']['Row']>;
        Relationships: [];
      };
      workers: {
        Row: {
          id: number;
          name: string;
          emp_id: string | null;
          role: string;
          phone: string | null;
          email: string | null;
          site: string | null;
          joined_date: string | null;
          status: string;
          avatar_seed: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['workers']['Row']> & {
          name: string;
          role: string;
        };
        Update: Partial<Database['public']['Tables']['workers']['Row']>;
        Relationships: [];
      };
      attendance: {
        Row: {
          id: number;
          worker_id: number | null;
          worker_name: string;
          role: string | null;
          project: string | null;
          check_in: string | null;
          check_out: string | null;
          work_date: string;
          status: string;
          avatar_seed: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['attendance']['Row']> & {
          worker_name: string;
          work_date: string;
          status: string;
        };
        Update: Partial<Database['public']['Tables']['attendance']['Row']>;
        Relationships: [];
      };
      documents: {
        Row: {
          id: number;
          name: string;
          project: string | null;
          category: string | null;
          type: string | null;
          file_type: string | null;
          size: string | null;
          uploaded_by: string | null;
          uploaded_role: string | null;
          uploaded_date: string | null;
          url: string | null;
          avatar_seed: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['documents']['Row']> & {
          name: string;
        };
        Update: Partial<Database['public']['Tables']['documents']['Row']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
