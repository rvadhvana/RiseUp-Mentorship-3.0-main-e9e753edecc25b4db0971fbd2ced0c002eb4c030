import React from 'react';
import { CheckCircle, XCircle, User, Mail, Briefcase, Tag } from 'lucide-react';
import type { RegistrationRequest } from '../../types';

import { useAuthStore } from '../../store/authStore';

export function RegistrationRequests() {
  const requests = useAuthStore((state) => state.pendingRegistrations);
  const updateRegistrationStatus = useAuthStore((state) => state.updateRegistrationStatus);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {requests.map((request) => (
          <li key={request.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {request.userData.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      request.userRole === 'mentor' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {request.userRole}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Mail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    {request.userData.email}
                  </div>
                  {request.userRole === 'mentor' && request.userData.expertise && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {request.userData.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                    <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    <span>Submitted: {new Date(request.submittedAt).toLocaleString()}</span>
                    {request.reviewedAt && (
                      <span>• Reviewed: {new Date(request.reviewedAt).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
              {request.status === 'pending' ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateRegistrationStatus(request.id, 'approved')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                  <button
                    onClick={() => updateRegistrationStatus(request.id, 'rejected')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                </div>
              ) : (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  request.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}