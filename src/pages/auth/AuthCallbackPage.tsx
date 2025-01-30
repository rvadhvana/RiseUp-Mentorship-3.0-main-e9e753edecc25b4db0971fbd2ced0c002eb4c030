import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          navigate('/login?error=auth');
          return;
        }

        if (session) {
          // Check if this window was opened by another window
          if (window.opener) {
            // Send message to opener
            window.opener.postMessage({ type: 'AUTH_COMPLETE', session }, window.location.origin);
            window.close();
          } else {
            // If not opened by another window, just navigate
            navigate('/');
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/login?error=unknown');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-gray-600 mb-4">
          Completing authentication...
        </div>
        <p className="text-sm text-gray-500">
          Please wait while we set up your account
        </p>
      </div>
    </div>
  );
} 