import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Users, 
  Bell, 
  Briefcase, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin,
  Plus,
  Calendar,
  CheckCircle,
  XCircle,
  Trash2,
  Edit
} from 'lucide-react';

type TabType = 'profile' | 'mentees' | 'requests';

interface Expertise {
  id: string;
  name: string;
}

interface MenteeTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

interface Meeting {
  id: string;
  date: string;
  duration: string;
  notes: string;
}

interface Mentee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tasks: MenteeTask[];
  meetings: Meeting[];
}

interface MenteeRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  avatar: string;
  requestDate: string;
}

export function MentorDashboardPage() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [expertise, setExpertise] = useState<Expertise[]>([
    { id: '1', name: 'Web Development' },
    { id: '2', name: 'Cloud Architecture' },
    { id: '3', name: 'DevOps' },
  ]);
  const [mentees] = useState<Mentee[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      tasks: [
        {
          id: '1',
          title: 'Complete React Tutorial',
          description: 'Finish the advanced React concepts section',
          dueDate: '2024-03-25',
          status: 'pending'
        }
      ],
      meetings: [
        {
          id: '1',
          date: '2024-03-15',
          duration: '1 hour',
          notes: 'Discussed career goals and learning path'
        }
      ]
    }
  ]);
  const [requests] = useState<MenteeRequest[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      message: 'I would love to learn from your experience in web development.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      requestDate: '2024-03-10'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Mentor Dashboard
          </h1>
          <p className="mt-1 text-gray-600">
            Manage your mentoring activities and mentees
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="h-5 w-5 inline-block mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('mentees')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'mentees'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="h-5 w-5 inline-block mr-2" />
              Mentees
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'requests'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell className="h-5 w-5 inline-block mr-2" />
              Requests
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Expertise Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                    >
                      {item.name}
                      <button className="ml-2 text-blue-400 hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button className="flex items-center text-blue-600 hover:text-blue-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Expertise
                  </button>
                </div>
              </section>

              {/* Center Location */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Center Location
                </h2>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  Toronto, ON, Canada
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-2" />
                    {user?.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    +1 (555) 123-4567
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Linkedin className="h-5 w-5 mr-2" />
                    linkedin.com/in/mentorprofile
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'mentees' && (
            <div className="space-y-6">
              {mentees.map((mentee) => (
                <div key={mentee.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={mentee.avatar}
                        alt={mentee.name}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {mentee.name}
                        </h3>
                        <p className="text-gray-500">{mentee.email}</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Tasks */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Tasks
                    </h4>
                    {mentee.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-gray-500">
                            Due: {task.dueDate}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            task.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    ))}
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">
                      <Plus className="h-4 w-4 inline-block mr-1" />
                      Add Task
                    </button>
                  </div>

                  {/* Meetings */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Meetings
                    </h4>
                    {mentee.meetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="bg-gray-50 p-2 rounded mb-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{meeting.date}</p>
                            <p className="text-sm text-gray-500">
                              Duration: {meeting.duration}
                            </p>
                          </div>
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {meeting.notes}
                        </p>
                      </div>
                    ))}
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      <Plus className="h-4 w-4 inline-block mr-1" />
                      Add Meeting
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* Manual Add Button */}
              <button className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500">
                <Plus className="h-5 w-5 mr-2" />
                Add Mentee Manually
              </button>

              {/* Requests List */}
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center">
                    <img
                      src={request.avatar}
                      alt={request.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {request.name}
                      </h3>
                      <p className="text-gray-500">{request.email}</p>
                    </div>
                  </div>

                  <p className="text-gray-600">{request.message}</p>

                  <div className="flex items-center justify-end space-x-4">
                    <button className="flex items-center text-green-600 hover:text-green-700">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      Approve
                    </button>
                    <button className="flex items-center text-red-600 hover:text-red-700">
                      <XCircle className="h-5 w-5 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 