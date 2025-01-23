import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Lock, SwitchCamera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type UserRole = 'mentor' | 'mentee';

interface SignInFormData {
  username: string;
  password: string;
  role: UserRole;
}

export function UserSignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<SignInFormData>({
    username: '',
    password: '',
    role: 'mentee', // Default role
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.username, formData.password, formData.role);
      navigate(`/${formData.role}/dashboard`);
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  const toggleRole = () => {
    setFormData(prev => ({
      ...prev,
      role: prev.role === 'mentor' ? 'mentee' : 'mentor'
    }));
  };

  const getRoleColor = (role: UserRole) => {
    return role === 'mentor' ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sign In Options
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`flex items-center justify-center w-16 h-16 ${
            formData.role === 'mentor' ? 'bg-green-100' : 'bg-purple-100'
          } rounded-full mb-4 mx-auto transition-colors duration-300`}>
            <User className={`h-8 w-8 ${
              formData.role === 'mentor' ? 'text-green-600' : 'text-purple-600'
            }`} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Sign In as {formData.role === 'mentor' ? 'Mentor' : 'Mentee'}
          </h2>
          <p className="mt-2 text-gray-600">
            {formData.role === 'mentor' 
              ? 'Access your mentor dashboard and connect with mentees'
              : 'Connect with mentors and access learning resources'}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="mb-8">
          <button
            onClick={toggleRole}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SwitchCamera className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">
              Switch to {formData.role === 'mentor' ? 'Mentee' : 'Mentor'} Mode
            </span>
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${getRoleColor(formData.role)} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${formData.role === 'mentor' ? 'green' : 'purple'}-500 transition-colors`}
            >
              Sign In as {formData.role === 'mentor' ? 'Mentor' : 'Mentee'}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <Link
                to={`/${formData.role}/forgot-password`}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="text-center">
              <Link
                to={`/${formData.role}/register`}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                New {formData.role}? Register here
              </Link>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need assistance?{' '}
            <Link
              to="/contact"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 