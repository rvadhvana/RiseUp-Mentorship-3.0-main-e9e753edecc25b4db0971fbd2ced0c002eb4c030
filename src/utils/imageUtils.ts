import { supabase } from './supabase';

export const getMentorImageUrl = (imagePath: string) => {
  if (imagePath.startsWith('http')) {
    return imagePath; // Return as-is if it's already a full URL
  }
  
  const { data } = supabase
    .storage
    .from('mentor-images')
    .getPublicUrl(imagePath);
    
  return data.publicUrl;
}; 