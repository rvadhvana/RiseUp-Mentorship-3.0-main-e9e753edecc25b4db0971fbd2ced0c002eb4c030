import { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import type { Mentor } from '../../types';

interface BookingModalProps {
  mentor: Mentor;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (slotId: string) => void;
}

export function BookingModal({ mentor, isOpen, onClose, onSubmit }: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Book a Session with {mentor.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {mentor.availableSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => setSelectedSlot(slot.id)}
              className={`w-full p-4 rounded-lg border ${
                selectedSlot === slot.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{new Date(slot.startTime).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span>
                    {new Date(slot.startTime).toLocaleTimeString()} -{' '}
                    {new Date(slot.endTime).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => selectedSlot && onSubmit(selectedSlot)}
            disabled={!selectedSlot}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
} 