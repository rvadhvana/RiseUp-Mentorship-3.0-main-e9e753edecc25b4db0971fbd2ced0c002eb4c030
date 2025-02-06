export interface MentorProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  website_url: string | null;
  center_location: string;
  years_of_experience: number | null;
  current_company: string | null;
  job_role: string | null;
  mentor_status: 'active' | 'inactive' | 'suspended';
  max_mentees: number;
  availability_hours: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface MentorExpertise {
  mentor_id: string;
  expertise_id: string;
  years_of_experience: number;
  proficiency_level: number;
  created_at: string;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_role: 'mentor' | 'mentee';
  expertise?: string[];
  years_experience?: string;
  job_title?: string;
  company?: string;
  bio?: string;
  interests?: string[];
  user_status?: string;
  goals?: string;
  created_at: string;
}

interface Organization {
  id: string;
  name: string;
  type: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  contact_email: string;
  contact_phone: string;
  created_at: string;
}

interface SuccessStory {
  id: string;
  user_id: string;
  story: string;
  created_at: string;
} 