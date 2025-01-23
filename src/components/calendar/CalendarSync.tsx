import { useState } from 'react';
import { Calendar, Check, Loader } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { supabase } from '../../lib/supabase';
import { useCalendarSync } from '../../hooks/useCalendarSync';

interface CalendarSyncProps {
  mentorId: string;
  onSyncComplete?: () => void;
}

export function CalendarSync({ mentorId, onSyncComplete }: CalendarSyncProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const { isConnected, isLoading } = useCalendarSync(mentorId);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar',
    onSuccess: async (response) => {
      setIsSyncing(true);
      try {
        const { error } = await supabase
          .from('mentor_calendar_access')
          .upsert({
            mentor_id: mentorId,
            access_token: response.access_token,
            updated_at: new Date().toISOString(),
          });

        if (error) throw error;
        onSyncComplete?.();
      } catch (error) {
        console.error('Error syncing calendar:', error);
        alert('Failed to sync calendar. Please try again.');
      } finally {
        setIsSyncing(false);
      }
    },
    onError: (error) => {
      console.error('Calendar sync error:', error);
      alert('Failed to connect to Google Calendar. Please try again.');
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Calendar Sync</h3>
      <p className="text-sm text-gray-500 text-center">
        Connect your Google Calendar to manage your availability and bookings.
      </p>
      
      <button
        onClick={() => login()}
        disabled={isSyncing || isConnected}
        className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
          isConnected
            ? 'bg-green-50 text-green-700'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
      >
        {isSyncing ? (
          <Loader className="w-5 h-5 mr-2 animate-spin" />
        ) : isConnected ? (
          <Check className="w-5 h-5 mr-2" />
        ) : (
          <Calendar className="w-5 h-5 mr-2" />
        )}
        {isConnected ? 'Calendar Connected' : 'Connect Calendar'}
      </button>
    </div>
  );
} 