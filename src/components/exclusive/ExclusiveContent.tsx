import { useAuth } from '../../context/AuthContext';
import { Lock, Star, Calendar, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ExclusiveContent() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user?.isExclusiveMember) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm">
        <div className="text-center">
          <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Exclusive Member Content
          </h3>
          <p className="text-gray-600 mb-4">
            Attend our events regularly to unlock exclusive benefits and premium content.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View Upcoming Events
            <Calendar className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Star className="h-6 w-6 text-yellow-500 mr-2" />
          Exclusive Member Benefits
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Premium Workshops */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Premium Workshops</h4>
          <p className="text-gray-600 text-sm">
            Access to specialized workshops with industry leaders.
          </p>
        </div>

        {/* 1-on-1 Sessions */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <Users className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">1-on-1 Sessions</h4>
          <p className="text-gray-600 text-sm">
            Monthly one-on-one sessions with top mentors.
          </p>
        </div>

        {/* Resource Library */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Resource Library</h4>
          <p className="text-gray-600 text-sm">
            Exclusive access to premium learning resources.
          </p>
        </div>
      </div>
    </div>
  );
} 