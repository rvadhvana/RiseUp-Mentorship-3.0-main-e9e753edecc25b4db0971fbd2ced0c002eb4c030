import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export function UserMenu() {
  const { user } = useAuth();
  const [initials, setInitials] = useState('');

  useEffect(() => {
    if (user?.user_metadata) {
      const firstName = user.user_metadata.first_name || '';
      const lastName = user.user_metadata.last_name || '';
      setInitials(`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase());
    }
  }, [user]);

  return (
    <div className="relative">
      <button className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-sm font-medium text-white">{initials}</span>
        </div>
      </button>
      {/* Add your dropdown menu here */}
    </div>
  );
} 