import React, { useState } from 'react';
import { Plus, Calendar, Link as LinkIcon, Clock, Edit2, Trash2 } from 'lucide-react';
import type { Event } from '../../types';

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'RiseUP Tech Conference 2025',
    description: 'Join us for an inspiring day of learning and networking with industry leaders.',
    date: '2025-02-20',
    lumaUrl: 'https://lu.ma/riseup-tech-2024',
    registrationDeadline: '2025-02-10',
    isActive: true
  }
];

export function EventManager() {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id
          ? { ...editingEvent, ...newEvent }
          : event
      ));
      setEditingEvent(null);
    } else if (newEvent.title && newEvent.date && newEvent.lumaUrl) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description || '',
        date: newEvent.date,
        lumaUrl: newEvent.lumaUrl,
        registrationDeadline: newEvent.registrationDeadline || newEvent.date,
        isActive: newEvent.isActive || false
      };
      setEvents([...events, event]);
      setIsAddingEvent(false);
      setNewEvent({ isActive: true });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          {editingEvent ? 'Edit Event' : 'Manage Events'}
        </h2>
        <button
          onClick={() => {
            if (!editingEvent) {
              setIsAddingEvent(true);
            }
          }}
          disabled={!!editingEvent}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </button>
      </div>

      {(isAddingEvent || editingEvent) && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newEvent.title || ''}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Date</label>
                <input
                  type="date"
                  value={newEvent.date || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Deadline</label>
                <input
                  type="date"
                  value={newEvent.registrationDeadline || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, registrationDeadline: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lu.ma URL</label>
              <input
                type="url"
                value={newEvent.lumaUrl || ''}
                onChange={(e) => setNewEvent({ ...newEvent, lumaUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newEvent.isActive}
                onChange={(e) => setNewEvent({ ...newEvent, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Make event active
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsAddingEvent(false);
                setEditingEvent(null);
                setNewEvent({ isActive: true });
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {editingEvent ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {events.map((event) => (
            <li key={event.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="mr-1.5 h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1.5 h-4 w-4" />
                      Registration closes: {new Date(event.registrationDeadline).toLocaleDateString()}
                    </span>
                    <a
                      href={event.lumaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-500"
                    >
                      <LinkIcon className="mr-1.5 h-4 w-4" />
                      Lu.ma Event
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setEditingEvent(event);
                      setNewEvent(event);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setEvents(events.filter(e => e.id !== event.id));
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}