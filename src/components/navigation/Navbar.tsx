import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">RiseUP</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/mentors" className="text-gray-700 hover:text-blue-600">
              Find Mentors
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}