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