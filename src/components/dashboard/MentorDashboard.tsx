import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, UserCircle, Calendar, CheckCircle } from 'lucide-react';
import { TaskList } from '../mentorship/TaskList';
import { ProgressTracker } from '../ProgressTracker';
import { CalendarConnect } from '../CalendarConnect';
import { MentorPortfolio } from './MentorPortfolio';
import { MenteeRequests } from './MenteeRequests';
import { MenteeDetails } from './MenteeDetails';
import type { User, ProgressUpdate } from '../../types';
import { useAuth } from '../../context/AuthProvider'; // Adjust the import path as necessary

// Mock data - In a real app, this would come from an API
const MOCK_MENTEES: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'mentee',
    profile: {
      education: [{
        institution: 'Tech University',
        degree: 'BS',
        field: 'Computer Science',
        startYear: 2020,
        current: true
      }],
      careerGoals: 'Become a Full Stack Developer',
      interests: ['Web Development', 'AI/ML', 'Cloud Computing'],
      progress: [
        {
          id: '1',
          date: '2024-03-15',
          title: 'React Fundamentals',
          description: 'Complete React basics course and build a sample project',
          status: 'in_progress',
          deadline: '2024-03-30'
        },
        {
          id: '2',
          date: '2024-03-16',
          title: 'JavaScript ES6+ Features',
          description: 'Study and practice modern JavaScript features',
          status: 'pending',
          deadline: '2024-04-05'
        }
      ],
      jobSeekingStatus: {
        isLookingForJob: true,
        preferences: {
          positions: ['Frontend Developer', 'Full Stack Developer'],
          expectedSalary: {
            min: 80000,
            max: 120000,
            currency: 'USD'
          },
          preferredCompanies: ['Google', 'Microsoft', 'Meta'],
          preferredLocations: ['San Francisco, CA', 'Seattle, WA'],
          remotePreference: 'hybrid'
        },
        lastUpdated: '2024-03-15'
      }
    }
  }
];

const MOCK_UPDATES: ProgressUpdate[] = [
  {
    id: '1',
    date: '2024-03-15',
    title: 'React Fundamentals',
    description: 'Complete React basics course and build a sample project',
    status: 'in_progress',
    deadline: '2024-03-30',
    mentorFeedback: ''
  }
];

const MOCK_REQUESTS = [
  {
    id: '1',
    menteeId: '2',
    menteeName: 'Bob Smith',
    menteeEmail: 'bob@example.com',
    message: 'I would love to learn from your experience in cloud architecture.',
    status: 'pending',
    submittedAt: '2024-03-15T10:00:00Z'
  }
];

export function MentorDashboard() {
  const { user } = useAuth();
  const [mentees, setMentees] = useState(MOCK_MENTEES);
  const [updates] = useState(MOCK_UPDATES);
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'requests'>('overview');
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleAddFeedback = (taskId: string, feedback: string) => {
    // In a real app, this would make an API call
    console.log('Adding feedback:', { taskId, feedback });
  };

  const handleRequestAction = (requestId: string, action: 'accept' | 'reject') => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: action === 'accept' ? 'accepted' : 'rejected' } : req
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-gray-400" />
            <span className="ml-2 text-sm font-medium text-gray-900">{user?.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-700">Your Mentees</h2>
            <ul className="mt-4 space-y-2">
              {mentees.map((mentee) => (
                <li key={mentee.id} className="flex items-center justify-between">
                  <span>{mentee.name}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </li>
              ))}
            </ul>
          </div>
          {/* Add more sections as needed */}
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`${
                activeTab === 'portfolio'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              Requests
              {requests.filter(r => r.status === 'pending').length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {requests.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {activeTab === 'requests' ? (
          <MenteeRequests requests={requests} onAction={handleRequestAction} />
        ) : activeTab === 'portfolio' ? (
          <MentorPortfolio />
        ) : (
          <div className="space-y-8">
            <div className="mb-8">
              <CalendarConnect
                isConnected={false}
                onConnect={(token) => {
                  console.log('Calendar connected:', token);
                }}
              />
            </div>

            <div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Mentees</h2>
                <div className="space-y-4">
                  {mentees.map((mentee) => (
                    <MenteeDetails
                      key={mentee.id}
                      mentee={mentee}
                      onAddFeedback={handleAddFeedback}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}