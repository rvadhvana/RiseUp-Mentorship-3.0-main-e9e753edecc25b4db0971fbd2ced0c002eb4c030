import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Users, GraduationCap, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SuperAdminLoginModal } from '../components/admin/SuperAdminLoginModal';

export function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleSuperAdminLogin = async (email: string, password: string) => {
    try {
      if (email === 'superadmin@riseup.com' && password === '1234') {
        await login(email, password);
        setIsAdminModalOpen(false);
        navigate('/admin/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to RiseUp
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose how you'd like to join our community
          </p>
        </div>

        {/* Sign In Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Organization Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Organization
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Partner with us to access talent and contribute to the tech community
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/organization/register')}
                className="w-full px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                Join as Organization
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/organization/login')}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Sign in as Organization
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mentor Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Mentor
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Share your expertise and guide the next generation
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/mentor/register')}
                className="w-full px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center"
              >
                Join as Mentor
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/mentor/login')}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                Sign in as Mentor
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mentee Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 mx-auto">
              <GraduationCap className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Mentee
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Connect with industry experts and accelerate your career growth
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/mentee/register')}
                className="w-full px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center"
              >
                Join as Mentee
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/mentee/login')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                Sign in as Mentee
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need help?{' '}
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>

        {/* Super Admin Access Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Shield className="h-4 w-4 mr-1" />
            <span className="text-sm">Admin Access</span>
          </button>
        </div>

        {/* Super Admin Login Modal */}
        <SuperAdminLoginModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          onLogin={handleSuperAdminLogin}
        />
      </div>
    </div>
  );
} 