import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ConnectionRequest } from '../lib/supabase';

export function useConnections(userId: string, role: 'mentor' | 'mentee') {
  const [connections, setConnections] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchConnections();
  }, [userId, role]);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('connection_requests')
        .select('*')
        .eq(role === 'mentor' ? 'mentor_id' : 'mentee_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConnections(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const sendConnectionRequest = async (request: Omit<ConnectionRequest, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('connection_requests')
        .insert([request])
        .select()
        .single();

      if (error) throw error;
      setConnections([data, ...connections]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const updateConnectionStatus = async (connectionId: string, status: 'accepted' | 'rejected') => {
    try {
      const { data, error } = await supabase
        .from('connection_requests')
        .update({ status })
        .eq('id', connectionId)
        .select()
        .single();

      if (error) throw error;
      setConnections(connections.map(c => (c.id === connectionId ? data : c)));
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    connections,
    loading,
    error,
    sendConnectionRequest,
    updateConnectionStatus,
  };
}