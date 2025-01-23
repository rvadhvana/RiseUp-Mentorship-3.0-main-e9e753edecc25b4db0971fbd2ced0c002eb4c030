import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Skill } from '../lib/supabase';

export function useSkills(userId: string) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchSkills();
  }, [userId]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSkills(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([skill])
        .select()
        .single();

      if (error) throw error;
      setSkills([data, ...skills]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const updateSkill = async (skillId: string, updates: Partial<Skill>) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', skillId)
        .select()
        .single();

      if (error) throw error;
      setSkills(skills.map(s => (s.id === skillId ? data : s)));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const deleteSkill = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;
      setSkills(skills.filter(s => s.id !== skillId));
    } catch (err) {
      throw err;
    }
  };

  return {
    skills,
    loading,
    error,
    addSkill,
    updateSkill,
    deleteSkill,
  };
}