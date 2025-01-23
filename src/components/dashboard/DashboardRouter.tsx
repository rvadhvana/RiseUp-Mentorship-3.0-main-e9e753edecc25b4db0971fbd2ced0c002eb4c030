import { Navigate, Route, Routes } from 'react-router-dom';
import type { User } from '../../types';

interface DashboardRouterProps {
  isAuthenticated: boolean;
  user: User | null;
}

export function DashboardRouter({ isAuthenticated, user }: DashboardRouterProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {/* Add your dashboard routes here */}
      </div>
    </div>
  );
}