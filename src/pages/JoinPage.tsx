import { Link } from 'react-router-dom';
import { User, GraduationCap, Building2 } from 'lucide-react';

export function JoinPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Join RiseUp Mentorship
          </h1>
          <p className="text-lg text-gray-600">
            Choose how you want to be part of our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <JoinCard
            title="Join as Mentee"
            description="Get guidance from experienced professionals"
            icon={<User className="h-8 w-8" />}
            href="/mentee/register"
            color="purple"
          />
          
          <JoinCard
            title="Join as Mentor"
            description="Share your knowledge and experience"
            icon={<GraduationCap className="h-8 w-8" />}
            href="/mentor/register"
            color="green"
          />
          
          <JoinCard
            title="Join as Organization"
            description="Partner with us to support your community"
            icon={<Building2 className="h-8 w-8" />}
            href="/organization/register"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
}

interface JoinCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: 'purple' | 'green' | 'blue';
}

function JoinCard({ title, description, icon, href, color }: JoinCardProps) {
  const colorClasses = {
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-300',
    green: 'bg-green-50 border-green-200 hover:border-green-300',
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-300'
  };

  return (
    <Link
      to={href}
      className={`block p-6 rounded-lg border-2 transition-colors ${colorClasses[color]} hover:shadow-md`}
    >
      <div className="text-center">
        <div className="inline-block p-3 rounded-full bg-white mb-4">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
} 