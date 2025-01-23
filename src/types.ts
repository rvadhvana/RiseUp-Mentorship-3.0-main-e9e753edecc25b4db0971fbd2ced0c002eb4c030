export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  expertise: string[];
  bio: string;
  imageUrl: string;
  availableSlots?: {
    id: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'mentor' | 'mentee';
  organization?: string;
  location?: string;
  eventAttendance: string[];
  joinedDate: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  lumaUrl: string;
  registrationDeadline: string;
  isActive: boolean;
} 