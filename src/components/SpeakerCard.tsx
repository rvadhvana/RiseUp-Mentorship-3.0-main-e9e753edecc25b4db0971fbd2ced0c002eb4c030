import React from 'react';
import { Calendar, Clock, Briefcase, Tag, UserPlus, MapPin } from 'lucide-react';
import type { Speaker } from '../types';

interface MentorCardProps {
  mentor: Speaker;
  isAuthenticated: boolean;
  onBooking: (mentorId: string) => void;
  onConnect: (mentorId: string) => void;
}

export function MentorCard({ mentor, isAuthenticated, onBooking, onConnect }: MentorCardProps) {
  const handleAction = (action: 'book' | 'connect') => {
    if (!isAuthenticated) {
      // This will be handled by the parent component
      onConnect(mentor.id);
      return;
    }
    
    if (action === 'book') {
      onBooking(mentor.id);
    } else {
      onConnect(mentor.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={mentor.imageUrl}
            alt={mentor.name}
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-100 m-4"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{mentor.name}</h3>
            <button
              onClick={() => handleAction('connect')}
              className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 mr-4"
            >
              <UserPlus className="w-3 h-3 mr-1" />
              Connect
            </button>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-600">
            <Briefcase className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{mentor.title} at {mentor.company}</span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>{mentor.location}</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
              >
                <Tag className="w-3 h-3 mr-1" />
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 text-gray-600 text-sm line-clamp-2">{mentor.bio}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{mentor.availableSlots.length} available slots</span>
          </div>
          <button
            onClick={() => handleAction('book')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
}