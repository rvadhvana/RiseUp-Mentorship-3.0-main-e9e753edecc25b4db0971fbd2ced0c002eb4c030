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
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'mentor' | 'mentee'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: 'admin' | 'mentor' | 'mentee'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'mentor' | 'mentee'
          created_at?: string
          updated_at?: string
        }
      }
      mentors: {
        Row: {
          id: string
          user_id: string
          title: string
          company: string
          location: string
          expertise: string[]
          bio: string
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          company: string
          location: string
          expertise: string[]
          bio: string
          image_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          company?: string
          location?: string
          expertise?: string[]
          bio?: string
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
