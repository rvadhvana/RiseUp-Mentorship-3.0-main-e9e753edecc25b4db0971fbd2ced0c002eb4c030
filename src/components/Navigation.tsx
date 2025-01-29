import React from 'react';
import { useAuth } from '../context/AuthProvider'; // Adjust the import path as necessary

const Navigation: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <div className="flex items-center">
        <span className="text-lg font-bold">Dashboard</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-900">{user?.name}</span>
        <img src="/path/to/profile-pic.jpg" alt="Profile" className="w-8 h-8 rounded-full ml-2" />
      </div>
    </nav>
  );
};

export default Navigation; 