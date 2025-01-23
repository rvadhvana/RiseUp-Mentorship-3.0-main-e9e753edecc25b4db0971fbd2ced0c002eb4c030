import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Mentor = Database['public']['Tables']['mentors']['Row'];

export const mentorService = {
  async createMentor(mentorData: Omit<Mentor, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('mentors')
      .insert([mentorData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateMentor(id: string, updates: Partial<Mentor>) {
    const { data, error } = await supabase
      .from('mentors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async bookMentorSlot(mentorId: string, slotId: string, userId: string) {
    // Implement booking logic here
    const { data, error } = await supabase.rpc('book_mentor_slot', {
      p_mentor_id: mentorId,
      p_slot_id: slotId,
      p_user_id: userId
    });

    if (error) throw error;
    return data;
  }
}; 