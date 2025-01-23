import { CalendarSync } from '../calendar/CalendarSync';
import type { Mentor } from '../../types';

interface MentorProfileProps {
  mentor: Mentor;
}

export function MentorProfile({ mentor }: MentorProfileProps) {
  return (
    <div className="space-y-6">
      {/* Existing mentor profile content */}
      
      {/* Add calendar sync section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Calendar Settings</h2>
        <CalendarSync 
          mentorId={mentor.id} 
          onSyncComplete={() => {
            // Refresh mentor availability or show success message
            window.location.reload();
          }} 
        />
      </div>
    </div>
  );
} 