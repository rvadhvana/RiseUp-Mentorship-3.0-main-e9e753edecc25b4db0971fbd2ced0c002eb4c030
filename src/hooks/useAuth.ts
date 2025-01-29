import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthProvider'; // Adjust the import path as necessary

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

  const signIn = async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user } = await response.json();
        setIsAuthenticated(true);
        setUser(user); // Set the user information
      } else {
        console.error('Sign-in failed');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return { initAuth, signIn };
}