-- Create organizations table if it doesn't exist
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    website TEXT,
    description TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modify profiles table to include organization relationship
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id),
ADD COLUMN IF NOT EXISTS is_organization_admin BOOLEAN DEFAULT false;

-- Update RLS policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Organizations are viewable by everyone" ON organizations
    FOR SELECT USING (true);

-- Make sure organizations can be created by anyone (temporarily for registration)
DROP POLICY IF EXISTS "Organizations can be created by authenticated users" ON organizations;

CREATE POLICY "Organizations can be created by anyone" ON organizations
    FOR INSERT WITH CHECK (true);

-- Make sure profiles can be updated during registration
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id); 