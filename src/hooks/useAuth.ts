import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const { setIsAuthenticated, setUser } = useAuthStore();

  const initAuth = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        // Fetch user profile from your database
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userProfile) {
          setUser(userProfile);
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    }
  }, [setIsAuthenticated, setUser]);

  return { initAuth };
}