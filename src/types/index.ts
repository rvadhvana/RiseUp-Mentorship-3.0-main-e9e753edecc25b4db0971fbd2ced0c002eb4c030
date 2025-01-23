export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  lumaUrl: string;
  registrationDeadline: string;
  isActive: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  centreId: string;
  location: string;
  expertise: string[];
  bio: string;
  imageUrl: string;
  availableSlots: {
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
  role: 'admin' | 'mentor' | 'mentee';
  profile?: {
    education?: {
      institution: string;
      degree: string;
      field: string;
      startYear: number;
      current: boolean;
    }[];
    careerGoals?: string;
    interests?: string[];
    progress?: any[];
    jobSeekingStatus?: any;
  };
}