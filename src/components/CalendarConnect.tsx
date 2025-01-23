import React, { useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

interface CalendarConnectProps {
  isConnected: boolean;
  onConnect: (token: string) => void;
}

export function CalendarConnect({ isConnected, onConnect }: CalendarConnectProps) {
  const [calendarUrl, setCalendarUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleGoogleLogin = () => {
    // For demo purposes, simulate a successful connection
    onConnect('demo_token');
  };

  const handleManualConnect = () => {
    if (calendarUrl) {
      onConnect(calendarUrl);
      setCalendarUrl('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-blue-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Google Calendar Integration
            </h3>
            <p className="text-sm text-gray-500">
              {isConnected
                ? 'Your calendar is connected and syncing'
                : 'Connect your calendar to manage availability'}
            </p>
          </div>
        </div>
        
        {isConnected ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <Check className="w-4 h-4 mr-1" />
            Connected
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoogleLogin}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Connect Google Calendar
            </button>
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Add Calendar URL
            </button>
          </div>
        )}
      </div>
      
      {showUrlInput && !isConnected && (
        <div className="mt-4 flex items-center gap-2">
          <input
            type="url"
            value={calendarUrl}
            onChange={(e) => setCalendarUrl(e.target.value)}
            placeholder="Enter your calendar URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleManualConnect}
            disabled={!calendarUrl}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
}