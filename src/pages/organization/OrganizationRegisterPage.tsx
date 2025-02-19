import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { Toast } from '../../components/ui/Toast';

interface RegisterFormData {
  organizationName: string;
  organizationType: string;
  customType?: string;
  registrationNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  contactEmail: string;
  contactPhone: string;
  adminUsername: string;
  adminPassword: string;
  confirmPassword: string;
  acceptedTerms: boolean;
  name: string;
  website: string;
  description: string;
}

export function OrganizationRegisterPage() {
  const navigate = useNavigate();
  const [, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<RegisterFormData>({
    organizationName: '',
    organizationType: '',
    registrationNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    contactEmail: '',
    contactPhone: '',
    adminUsername: '',
    adminPassword: '',
    confirmPassword: '',
    acceptedTerms: false,
    name: '',
    website: '',
    description: '',
  });

  const [showCustomType, setShowCustomType] = useState(false);

  const handleOrganizationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setShowCustomType(value === 'other');
    setFormData({ 
      ...formData, 
      organizationType: value,
      customType: value === 'other' ? formData.customType : ''
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);
    setError('');

    if (formData.adminPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      // First create the user account
      const { data: userData, error: signUpError } = await supabase.auth.signUp({
        email: formData.contactEmail,
        password: formData.adminPassword,
        options: {
          data: {
            organization_name: formData.organizationName,
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!userData.user) throw new Error('User creation failed');

      // Then create the organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert([{
          name: formData.organizationName,
          email: formData.contactEmail,
          phone: formData.contactPhone,
          website: formData.website,
          description: formData.description
        }])
        .select()
        .single();

      if (orgError) throw orgError;

      // Update the user's profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          organization_id: orgData.id,
          is_organization_admin: true,
          user_role: 'organization'
        })
        .eq('id', userData.user.id);

      if (profileError) throw profileError;

      setToast({
        type: 'success',
        message: 'Registration successful! Please check your email to verify your account.'
      });

      // Redirect after a delay
      setTimeout(() => {
        navigate('/organization/login');
      }, 2000);

    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
      setToast({
        type: 'error',
        message: 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Register Your Organization
          </h2>
          <p className="mt-2 text-gray-600">
            Join RiseUp as a partner organization
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Organization Details Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Organization Details</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    placeholder="Enter your organization's name"
                  />
                </div>

                <div>
                  <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700">
                    Organization Category *
                  </label>
                  <select
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.organizationType}
                    onChange={handleOrganizationTypeChange}
                  >
                    <option value="">Select category</option>
                    <option value="educational">Educational (Career/ Courses/Certificates)</option>
                    <option value="taxation">Taxation (Tax return/Forms/Benefits)</option>
                    <option value="career">Career Growth (Resumes/Job Search/CV)</option>
                    <option value="immigration">Immigration (Study/Work permits/PR)</option>
                    <option value="other">Other (specify)</option>
                  </select>
                </div>

                {/* Custom Type Input */}
                {showCustomType && (
                  <div>
                    <label htmlFor="customType" className="block text-sm font-medium text-gray-700">
                      Specify Category *
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={formData.customType}
                      onChange={(e) => setFormData({ ...formData, customType: e.target.value })}
                      placeholder="Enter your organization category"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Address</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Admin Account Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Center Admin Account</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="adminUsername" className="block text-sm font-medium text-gray-700">
                    Admin Username *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.adminUsername}
                    onChange={(e) => setFormData({ ...formData, adminUsername: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">
                    Admin Password *
                  </label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.adminPassword}
                    onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register Organization
            </button>
          </form>
        </div>
      </div>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message} onClose={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      )}
    </div>
  );
} 