import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { MOCK_MENTORS } from '../data/mockData';
import type { Mentor } from '../types';

export function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentors = MOCK_MENTORS.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Mentors
          </h1>
          <p className="text-gray-600">
            Connect with industry experts who can guide you on your journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={mentor.imageUrl}
                  alt={mentor.name}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {mentor.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {mentor.title} at {mentor.company}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 2 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{mentor.expertise.length - 2} more
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {mentor.bio}
                </p>
                <button className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors">
                  Connect with {mentor.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}