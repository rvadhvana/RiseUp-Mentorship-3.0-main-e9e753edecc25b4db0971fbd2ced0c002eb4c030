import React from 'react';
import { useAuth } from '../context/AuthProvider'; // Adjust the import path as necessary

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add other user information fields as needed */}
    </div>
  );
};

export default ProfileSettings; 