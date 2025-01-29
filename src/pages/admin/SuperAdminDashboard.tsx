import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';
import {
  Users,
  Building2,
  UserCheck,
  UserX,
  Settings,
  Shield,
  Bell,
  ChevronDown,
  Search
} from 'lucide-react';

interface DashboardStats {
  totalOrganizations: number;
  totalMentors: number;
  totalMentees: number;
  pendingRequests: number;
}

interface UserRequest {
  id: string;
  type: 'mentor' | 'organization' | 'mentee';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  userData: any;
}

export function SuperAdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'organizations' | 'requests'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalOrganizations: 0,
    totalMentors: 0,
    totalMentees: 0,
    pendingRequests: 0
  });
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const { data: organizations } = await supabase
        .from('organizations')
        .select('*');

      const { data: mentors } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_role', 'mentor');

      const { data: mentees } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_role', 'mentee');

      const { data: pendingReqs } = await supabase
        .from('requests')
        .select('*')
        .eq('status', 'pending');

      setStats({
        totalOrganizations: organizations?.length || 0,
        totalMentors: mentors?.length || 0,
        totalMentees: mentees?.length || 0,
        pendingRequests: pendingReqs?.length || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleRequestAction = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: action === 'approve' ? 'approved' : 'rejected' })
        .eq('id', requestId);

      if (error) throw error;

      // Refresh requests
      fetchDashboardData();
    } catch (error) {
      console.error('Error handling request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              Super Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
              <Settings className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Organizations"
            value={stats.totalOrganizations}
            icon={<Building2 className="h-6 w-6 text-blue-600" />}
            color="blue"
          />
          <StatCard
            title="Total Mentors"
            value={stats.totalMentors}
            icon={<Users className="h-6 w-6 text-green-600" />}
            color="green"
          />
          <StatCard
            title="Total Mentees"
            value={stats.totalMentees}
            icon={<Users className="h-6 w-6 text-purple-600" />}
            color="purple"
          />
          <StatCard
            title="Pending Requests"
            value={stats.pendingRequests}
            icon={<Bell className="h-6 w-6 text-yellow-600" />}
            color="yellow"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <TabButton
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
                icon={<Shield className="h-5 w-5" />}
                label="Overview"
              />
              <TabButton
                active={activeTab === 'users'}
                onClick={() => setActiveTab('users')}
                icon={<Users className="h-5 w-5" />}
                label="Users"
              />
              <TabButton
                active={activeTab === 'organizations'}
                onClick={() => setActiveTab('organizations')}
                icon={<Building2 className="h-5 w-5" />}
                label="Organizations"
              />
              <TabButton
                active={activeTab === 'requests'}
                onClick={() => setActiveTab('requests')}
                icon={<Bell className="h-5 w-5" />}
                label="Requests"
              />
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'requests' && (
              <div className="space-y-4">
                {requests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onApprove={() => handleRequestAction(request.id, 'approve')}
                    onReject={() => handleRequestAction(request.id, 'reject')}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    yellow: 'bg-yellow-50'
  };

  return (
    <div className={`${colorClasses[color]} rounded-xl p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
        active
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
}

interface RequestCardProps {
  request: UserRequest;
  onApprove: () => void;
  onReject: () => void;
}

function RequestCard({ request, onApprove, onReject }: RequestCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="font-medium text-gray-900">
          {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Application
        </h3>
        <p className="text-sm text-gray-500">
          Submitted on {new Date(request.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onApprove}
          className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 flex items-center"
        >
          <UserCheck className="h-4 w-4 mr-1" />
          Approve
        </button>
        <button
          onClick={onReject}
          className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center"
        >
          <UserX className="h-4 w-4 mr-1" />
          Reject
        </button>
      </div>
    </div>
  );
} 