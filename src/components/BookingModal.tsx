import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import type { Speaker, TimeSlot } from '../types';

interface BookingModalProps {
  mentor: Speaker;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { timeSlot: TimeSlot; questions: string }) => void;
}

export function BookingModal({ mentor, isOpen, onClose, onSubmit }: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [questions, setQuestions] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    onSubmit({ timeSlot: selectedSlot, questions });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Book a Session with {mentor.name}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Time Slots
              </label>
              <div className="space-y-2">
                {mentor.availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full flex items-center justify-between p-3 border rounded-md ${
                      selectedSlot?.id === slot.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{new Date(slot.startTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span>
                        {new Date(slot.startTime).toLocaleTimeString()} -{' '}
                        {new Date(slot.endTime).toLocaleTimeString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="questions"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Questions or Topics to Discuss
              </label>
              <textarea
                id="questions"
                rows={4}
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="What would you like to discuss with the speaker?"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedSlot}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}