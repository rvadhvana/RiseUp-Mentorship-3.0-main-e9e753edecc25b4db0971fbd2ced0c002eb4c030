import React from 'react';
import { useSession } from '../context/AuthProvider'; // Adjust the import path as necessary

const Profile: React.FC = () => {
  const { user } = useSession();

  return (
    <div className="profile flex items-center">
      <img src="/path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
      {user && <span className="user-name ml-2">{user.name}</span>}
    </div>
  );
};

export default Profile; 