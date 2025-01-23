import { Link } from 'react-router-dom';
import { Rocket, Building2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UserMenu } from './UserMenu';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';

const MOTIVATIONAL_QUOTES = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  }
];

export function Header() {
  const { user, profile } = useAuth();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const displayName = profile ? 
    `${profile.first_name} ${profile.last_name}` : 
    'Loading...';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => 
        prev === MOTIVATIONAL_QUOTES.length - 1 ? 0 : prev + 1
      );
    }, 6000); // Change quote every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const fetchProfile = async () => {
    // Try to fetch organization profile
    let { data: org } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', user?.id)
      .single();

    if (org) {
      return { name: org.name, type: 'organization' };
    }

    // If not organization, try to fetch user profile
    let { data: userProfile } = await supabase
      .from('profiles')
      .select('first_name, last_name, user_role')
      .eq('id', user?.id)
      .single();

    if (userProfile) {
      return {
        name: `${userProfile.first_name} ${userProfile.last_name}`,
        type: userProfile.user_role
      };
    }

    return null;
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Quote Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center h-6 flex items-center justify-center overflow-hidden">
            <div className="animate-fade-in-out">
              <p className="text-sm font-medium">
                "{MOTIVATIONAL_QUOTES[currentQuoteIndex].text}"
                <span className="text-blue-200 ml-2">
                  — {MOTIVATIONAL_QUOTES[currentQuoteIndex].author}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RiseUp</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2">
                  {profile?.user_role === 'organization' ? (
                    <Building2 className="h-5 w-5 text-gray-600" />
                  ) : (
                    <User className="h-5 w-5 text-gray-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {profile?.first_name} {profile?.last_name}
                  </span>
                </div>
                <UserMenu />
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 