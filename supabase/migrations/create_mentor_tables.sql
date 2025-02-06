-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "citext" WITH SCHEMA public;

-- Enum types for various statuses
CREATE TYPE mentor_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE meeting_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE request_status AS ENUM ('pending', 'approved', 'rejected');

-- Mentor Profiles table (extends the base profiles table)
CREATE TABLE mentor_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone VARCHAR(20),
    bio TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    website_url TEXT,
    center_location TEXT NOT NULL,
    years_of_experience INTEGER,
    current_company TEXT,
    job_role TEXT,
    mentor_status mentor_status DEFAULT 'active',
    max_mentees INTEGER DEFAULT 5,
    availability_hours JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT valid_phone CHECK (phone ~* '^\+?[0-9\s-\(\)]+$'),
    CONSTRAINT valid_linkedin CHECK (linkedin_url ~* '^https:\/\/[www\.]?linkedin\.com\/.*$'),
    CONSTRAINT valid_github CHECK (github_url ~* '^https:\/\/github\.com\/.*$')
);

-- Create a case-insensitive index on email
CREATE INDEX idx_mentor_profiles_email_lower ON mentor_profiles (LOWER(email));

-- Mentor Expertise table (many-to-many relationship)
CREATE TABLE expertise_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE mentor_expertise (
    mentor_id UUID REFERENCES mentor_profiles(id) ON DELETE CASCADE,
    expertise_id UUID REFERENCES expertise_areas(id) ON DELETE CASCADE,
    years_of_experience INTEGER,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (mentor_id, expertise_id)
);

-- Mentor-Mentee Relationships
CREATE TABLE mentor_mentee_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID REFERENCES mentor_profiles(id) ON DELETE CASCADE,
    mentee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'active',
    goals TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT unique_active_relationship UNIQUE (mentee_id, status)
    CHECK (status = 'inactive' OR NOT EXISTS (
        SELECT 1 FROM mentor_mentee_relationships
        WHERE mentee_id = mentee_id AND status = 'active'
    ))
);

-- Mentorship Tasks
CREATE TABLE mentorship_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    relationship_id UUID REFERENCES mentor_mentee_relationships(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMPTZ,
    status task_status DEFAULT 'pending',
    priority INTEGER CHECK (priority BETWEEN 1 AND 5),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentorship Meetings
CREATE TABLE mentorship_meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    relationship_id UUID REFERENCES mentor_mentee_relationships(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER NOT NULL,
    meeting_link TEXT,
    agenda TEXT,
    notes TEXT,
    status meeting_status DEFAULT 'scheduled',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentorship Requests
CREATE TABLE mentorship_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID REFERENCES mentor_profiles(id) ON DELETE CASCADE,
    mentee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT,
    status request_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT unique_pending_request UNIQUE (mentor_id, mentee_id, status)
);

-- Create indexes for better query performance
CREATE INDEX idx_mentor_profiles_status ON mentor_profiles(mentor_status);
CREATE INDEX idx_mentor_mentee_status ON mentor_mentee_relationships(status);
CREATE INDEX idx_mentorship_tasks_status ON mentorship_tasks(status);
CREATE INDEX idx_mentorship_meetings_scheduled ON mentorship_meetings(scheduled_at);
CREATE INDEX idx_mentorship_requests_status ON mentorship_requests(status);

-- Add RLS (Row Level Security) policies
ALTER TABLE mentor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_mentee_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_mentor_profiles_timestamp
    BEFORE UPDATE ON mentor_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_mentor_mentee_timestamp
    BEFORE UPDATE ON mentor_mentee_relationships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tasks_timestamp
    BEFORE UPDATE ON mentorship_tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_meetings_timestamp
    BEFORE UPDATE ON mentorship_meetings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Create views for common queries
CREATE VIEW active_mentorships AS
SELECT 
    r.id as relationship_id,
    m.first_name as mentor_first_name,
    m.last_name as mentor_last_name,
    m.email as mentor_email,
    p.first_name as mentee_first_name,
    p.last_name as mentee_last_name,
    p.email as mentee_email,
    r.start_date,
    r.goals
FROM mentor_mentee_relationships r
JOIN mentor_profiles m ON r.mentor_id = m.id
JOIN profiles p ON r.mentee_id = p.id
WHERE r.status = 'active';

-- Add example RLS policies
CREATE POLICY "Mentors can view their own profile"
    ON mentor_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Mentors can update their own profile"
    ON mentor_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Public can view active mentor profiles"
    ON mentor_profiles FOR SELECT
    USING (mentor_status = 'active'); 