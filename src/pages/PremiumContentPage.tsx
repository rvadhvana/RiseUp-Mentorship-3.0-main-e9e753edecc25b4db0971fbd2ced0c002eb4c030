import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import { Crown, Calendar } from 'lucide-react';

export function PremiumContentPage() {
  const { user } = useAuth();
 // const navigate = useNavigate();
  const [isEligible, setIsEligible] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {
    checkEligibility();
  }, [user]);

  const checkEligibility = async () => {
    if (!user) return;

    try {
      // Check event attendance
      const { data: attendance, error: attendanceError } = await supabase
        .from('event_attendance')
        .select('*')
        .eq('user_id', user.id);

      if (attendanceError) throw attendanceError;

      const count = attendance?.length || 0;
      setAttendanceCount(count);
      setIsEligible(count >= 3); // Require 3 event attendances for premium

      // If eligible but not premium, grant premium status
      if (count >= 3) {
        const { error: premiumError } = await supabase
          .from('premium_members')
          .upsert({ 
            user_id: user.id,
            is_active: true 
          });

        if (premiumError) throw premiumError;
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Crown className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Premium Access</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Event Attendance
              </h2>
              <p className="text-gray-600">
                {attendanceCount}/3 events attended
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>

          {isEligible ? (
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-900">
                🎉 Congratulations! You have Premium Access
              </h3>
              <p className="mt-2 text-purple-600">
                Thank you for being an active member of our community
              </p>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Attend {3 - attendanceCount} more events to unlock premium access
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 