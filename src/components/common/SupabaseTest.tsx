import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('profiles').select('count');
        if (error) throw error;
        setStatus('connected');
      } catch (err) {
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    testConnection();
  }, []);

  if (status === 'loading') return <div>Testing Supabase connection...</div>;
  if (status === 'error') return <div>Supabase Error: {errorMessage}</div>;
  return <div>Supabase Connected!</div>;
} 