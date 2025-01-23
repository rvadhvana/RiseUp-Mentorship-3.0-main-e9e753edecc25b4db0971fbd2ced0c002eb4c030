import React from 'react';
import { GraduationCap, Briefcase, Target, BookOpen } from 'lucide-react';
import type { UserProfile } from '../types';

interface UserProfileProps {
  profile: UserProfile;
  onEdit?: () => void;
}

export function UserProfile({ profile, onEdit }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
            <GraduationCap className="w-5 h-5 mr-2" />
            Education
          </h3>
          <div className="space-y-4">
            {profile.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">{edu.institution}</h4>
                <p className="text-gray-600">
                  {edu.degree} in {edu.field}
                </p>
                <p className="text-sm text-gray-500">
                  {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
            <Target className="w-5 h-5 mr-2" />
            Career Goals
          </h3>
          <p className="text-gray-600">{profile.careerGoals}</p>
        </div>

        {profile.currentRole && (
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
              <Briefcase className="w-5 h-5 mr-2" />
              Current Role
            </h3>
            <p className="text-gray-600">
              {profile.currentRole} at {profile.company}
            </p>
          </div>
        )}

        <div>
          <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
            <BookOpen className="w-5 h-5 mr-2" />
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}