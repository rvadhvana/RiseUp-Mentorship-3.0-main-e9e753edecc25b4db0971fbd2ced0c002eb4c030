-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    date TIMESTAMPTZ NOT NULL,
    location TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create mentor_slots table and its relationship
CREATE TABLE IF NOT EXISTS mentor_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID REFERENCES mentor_profiles(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    is_booked BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_is_active ON events(is_active);
CREATE INDEX idx_mentor_slots_mentor ON mentor_slots(mentor_id);
CREATE INDEX idx_mentor_slots_time ON mentor_slots(start_time, end_time);

-- Add RLS policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_slots ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Public can view active events" 
    ON events FOR SELECT 
    USING (is_active = true);

-- Mentor slots policies
CREATE POLICY "Public can view available slots" 
    ON mentor_slots FOR SELECT 
    USING (is_booked = false);

CREATE POLICY "Mentors can manage their slots" 
    ON mentor_slots FOR ALL 
    USING (mentor_id = auth.uid()); 