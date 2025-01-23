import React from 'react';
import { MessageSquare, Calendar, Clock } from 'lucide-react';
import type { ProgressUpdate } from '../types';

export interface ProgressTrackerProps {
  updates: ProgressUpdate[];
  onAddUpdate?: () => void;
  onAddFeedback?: (updateId: string) => void;
}

export function ProgressTracker({ updates, onAddUpdate, onAddFeedback }: ProgressTrackerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Progress Timeline</h2>
        {onAddUpdate && (
          <button
            onClick={onAddUpdate}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Add Update
          </button>
        )}
      </div>

      <div className="space-y-6">
        {updates.map((update) => (
          <div key={update.id} className="relative pl-6 pb-6 border-l-2 border-blue-500">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500" />
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {update.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(update.date).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{update.description}</p>
              
              {update.deadline && (
                <p className="text-sm text-gray-500 mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Due: {new Date(update.deadline).toLocaleDateString()}
                </p>
              )}
              
              {update.mentorFeedback ? (
                <div className="bg-blue-50 rounded p-3 mt-2">
                  <div className="flex items-center text-sm text-blue-800 mb-1">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Mentor Feedback
                  </div>
                  <p className="text-blue-900">{update.mentorFeedback}</p>
                </div>
              ) : (
                onAddFeedback && (
                  <button
                    onClick={() => onAddFeedback(update.id)}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Add Feedback
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}