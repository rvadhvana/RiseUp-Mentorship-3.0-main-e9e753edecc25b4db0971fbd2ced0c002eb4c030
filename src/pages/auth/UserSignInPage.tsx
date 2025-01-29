import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Lock, SwitchCamera, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Toast } from '../../components/ui/Toast';

type UserRole = 'mentor' | 'mentee';

interface SignInFormData {
  email: string;
  password: string;
  role: UserRole;
}

export function UserSignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Determine initial role from URL path
  const initialRole: UserRole = location.pathname.includes('mentor') ? 'mentor' : 'mentee';
  
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
    role: initialRole,
  });

  // Update role when URL changes
  useEffect(() => {
    const newRole: UserRole = location.pathname.includes('mentor') ? 'mentor' : 'mentee';
    setFormData(prev => ({ ...prev, role: newRole }));
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(formData.email, formData.password);
      setToast({ type: 'success', message: 'Successfully signed in!' });
      
      // Redirect after successful login
      setTimeout(() => {
        navigate(`/${formData.role}/dashboard`);
      }, 1500);
    } catch (err) {
      setToast({ 
        type: 'error', 
        message: 'Failed to sign in. Please check your credentials.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleRole = () => {
    const newRole = formData.role === 'mentor' ? 'mentee' : 'mentor';
    setFormData(prev => ({ ...prev, role: newRole }));
    navigate(`/${newRole}/login`, { replace: true });
  };

  const getRoleStyles = () => ({
    background: formData.role === 'mentor' ? 'bg-green-100' : 'bg-purple-100',
    text: formData.role === 'mentor' ? 'text-green-600' : 'text-purple-600',
    button: formData.role === 'mentor' 
      ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
      : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
  });

  const styles = getRoleStyles();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sign In Options
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`flex items-center justify-center w-16 h-16 ${styles.background} rounded-full mb-4 mx-auto`}>
            {formData.role === 'mentor' ? (
              <User className={`h-8 w-8 ${styles.text}`} />
            ) : (
              <GraduationCap className={`h-8 w-8 ${styles.text}`} />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Sign In as {formData.role === 'mentor' ? 'Mentor' : 'Mentee'}
          </h2>
          <p className="mt-2 text-gray-600">
            {formData.role === 'mentor' 
              ? 'Share your expertise and guide others'
              : 'Connect with mentors and grow your skills'}
          </p>
        </div>

        {/* Role Toggle */}
        <button
          onClick={toggleRole}
          className="w-full mb-8 flex items-center justify-center space-x-2 py-2 px-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SwitchCamera className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600">
            Switch to {formData.role === 'mentor' ? 'Mentee' : 'Mentor'} Mode
          </span>
        </button>

        {/* Sign In Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${styles.button} ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Signing in...' : `Sign In as ${formData.role === 'mentor' ? 'Mentor' : 'Mentee'}`}
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
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
} 