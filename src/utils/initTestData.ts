import { supabase } from '../lib/supabase';

export async function initTestData() {
  try {
    // Add test mentors
    await supabase.from('mentors').upsert([
      {
        id: '1',
        name: 'John Doe',
        title: 'Senior Software Engineer',
        company: 'Google',
        location: 'San Francisco, CA',
        expertise: ['React', 'Node.js', 'AWS'],
        bio: 'Experienced software engineer passionate about mentoring.',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      // Add more test mentors as needed
    ]);

    console.log('Test data initialized successfully');
  } catch (error) {
    console.error('Error initializing test data:', error);
  }
} 