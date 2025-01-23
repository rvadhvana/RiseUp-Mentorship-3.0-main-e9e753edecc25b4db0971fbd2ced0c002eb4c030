import { useState } from 'react';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    setError(null);

    try {
      // For demo purposes, we'll create an object URL
      // In a real app, you would upload to a server/cloud storage
      const imageUrl = URL.createObjectURL(file);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return imageUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadImage,
    uploading,
    error
  };
}