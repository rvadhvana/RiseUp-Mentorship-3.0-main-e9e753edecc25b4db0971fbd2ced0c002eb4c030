import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Target,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  Search,
  Calculator,
  Globe,
} from 'lucide-react';
import type { Event, Mentor } from '../types';
import { useAuth } from '../context/AuthContext';
import { ExclusiveContent } from '../components/exclusive/ExclusiveContent';

// Mock data for featured mentors
const FEATURED_MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Research Director',
    company: 'TechCorp AI',
    centreId: 'centre-1',
    location: 'San Francisco, CA',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
    bio: 'Leading AI researcher with 15+ years of experience in developing cutting-edge machine learning solutions.',
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    availableSlots: [
      {
        id: '1',
        startTime: '2024-03-20T10:00:00Z',
        endTime: '2024-03-20T11:00:00Z',
        isBooked: false,
      },
    ],
  },
  {
    id: '2',
    name: 'James Wilson',
    title: 'Senior Software Architect',
    company: 'CloudScale Systems',
    centreId: 'centre-1',
    location: 'New York, NY',
    expertise: ['Cloud Architecture', 'Microservices', 'DevOps'],
    bio: 'Cloud architecture expert specializing in scalable systems and microservices design.',
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    availableSlots: [
      {
        id: '2',
        startTime: '2024-03-21T14:00:00Z',
        endTime: '2024-03-21T15:00:00Z',
        isBooked: false,
      },
    ],
  },
];

// Mock event
const MOCK_EVENT: Event = {
  id: '1',
  title: 'RiseUP Tech Conference 2024',
  description:
    'Join us for an inspiring day of learning and networking with industry leaders.',
  date: '2024-04-15',
  lumaUrl: 'https://lu.ma/riseup-tech-2024',
  registrationDeadline: '2024-04-01',
  isActive: true,
};

const BENEFITS = [
  {
    title: 'Expert Mentorship',
    description: 'Connect with industry leaders who provide personalized guidance.',
    icon: <Users className="h-6 w-6 text-white" />,
  },
  {
    title: 'Skill Development',
    description: 'Access resources and guidance to enhance your technical skills.',
    icon: <BookOpen className="h-6 w-6 text-white" />,
  },
  {
    title: 'Career Growth',
    description: 'Get insights and strategies to accelerate your career progression.',
    icon: <Target className="h-6 w-6 text-white" />,
  },
  {
    title: 'Community Support',
    description: 'Join a supportive community of like-minded professionals.',
    icon: <Star className="h-6 w-6 text-white" />,
  },
  {
    title: 'Taxation Assistance',
    description: 'Expert guidance on tax planning and compliance for professionals.',
    icon: <Calculator className="h-6 w-6 text-white" />,
  },
  {
    title: 'Immigration Support',
    description: 'Resources and guidance for work visas and immigration processes.',
    icon: <Globe className="h-6 w-6 text-white" />,
  },
];

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const filteredMentors = FEATURED_MENTORS.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Handle the action for authenticated users
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Event Banner */}
      {MOCK_EVENT.isActive && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            {/* EventRegistration component would be rendered here */}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-blue-600">RiseUp Mentorship</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:max-w-2xl">
              Connect with industry leaders, accelerate your growth, and unlock
              your potential through personalized mentorship.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/mentors"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Find Your Mentor
              </Link>
              <Link
                to="/join"
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-blue-50"
              >
                Join as Mentor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Mentors Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Meet Our Expert Mentors
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Connect with industry leaders who can guide your career journey
            </p>
          </div>

          {/* Search Mentors */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full sm:w-96 relative">
              <input
                type="text"
                placeholder="Search mentors by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in to Connect
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>

          {/* Mentor Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center mb-4">
                  {/* Mentor icon would be rendered here */}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {mentor.name}
                </h3>
                <p className="mt-2 text-gray-600">
                  {mentor.title}
                </p>
              </div>
            ))}
          </div>

          {/* View All Mentors */}
          <div className="text-center mt-8">
            <Link
              to={isAuthenticated ? '/mentors' : '/login'}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Mentors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Exclusive Content Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ExclusiveContent />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose RiseUp Mentorship?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover the advantages of our mentorship program
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thanks to the RiseUp Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thanks to the RiseUp Team
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Special thanks to our dedicated team who made this mentorship
            platform possible. Together, we're building a community of growth
            and learning.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="https://github.com/rvadhvana/RiseUp-Mentorship-3.0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all duration-200"
            >
              <Star className="mr-2 h-5 w-5" />
              Star on GitHub
            </Link>
            <Link
              to="/mentors"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              <Star className="mr-2 h-5 w-5" />
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


