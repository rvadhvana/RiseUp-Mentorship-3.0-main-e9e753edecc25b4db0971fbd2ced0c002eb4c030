export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          type: string
          address: string | null
          city: string | null
          state: string | null
          country: string | null
          postal_code: string | null
          contact_email: string
          contact_phone: string
          created_at: string
        }
        Insert: {
          id: string
          name: string
          type: string
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          contact_email: string
          contact_phone: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          contact_email?: string
          contact_phone?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          user_role: 'mentor' | 'mentee'
          expertise: string[] | null
          years_experience: string | null
          job_title: string | null
          company: string | null
          bio: string | null
          interests: string[] | null
          user_status: string | null
          goals: string | null
          created_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          user_role: 'mentor' | 'mentee'
          expertise?: string[] | null
          years_experience?: string | null
          job_title?: string | null
          company?: string | null
          bio?: string | null
          interests?: string[] | null
          user_status?: string | null
          goals?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          user_role?: 'mentor' | 'mentee'
          expertise?: string[] | null
          years_experience?: string | null
          job_title?: string | null
          company?: string | null
          bio?: string | null
          interests?: string[] | null
          user_status?: string | null
          goals?: string | null
          created_at?: string
        }
      }
      success_stories: {
        Row: {
          id: string
          user_id: string
          story: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          story: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          story?: string
          created_at?: string
        }
      }
    }
  }
}
