import { Calendar } from 'lucide-react';
import type { Event } from '../../types';

interface EventRegistrationProps {
  event: Event;
}

export function EventRegistration({ event }: EventRegistrationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Calendar className="h-6 w-6 text-white" />
        <div>
          <h3 className="text-sm font-medium text-white">{event.title}</h3>
          <p className="text-sm text-blue-100">
            {new Date(event.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <a
        href={event.lumaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
      >
        Register Now
      </a>
    </div>
  );
}