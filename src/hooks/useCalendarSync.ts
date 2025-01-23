import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useCalendarSync(mentorId: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkCalendarConnection() {
      try {
        const { data, error } = await supabase
          .from('mentor_calendar_access')
          .select('access_token')
          .eq('mentor_id', mentorId)
          .single();

        if (error) throw error;
        setIsConnected(!!data);
      } catch (error) {
        console.error('Error checking calendar connection:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkCalendarConnection();
  }, [mentorId]);

  return {
    isConnected,
    isLoading
  };
} 