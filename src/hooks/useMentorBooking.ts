import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function useMentorBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const bookSlot = async (mentorId: string, slotId: string) => {
    if (!user) {
      throw new Error('User must be authenticated to book a slot');
    }

    setLoading(true);
    setError(null);

    try {
      // Mock booking logic
      console.log('Booking slot:', { mentorId, slotId, userId: user.id });
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book slot');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { bookSlot, loading, error };
} 