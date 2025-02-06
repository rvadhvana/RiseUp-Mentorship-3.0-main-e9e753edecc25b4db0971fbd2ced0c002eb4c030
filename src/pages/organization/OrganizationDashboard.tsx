import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';

interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  is_approved: boolean;
}

export function OrganizationDashboard() {
  const { profile } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [stats, setStats] = useState({
    totalMentors: 0,
    totalMentees: 0,
    activePrograms: 0
  });

  useEffect(() => {
    if (profile?.organization_id) {
      fetchOrganizationDetails();
      fetchOrganizationStats();
    }
  }, [profile]);

  const fetchOrganizationDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', profile?.organization_id)
        .single();

      if (error) throw error;
      setOrganization(data);
    } catch (error) {
      console.error('Error fetching organization:', error);
    }
  };

  const fetchOrganizationStats = async () => {
    try {
      const { data: mentors, error: mentorsError } = await supabase
        .from('profiles')
        .select('id')
        .eq('organization_id', profile?.organization_id)
        .eq('user_role', 'mentor');

      const { data: mentees, error: menteesError } = await supabase
        .from('profiles')
        .select('id')
        .eq('organization_id', profile?.organization_id)
        .eq('user_role', 'mentee');

      if (mentorsError || menteesError) throw mentorsError || menteesError;

      setStats({
        totalMentors: mentors?.length || 0,
        totalMentees: mentees?.length || 0,
        activePrograms: Math.floor((mentors?.length || 0) / 2) // Example calculation
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!organization) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{organization.name}</h1>
          <p className="mt-1 text-gray-600">{organization.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Mentors</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.totalMentors}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Mentees</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.totalMentees}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Active Programs</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">{stats.activePrograms}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Organization Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{organization.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <p className="mt-1 text-gray-900">{organization.phone || '-'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <p className="mt-1 text-gray-900">
                {organization.website ? (
                  <a href={organization.website} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline">
                    {organization.website}
                  </a>
                ) : '-'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <p className="mt-1 text-gray-900">{organization.address || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 