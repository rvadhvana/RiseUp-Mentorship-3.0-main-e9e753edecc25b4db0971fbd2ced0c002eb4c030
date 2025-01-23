import React from 'react';
import { CheckCircle, XCircle, Clock, Mail, MessageSquare } from 'lucide-react';

interface MenteeRequest {
  id: string;
  menteeId: string;
  menteeName: string;
  menteeEmail: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}

interface MenteeRequestsProps {
  requests: MenteeRequest[];
  onAction: (requestId: string, action: 'accept' | 'reject') => void;
}

export function MenteeRequests({ requests, onAction }: MenteeRequestsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Connection Requests</h2>
        <span className="text-sm text-gray-500">
          {requests.filter(r => r.status === 'pending').length} pending requests
        </span>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No connection requests yet
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li key={request.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {request.menteeName}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Mail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {request.menteeEmail}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <MessageSquare className="flex-shrink-0 mr-1.5 h-4 w-4 mt-0.5" />
                        <p>{request.message}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      Submitted {new Date(request.submittedAt).toLocaleString()}
                    </div>
                  </div>
                  {request.status === 'pending' && (
                    <div className="ml-6 flex items-center space-x-3">
                      <button
                        onClick={() => onAction(request.id, 'accept')}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </button>
                      <button
                        onClick={() => onAction(request.id, 'reject')}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}