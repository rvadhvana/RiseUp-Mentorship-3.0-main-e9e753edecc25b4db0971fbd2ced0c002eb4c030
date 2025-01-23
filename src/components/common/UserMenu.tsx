import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircle, 
  Shield, 
  ShieldCheck, 
  GraduationCap, 
  Users,
  LogOut,
  Settings,
  User,
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ROLE_ICONS = {
  super_admin: <ShieldCheck className="h-5 w-5" />,
  admin: <Shield className="h-5 w-5" />,
  mentor: <GraduationCap className="h-5 w-5" />,
  mentee: <Users className="h-5 w-5" />,
};

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const userRole = 'mentee'; // This will come from auth context later

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Sign In
        <UserCircle className="ml-2 h-5 w-5" />
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
            {ROLE_ICONS[user?.role || 'mentee']}
          </div>
          {user?.isExclusiveMember && (
            <div className="ml-2 flex items-center text-yellow-500">
              <Star className="h-4 w-4" />
              <span className="text-xs font-medium ml-1">Exclusive</span>
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Link>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 