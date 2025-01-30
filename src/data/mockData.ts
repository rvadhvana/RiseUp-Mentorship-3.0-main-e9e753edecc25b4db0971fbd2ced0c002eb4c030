import type { Mentor } from '../types';

export const MOCK_MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Research Director',
    company: 'TechCorp AI',
    centreId: 'centre-1',
    location: 'San Francisco, CA',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
    bio: 'Leading AI researcher with 15+ years of experience in developing cutting-edge machine learning solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
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
    centreId: 'centre-2',
    location: 'New York, NY',
    expertise: ['Cloud Architecture', 'Microservices', 'DevOps'],
    bio: 'Cloud architecture expert specializing in scalable systems and microservices design.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    availableSlots: [
      {
        id: '2',
        startTime: '2024-03-21T14:00:00Z',
        endTime: '2024-03-21T15:00:00Z',
        isBooked: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Senior Product Manager',
    company: 'InnovateTech',
    centreId: 'centre-3',
    location: 'Austin, TX',
    expertise: ['Product Strategy', 'Agile Management', 'UX Design'],
    bio: 'Product leader with a passion for building user-centric solutions and mentoring aspiring product managers.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    availableSlots: [
      {
        id: '3',
        startTime: '2024-03-22T15:00:00Z',
        endTime: '2024-03-22T16:00:00Z',
        isBooked: false,
      },
    ],
  },
]; 