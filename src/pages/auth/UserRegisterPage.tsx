import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User} from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';
import { EmailConfirmationModal } from '../../components/auth/EmailConfirmationModal';

type UserRole = 'mentor' | 'mentee';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Mentor specific fields
  expertise?: string[];
  experience?: string;
  currentRole?: string;
  company?: string;
  bio?: string;
  // Mentee specific fields
  interests?: string[];
  currentStatus?: string;
  goals?: string;
  acceptedTerms: boolean;
}

const EXPERTISE_OPTIONS = [
  'Educational (Career/Courses)',
  'Taxation (Tax/Benefits)',
  'Career Growth (Resume/Jobs)',
  'Immigration (Permits/PR)',
  'Other'
];

export function UserRegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  useAuth();
  const role: UserRole = location.pathname.includes('mentor') ? 'mentor' : 'mentee';
  const [isSubmitting] = useState(false);
  // const [notification, setNotification] = useState<{
  //   type: 'success' | 'error';
  //   message: string;
  // } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    currentRole: '',
    company: '',
    bio: '',
    expertise: [],
    interests: [],
    acceptedTerms: false

  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      console.log({formData,role});
      const metadata = {
        first_name: formData.firstName,
        last_name: formData.lastName,
      }
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });


      if (error) throw error;
      console.log({data, error});
      // Show confirmation modal
      setShowConfirmation(true);
      
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create account');
    }
  };

  const handleExpertiseChange = (expertise: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise?.includes(expertise)
        ? prev.expertise.filter(e => e !== expertise)
        : [...(prev.expertise || []), expertise]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sign In
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`flex items-center justify-center w-16 h-16 ${
            role === 'mentor' ? 'bg-green-100' : 'bg-purple-100'
          } rounded-full mb-4 mx-auto`}>
            <User className={`h-8 w-8 ${
              role === 'mentor' ? 'text-green-600' : 'text-purple-600'
            }`} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Register as {role === 'mentor' ? 'Mentor' : 'Mentee'}
          </h2>
          <p className="mt-2 text-gray-600">
            {role === 'mentor'
              ? 'Share your expertise and help others grow'
              : 'Connect with experienced mentors and accelerate your growth'}
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Role Specific Information */}
            {role === 'mentor' ? (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Areas of Expertise *
                    </label>
                    <div className="mt-2 space-y-2">
                      {EXPERTISE_OPTIONS.map((option) => (
                        <label key={option} className="inline-flex items-center mr-6 mb-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={formData.expertise?.includes(option)}
                            onChange={() => handleExpertiseChange(option)}
                          />
                          <span className="ml-2 text-sm text-gray-600">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700">
                      Current Role *
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={formData.currentRole}
                      onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Professional Bio *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Learning Goals</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Areas of Interest *
                    </label>
                    <div className="mt-2 space-y-2">
                      {EXPERTISE_OPTIONS.map((option) => (
                        <label key={option} className="inline-flex items-center mr-6 mb-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={formData.interests?.includes(option)}
                            onChange={() => {
                              setFormData(prev => ({
                                ...prev,
                                interests: prev.interests?.includes(option)
                                  ? prev.interests.filter(i => i !== option)
                                  : [...(prev.interests || []), option]
                              }));
                            }}
                          />
                          <span className="ml-2 text-sm text-gray-600">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700">
                      Current Status *
                    </label>
                    <select
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={formData.currentStatus}
                      onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                    >
                      <option value="">Select status</option>
                      <option value="student">Student</option>
                      <option value="employed">Employed</option>
                      <option value="job-seeker">Job Seeker</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                      Learning Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      placeholder="What do you hope to achieve through mentorship?"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Account Security</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.acceptedTerms}
                onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </Link>
              </label>
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
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                role === 'mentor' ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${role === 'mentor' ? 'green' : 'purple'}-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Registering...' : `Register as ${role === 'mentor' ? 'Mentor' : 'Mentee'}`}
            </button>
          </form>
        </div>
      </div>
      <EmailConfirmationModal
        isOpen={showConfirmation}
        email={formData.email}
        onClose={() => {
          setShowConfirmation(false);
          navigate('/login');
        }}
      />
    </div>
  );
} 