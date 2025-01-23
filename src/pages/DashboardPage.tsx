import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome, {profile?.first_name} {profile?.last_name}!
          </h1>
          
          {profile?.user_role === 'mentor' ? (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-700">Mentor Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard
                  title="Pending Requests"
                  value="0"
                  description="Mentorship requests awaiting your response"
                />
                <DashboardCard
                  title="Active Mentees"
                  value="0"
                  description="Students you are currently mentoring"
                />
                <DashboardCard
                  title="Completed Sessions"
                  value="0"
                  description="Total mentorship sessions completed"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-700">Mentee Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard
                  title="Your Mentor"
                  value="Not Assigned"
                  description="Current mentor assignment status"
                />
                <DashboardCard
                  title="Upcoming Sessions"
                  value="0"
                  description="Scheduled mentorship sessions"
                />
                <DashboardCard
                  title="Learning Path"
                  value="In Progress"
                  description="Your current learning progress"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
}

function DashboardCard({ title, value, description }: DashboardCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
} 