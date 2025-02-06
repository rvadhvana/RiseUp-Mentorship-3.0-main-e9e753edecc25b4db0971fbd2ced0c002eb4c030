import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';

interface DashboardStats {
  totalUsers: number;
  totalMentors: number;
  totalMentees: number;
  activePrograms: number;
}

const AdminDashboard: FC = () => {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {/* Add your admin dashboard content here */}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

const StatCard: FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
};

export default AdminDashboard;