import React, { useState } from 'react';
import { Search, Filter, Users, Calendar } from 'lucide-react';
import { SpeakerCard } from './SpeakerCard';
import { BookingModal } from './BookingModal';
import { CalendarConnect } from './CalendarConnect';
import { useAuthStore } from '../store/authStore';
import type { Speaker, TimeSlot } from '../types';

// Mock data - In a real app, this would come from an API
const MOCK_SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Research Director',
    company: 'TechCorp AI',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
    bio: 'Leading AI researcher with 15+ years of experience in developing cutting-edge machine learning solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    availableSlots: [
      {
        id: '1',
        startTime: '2024-03-20T10:00:00Z',
        endTime: '2024-03-20T11:00:00Z',
        isBooked: false,
      },
      {
        id: '2',
        startTime: '2024-03-21T14:00:00Z',
        endTime: '2024-03-21T15:00:00Z',
        isBooked: false,
      },
    ],
  },
  {
    id: '2',
    name: 'James Wilson',
    title: 'Senior Software Architect',
    company: 'CloudScale Systems',
    expertise: ['Cloud Architecture', 'Microservices', 'DevOps'],
    bio: 'Cloud architecture expert specializing in scalable systems and microservices design.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    availableSlots: [
      {
        id: '3',
        startTime: '2024-03-22T09:00:00Z',
        endTime: '2024-03-22T10:00:00Z',
        isBooked: false,
      },
    ],
  },
];

export function SpeakerDashboard() {
  const [speakers] = useState<Speaker[]>(MOCK_SPEAKERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user, addConnectionRequest } = useAuthStore();

  const filteredSpeakers = speakers.filter((speaker) =>
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.expertise.some((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleBooking = (speakerId: string) => {
    const speaker = speakers.find((s) => s.id === speakerId);
    if (speaker) {
      setSelectedSpeaker(speaker);
      setIsModalOpen(true);
    }
  };

  const handleConnect = (speakerId: string) => {
    if (!user) return;
    
    const connectionRequest = {
      id: Math.random().toString(36).substr(2, 9),
      menteeId: user.id,
      mentorId: speakerId,
      status: 'pending',
      message: `I would like to connect with you for mentorship.`,
      createdAt: new Date().toISOString()
    };
    
    addConnectionRequest(connectionRequest);
    alert('Connection request sent successfully!');
  };

  const handleBookingSubmit = (data: { timeSlot: TimeSlot; questions: string }) => {
    // In a real app, this would make an API call to create the booking
    console.log('Booking submitted:', { speakerId: selectedSpeaker?.id, ...data });
    setIsModalOpen(false);
    setSelectedSpeaker(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isAuthenticated ? 'Connect with Industry Experts' : 'Browse Industry Experts'}
            </h1>
            <p className="mt-2 text-gray-600">
              {isAuthenticated 
                ? 'Book one-on-one sessions with leading professionals in your field'
                : 'Sign in to connect with mentors and book sessions'}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Users className="w-4 h-4 mr-2" />
              View Profile
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-4 h-4 mr-2" />
              Manage Calendar
            </button>
          </div>
        </div>

        <div className="mb-8">
          <CalendarConnect
            isConnected={false}
            onConnect={(token) => {
              console.log('Calendar connected with token:', token);
              // Here you would typically send this token to your backend
            }}
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpeakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              onBooking={handleBooking}
              onConnect={handleConnect}
            />
          ))}
        </div>

        {selectedSpeaker && (
          <BookingModal
            speaker={selectedSpeaker}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedSpeaker(null);
            }}
            onSubmit={handleBookingSubmit}
          />
        )}
      </div>
    </div>
  );
}