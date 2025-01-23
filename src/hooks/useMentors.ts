import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Mentor } from '../types';

export function useMentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const { data, error } = await supabase
          .from('mentors')
          .select('*');
        
        if (error) throw error;
        
        setMentors(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch mentors'));
      } finally {
        setLoading(false);
      }
    }

    fetchMentors();
  }, []);

  return { mentors, loading, error };
} 