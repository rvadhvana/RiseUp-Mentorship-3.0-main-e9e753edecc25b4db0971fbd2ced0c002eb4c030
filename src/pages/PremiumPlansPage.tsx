import React from 'react';
import { Crown, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';

export function PremiumPlansPage() {
  const { user } = useAuth();

  const handleSubscribe = async (planType: string) => {
    if (!user) return;

    try {
      // Add subscription record
      const { error } = await supabase
        .from('premium_subscriptions')
        .insert([
          {
            user_id: user.id,
            subscription_type: planType,
            youtube_access: true,
            expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          }
        ]);

      if (error) throw error;
      
      // Redirect to payment page (implement your payment logic here)
      // window.location.href = '/payment';
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Premium Plans
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your growth journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* Add your premium plan cards here */}
        </div>
      </div>
    </div>
  );
} 