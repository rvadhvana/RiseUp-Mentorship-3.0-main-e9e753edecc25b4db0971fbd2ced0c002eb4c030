export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name?: string;
          last_name?: string;
          user_role: 'mentee' | 'mentor' |'organization';
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string;
          last_name?: string;
          user_role?: 'mentee' | 'mentor' |'organization';
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      // Add other tables as needed
    };
  };
}

// export type Profile = Database['public']['Tables']['profiles']['Row'];
