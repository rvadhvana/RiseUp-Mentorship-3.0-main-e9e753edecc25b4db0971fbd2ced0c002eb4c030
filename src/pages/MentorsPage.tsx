import { useState } from 'react';
import { Search } from 'lucide-react';
import { MentorCard } from '../components/mentors/MentorCard';
import { useAuth } from '../context/AuthContext';
import type { Mentor } from '../types';

// Mock data for mentors
const MOCK_MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Research Director',
    company: 'TechCorp AI',
    location: 'San Francisco, CA',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
    bio: 'Leading AI researcher with 15+ years of experience.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
  },
  {
    id: '2',
    name: 'James Wilson',
    title: 'Senior Software Architect',
    company: 'CloudScale Systems',
    location: 'New York, NY',
    expertise: ['Cloud Architecture', 'Microservices', 'DevOps'],
    bio: 'Cloud architecture expert specializing in scalable systems.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7'
  }
];

export function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAuth();

  const filteredMentors = MOCK_MENTORS.filter((mentor) =>
    mentor.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleMentorAction = () => {
    // Add mentor booking/connection logic here
    console.log('Mentor action triggered');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Mentor</h1>
        <div className="w-full sm:w-96 relative">
          <input
            type="text"
            placeholder="Search mentors by title or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {filteredMentors.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No mentors found matching your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              isAuthenticated={isAuthenticated}
              onBooking={handleMentorAction}
              onConnect={handleMentorAction}
            />
          ))}
        </div>
      )}
    </div>
  );
}