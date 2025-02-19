import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Settings, LogOut, UserCircle, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

export function UserMenu() {
  const { profile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // if (!user || !profile) {
  //   return null;
  // }

  // Get display name with proper fallbacks
  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile?.first_name} ${profile?.last_name}`;
    }
    if (profile?.first_name) {
      return profile?.first_name;
    }
    // If no name is set, show "Profile Settings" to encourage users to set their name
    return "Profile Settings";
  };

  // Simplified dashboard link based on role
  const getDashboardLink = () => {
    const role = profile?.user_role;
    if (role === 'organization') return '/organization/dashboard';
    if (role === 'mentee') return '/mentee/dashboard';
    return '/dashboard';
  };

  // Role-specific dashboard label
  const getDashboardLabel = () => {
    const role = profile?.user_role;
    if (role === 'organization') return 'Organization Dashboard';
    if (role === 'mentee') return 'Mentee Dashboard';
    return 'Dashboard';
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('sb-awkuwmmzwyemshrxamvu-auth-token');
      await logout();
      setIsOpen(false);
      navigate('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-5 w-5" />
        <span className="font-medium">{getDisplayName()}</span>
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <Link
            to={getDashboardLink()}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard className="inline-block h-4 w-4 mr-2" />
            {getDashboardLabel()}
          </Link>

          <Link
            to="/profile/view"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <UserCircle className="inline-block h-4 w-4 mr-2" />
            View Profile
          </Link>

          <Link
            to="/settings/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="inline-block h-4 w-4 mr-2" />
            Settings
          </Link>
          
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="inline-block h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 